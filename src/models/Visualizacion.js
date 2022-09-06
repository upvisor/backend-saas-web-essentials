import mongoose from 'mongoose'

const VisualizacionSchema = mongoose.Schema({
    producto: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Visualizacion', VisualizacionSchema)