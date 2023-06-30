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
    return res.send([viewContents, addCarts, informations, sells])
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const getStadisticsFiltered = async (req, res) => {
  try {
    const {dateInitial, dateLast} = req.body
    console.log(new Date(dateInitial))
    console.log(new Date(dateLast))
    let stadistics = []
    const viewContents = await ViewContent.find({ createdAt: { $gte: dateInitial, $lte: dateLast } }).sort({ createdAt: 1 })
    if (viewContents) {
      stadistics = stadistics.concat({ viewContents: viewContents })
    }
    const addCarts = await AddCart.find({ createdAt: { $gte: new Date(dateInitial), $lte: new Date(dateLast) } }).sort({ createdAt: 1 })
    if (addCarts) {
      stadistics = stadistics.concat({ addCarts: addCarts })
    }
    const informations = await Information.find({ createdAt: { $gte: new Date(dateInitial), $lte: new Date(dateLast) } }).sort({ createdAt: 1 })
    if (informations) {
      stadistics = stadistics.concat({ informations: informations })
    }
    const sells = await Sell.find({ createdAt: { $gte: new Date(dateInitial), $lte: new Date(dateLast) } }).sort({ createdAt: 1 })
    if (sells) {
      stadistics = stadistics.concat({ sells: sells })
    }
    return res.send(stadistics)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}