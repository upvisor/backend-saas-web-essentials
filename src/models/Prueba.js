import mongoose from 'mongoose'

const PruebaSchema = new mongoose.Schema({
  date: { type: Date }
})

const Prueba = mongoose.models.Prueba || mongoose.model('Prueba', PruebaSchema)

export default Prueba