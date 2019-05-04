const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.users_get_all = (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            const response = {
                'count': docs.length,
                products: docs.map(doc =>{
                    return {
                        doc: doc,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3003/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.users_delete_user = (req, res, next) => {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.users_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length < 1){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            _id: user[0]._id,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );

                    return  res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Auth failed"
                });
            })
        })
        .catch( err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.users_signup = (req, res, next)=> {

    User.find({email: req.body.email})
        .exec()
        .then(user => {
            console.log(user);
            if(user.length > 0){
                return res.status(409).json({
                    message: "Email is existed"
                });
            }
            else{
                bcrypt.hash(req.body.password, 10, (err, hash)=> {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(200).json({
                                    message: "User creared !",
                                    result: result
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch();


}