import AddCart from '../models/AddCart.js'
import ViewContent from '../models/ViewContent.js'
import Information from '../models/Information.js'
import Sell from '../models/Sell.js'

export const getStadistics = async (req, res) => {
  try {
    const viewContents = await ViewContent.find().lean()
    const addCarts = await AddCart.find().lean()
    const informations = await Information.find().lean()
    const sells = await Sell.find().lean()
    return res.send({ viewContents: viewContents, addCarts: addCarts, informations: informations, sells: sells })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getStadisticsFiltered = async (req, res) => {
  try {
    const {dateInitial, dateLast} = req.body
    const dateInitialFormat = new Date(dateInitial)
    const dateLastFormat = new Date(dateLast)
    let stadistics = { viewContents: [], addCarts: [], informations: [], sells: [] }
    const viewContents = await ViewContent.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } }).sort({ createdAt: 1 })
    if (viewContents) {
      stadistics.viewContents = viewContents
    }
    const addCarts = await AddCart.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } }).sort({ createdAt: 1 })
    if (addCarts) {
      stadistics.addCarts = addCarts
    }
    const informations = await Information.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } }).sort({ createdAt: 1 })
    if (informations) {
      stadistics.informations = informations
    }
    const sells = await Sell.find({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } }).sort({ createdAt: 1 })
    if (sells) {
      stadistics.sells = sells
    }
    return res.send(stadistics)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}