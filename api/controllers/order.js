const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
exports.orders_get_all =  (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name price _id')
        .exec()
        .then(docs =>{
            console.log(docs);
            res.status(201).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3003:/orders/" + doc._id
                        }
                    }
                })
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_create_order =(req, res, next) =>{
    Product.findById(req.body.productId).exec()
        .then(product => {

            if(!product){
                return  res.status(404).json({
                    message: "product not found!"
                });
            }
            const order =  new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order.save();
        })

        .then(result =>{
            console.log(result);
            res.status(201).json({
                message: "Order Stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3003:/orders/" + result._id
                }
            });
        })
        .catch(err =>{
            res.status(500).json({
                message: "Product not found",
                error: err
            });
        });

    /*const order = {
      productId: req.body.productId,
      quantity: req.body.quantity
    };

    res.status(200).json({
      message: "it work ! POST ORDER",
      order: order
    });*/
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .select('product quantity _id')
        .populate('product', 'name price _id')
        .exec()
        .then(order=> {
            if(!order){
                return res.status(404).json({
                    message: "Order not found"
                });
            }
            console.log(order);
            res.status(200).json({
                order: order,
                request: {
                    type: "GET",
                    url: "http://localhost:3003/orders/"
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
    /*const id = req.params.orderId;
    if(id === 'special'){
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

exports.order_delete_order = (req, res, next) => {
    Order.remove({_id: req.params.orderId})
        .exec()
        .then(result=>{
            res.status(200).json({
                message: "order deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3003/order",
                    body: {productId: "ID", quantity: "Number"}
                }
            });
        })
        .catch(err =>{
            res.status(404).json({
                message: "Order not found !",
                error: err
            });
        })
    /*res.status(200).json({
      message: "it work ! DELETE ORDER"
    });*/
}