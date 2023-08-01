import pkg from 'transbank-sdk'
import {asyncHandler} from '../utils/async_handler.js'
const { WebpayPlus, Environment, Options } = pkg
import { sendEmailBuy } from '../utils/sendEmailBuy.js'
import { sendEmailBuyFailed } from '../utils/sendEmailBuyFailed.js'
import StoreData from '../models/StoreData.js'
import Sell from '../models/Sell.js'

export const create = asyncHandler(async function (req, res) {
  const { amount, returnUrl } = req.body
  const sells = await Sell.countDocuments()
  const buyOrder = `BLASPOD-${sells + 1001}`
  const sessionId = `S-${1000 + Number(sells)}`
  const createResponse = await (new WebpayPlus.Transaction(new Options(597055555532, '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', Environment.Integration))).create(
    buyOrder,
    sessionId,
    amount,
    returnUrl
  )
  res.send(createResponse)
})

export const commit = asyncHandler(async function (req, res) {
  try {
    let { token, sell } = req.body
    const commitResponse = await (new WebpayPlus.Transaction(new Options(597055555532, '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C', Environment.Integration))).commit(token)
    const storeData = await StoreData.findOne().lean()
    if (commitResponse.status === 'AUTHORIZED') {
      sendEmailBuy({ sell: sell, storeData: storeData })
    }
    if (commitResponse.status === 'FAILED') {
      sendEmailBuyFailed({ sell: sell, storeData: storeData })
    }
    res.send(commitResponse)
  } catch (error) {
    return res.status(204).json({message: 'Pago no realizado'})
  }
})

export const status = asyncHandler(async function (req, res) {
  let { token } = req.body
  const statusResponse = await (new WebpayPlus.Transaction()).status(token)
  let viewData = {
    token,
    statusResponse,
  }
  res.send(viewData)
})

export const refund = asyncHandler(async function (req, res) {
  let { token, amount } = req.body
  const refundResponse = await (new WebpayPlus.Transaction()).refund(token, amount)
  let viewData = {
    token,
    amount,
    refundResponse,
  }
  res.send(viewData)
})