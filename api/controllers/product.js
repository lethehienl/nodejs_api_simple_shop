const mongoose = require('mongoose');
const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                'count': docs.length,
                products: docs.map(doc =>{
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request:{
                            type: 'GET',
                            url: 'http://localhost:3003/products/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);

            /*if (docs.length >0){
              res.status(200).json(response);
            }
            else{
              res.status(404).json({
                message: "No entries found"
              });
            }*/

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    /*  res.status(200).json({
        message: "it work ! GET PRODUCT"
      });*/
}

exports.products_create_product =   (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    productImage: result.productImage,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3003/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });


    /*res.status(200).json({
      message: "it work ! POST PRODUCT",
      createProduct: product
    });*/
}



exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({
                    product: doc,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3003/products'
                    }
                });
            }
            else{
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }


        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });

    /* if(id === 'special'){
       res.status(200).json({
         message: "You discovered the special ID",
         id: id
       });
     }
     else {
       res.status(200).json({
         message: "you passed an ID"
       });
     }*/

}

exports.products_delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    /*res.status(200).json({
      message: "it work ! DELETE PRODUCT"
    });*/
}

exports.products_patch_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops  of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, { $set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "updated product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    productImage: result.productImage,
                    request:{
                        type: 'GET',
                        url: 'http://localhost:3003/products/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    /* res.status(200).json({
       message: "it work ! PATCH PRODUCT"
     });*/
}