import express from 'express'
import vendorCtrl from '../controllers/vendor.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/vendors')
    .get(vendorCtrl.list)
    .post(vendorCtrl.createvendor)

router.route('/api/vendors/:vendorId')
    .get(authCtrl.requireSignin, vendorCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, vendorCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, vendorCtrl.remove)

router.param('vendorId', vendorCtrl.vendorByID)

export default router