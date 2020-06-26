import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'

const create = async(req, res, role) => {
    
    const user = new User({...req.body, role});
    try {
        await user.save();
        return res.status(200).json({
            message: "Successfully signed up!"
        })
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export default create