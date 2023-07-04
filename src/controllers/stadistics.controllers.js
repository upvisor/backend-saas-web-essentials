import AddCart from '../models/AddCart.js'
import ViewContent from '../models/ViewContent.js'
import Information from '../models/Information.js'
import Sell from '../models/Sell.js'

export const getStadistics = async (req, res) => {
  try {
    const viewContents = await ViewContent.countDocuments()
    const addCarts = await AddCart.countDocuments()
    const informations = await Information.countDocuments()
    const sells = await Sell.countDocuments()
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
    const viewContents = await ViewContent.countDocuments({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
    if (viewContents) {
      stadistics.viewContents = viewContents
    }
    const addCarts = await AddCart.countDocuments({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
    if (addCarts) {
      stadistics.addCarts = addCarts
    }
    const informations = await Information.countDocuments({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
    if (informations) {
      stadistics.informations = informations
    }
    const sells = await Sell.countDocuments({ createdAt: { $gte: dateInitialFormat, $lte: dateLastFormat } })
    if (sells) {
      stadistics.sells = sells
    }
    return res.send(stadistics)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}