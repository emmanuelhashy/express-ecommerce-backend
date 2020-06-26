import express from 'express'
import adminCtrl from '../controllers/admin.controller'
import authCtrl from '../controllers/auth.controller'
import Roles from '../utils/roles'

const router = express.Router();

// Admin Registration Route
router.route('/api/admins')
    .post(adminCtrl.createAdmin)

router.route('/api/admins/:adminId')
  .get(authCtrl.requireSignin, adminCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, adminCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, adminCtrl.remove)

router.param('adminId', adminCtrl.adminByID)

// Admin Protected Route
router.get(
  "/admin-protectd",
  authCtrl.requireSignin,
  Roles.checkRole(["admin"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

export default router