import Category from "../models/Category.js"

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().lean()
    res.send(categories)
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}