import {Router} from 'express'
import {commit, create, refund, status} from '../controllers/pagos.controllers.js'
import pkg from 'transbank-sdk'
const { WebpayPlus } = pkg

const router = Router ()

router.use(function (req, res, next) {
  if (process.env.WPP_CC && process.env.WPP_KEY) {
    WebpayPlus.configureForProduction(process.env.WPP_CC, process.env.WPP_KEY)
  } else {
    WebpayPlus.configureForTesting()
  }
  next()
})

router.post("/pagos/create", create)
router.get("/pagos/commit", commit)
router.post("/pagos/commit", commit)
router.post("/pagos/status", status)
router.post("/pagos/refund", refund)

export default router