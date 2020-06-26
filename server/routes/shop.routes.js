import express from 'express'
import vendorCtrl from '../controllers/vendor.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()




// VENDOR CREATE SHOP AND VIEW HIS LIST OF SHOPS
router.route('/api/shops/by/:vendorId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, vendorCtrl.isVendor, shopCtrl.create)
  


router.param('vendorId', vendorCtrl.vendorByID)

export default router
