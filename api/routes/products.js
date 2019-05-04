const  express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductController = require('../controllers/product');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime()+ '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }


};

const upload = multer({storage: storage,
    limits: {
        fileSize: 1024*1024 * 5
    },
    fileFilter: fileFilter
});

/*const upload = multer({storage: storage});*/
const Product = require('../models/product');



router.post('/',checkAuth, upload.single('productImage'),  ProductController.products_create_product);

router.get('/',checkAuth, ProductController.products_get_all);

router.get('/:productId',checkAuth, ProductController.products_get_product);

router.delete('/:productId',checkAuth, ProductController.products_delete_product);

router.patch('/:productId',checkAuth, ProductController.products_patch_product);

module.exports = router;