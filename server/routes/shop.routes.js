import express from 'express'
import vendorCtrl from '../controllers/vendor.controller'
import authCtrl from '../controllers/auth.controller'
import shopCtrl from '../controllers/shop.controller'

const router = express.Router()

// VIEW A SINGLE SHOP
router.route('/api/shop/:shopId')
  .get(shopCtrl.read)

// VENDOR CREATE SHOP AND VIEW HIS LIST OF SHOPS
router.route('/api/shops/by/:vendorId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, vendorCtrl.isVendor, shopCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, vendorCtrl.isVendor, shopCtrl.listByOwner)  
  


// VENDOR UPDATE SHOP AND DELETE HIS SHOP BY ID
router.route('/api/shops/:shopId')
  .put(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.update)
  .delete(authCtrl.requireSignin, shopCtrl.isOwner, shopCtrl.remove)

router.param('shopId', shopCtrl.shopByID)
router.param('vendorId', vendorCtrl.vendorByID)

export default router
