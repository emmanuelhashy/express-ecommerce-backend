import express from 'express'
import authCtrl from '../controllers/auth.controller'
import adminCtrl from '../controllers/admin.controller'
import vendorCtrl from '../controllers/vendor.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/auth/userSignin')
  .post(userCtrl.signinUser)

router.route('/auth/vendorSignin')
  .post(vendorCtrl.signinVendor)

router.route('/auth/adminSignin')
  .post(adminCtrl.signinAdmin)
  
router.route('/auth/signout')
  .get(authCtrl.signout)


export default router
