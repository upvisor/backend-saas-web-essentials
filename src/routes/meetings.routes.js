import { Router } from 'express'
import { CreateMeeting, editCalendar, getCalendar, getMeeting, getMeetings, deleteMeeting, editMeeting, getMeetingsEmail } from '../controllers/meetings.controllers.js'

const router = Router()

router.post('/calendar', editCalendar)

router.get('/calendar', getCalendar)

router.post('/meeting', CreateMeeting)

router.get('/meeting/:id', getMeeting)

router.get('/meetings', getMeetings)

router.delete('/meeting/:id', deleteMeeting)

router.put('/meeting/:id', editMeeting)

router.get('/meetings/:email', getMeetingsEmail)

export default router