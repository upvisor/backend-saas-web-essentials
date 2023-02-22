import AddCart from '../models/AddCart.js'
import ViewContent from '../models/ViewContent.js'
import Information from '../models/Information.js'
import Sell from '../models/Sell.js'
import Subscribe from '../models/Subscribe.js'
import Contact from '../models/Contact.js'

export const getStadistics = async (req, res) => {
  try {
    const viewContents = await ViewContent.find()
    const addCarts = await AddCart.find()
    const informations = await Information.find()
    const sells = await Sell.find()
    const subscriptions = await Subscribe.find()
    const contacts = await Contact.find()
    return res.send([viewContents, addCarts, informations, sells, subscriptions, contacts])
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}