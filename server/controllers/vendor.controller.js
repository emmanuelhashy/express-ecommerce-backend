import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import authCtrl from './auth.controller'
import create from './utils.controller'


const createVendor = async(req, res) => {
    const role = 'user'
    return create(req, res, role)
}

const signinVendor = (req, res) => {
    const role = 'user'
    return authCtrl.signin(req, res, role)
}

const list = async (req, res) => {
    try {
        let users = await User.find().select('name email role updated created');
        res.json(users)

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const vendorByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(400).json({
                error: 'User not Found'
            });
        }
        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: 'Could not retrieve user'
        })
    }
}

const read = async (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const update = async (req, res) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
        user.hashed_password = undefined;
        user.salt = undefined;
        res.json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const remove = async (req, res) => {
    try {
        const user = req.profile;
        let deletedUser = await user.remove();
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}


// CRUD OPERATION FOR SHOPS


export default {
    createVendor,
    list,
    read,
    update,
    remove,
    vendorByID,
    signinVendor
}