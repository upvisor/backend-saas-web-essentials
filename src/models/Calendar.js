import mongoose from 'mongoose'

const CalendarSchema = new mongoose.Schema({
    dates: [{ date: { type: Date, required: true }, hours: [{ type: Number, required: true }]}],
}, {
    timestamps: true
})

const Calendar = mongoose.models.Calendar || mongoose.model('Calendar', CalendarSchema)

export default Calendar