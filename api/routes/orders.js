const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');
const  OrdersController = require('../controllers/order') ;
router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/',checkAuth, OrdersController.orders_create_order);

router.get('/:orderId',checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId',checkAuth, OrdersController.order_delete_order);

module.exports = router;