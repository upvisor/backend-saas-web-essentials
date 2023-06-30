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
    const filters = {}
    if (dateInitial && dateLast) {
      filters.createdAt = {
        $gte: new Date(dateInitial),
        $lte: new Date(dateLast)
      }
    }
    let stadistics = []
    const viewContents = await ViewContent.find(filters).sort({ createdAt: 1 })
    if (viewContents) {
      stadistics = stadistics.concat(viewContents)
    }
    const addCarts = await AddCart.find(filters).sort({ createdAt: 1 })
    if (addCarts) {
      stadistics = stadistics.concat(addCarts)
    }
    const informations = await Information.find(filters).sort({ createdAt: 1 })
    if (informations) {
      stadistics = stadistics.concat(informations)
    }
    const sells = await Sell.find(filters).sort({ createdAt: 1 })
    if (sells) {
      stadistics = stadistics.concat(sells)
    }
    return res.send(stadistics)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}