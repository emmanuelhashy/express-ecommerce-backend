import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../config/config'

const signin = async (req, res, role) => {
    try {
        let user = await User.findOne({"email": req.body.email});
        if(!user)
            return res.status(401).json({
                error: 'User not Found'
            })
        if(!user.authenticate(req.body.password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }
        // We will check the role
        if (user.role !== role) {
            return res.status(403).json({
            message: "Please make sure you are logging in from the right portal.",
            success: false
            });
        }
        const token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)
    
        res.cookie("t", token, {
        expire: new Date() + 9999
        })
        return res.json({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role
            }
        })
    } catch (err) {
        return res.status('401').json({
            error: "Could not sign in"
        })
    }
} 


const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
}

const isAdmin = (req, res, next) => {
    const admin = req.profile && req.auth && req.profile.role === "admin";
    if(!(admin)) {
        return res.status('403').json({
            error: "User is not an admin"
        })
    };
    next();
}

const isVendor = (req, res, next) => {
    const admin = req.profile && req.auth && req.profile.role === "vendor";
    if(!(admin)) {
        return res.status('403').json({
            error: "User is not a vendor"
        })
    };
    next();
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out"
    })
}

export default {
    signin,
    signout,
    requireSignin,
    hasAuthorization,
    isVendor,
    isAdmin
}