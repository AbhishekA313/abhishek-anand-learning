const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const puppeteer = require('puppeteer');

const { auth } = require('../middleware/auth');
const { sendPlaceOrderEmail }  = require('../emails/account');

const Category = require('../models/category');
const Product = require('../models/product');
const Cart = require('../models/cart');
const SalesOrder = require('../models/salesOrder');
const Address = require('../models/address');

const router = new express.Router();

router.get('/create-category', auth, (req, res) => {
    res.render('createCategory', {
        title: 'Create Category',
        isLoggedIn: req.user ? true : false,
        isAdmin: req.user.employment === 'PRIVATE' ? true : false
    });
})

router.get('/category/get', async (req, res) => {
    try {
        const categories = await Category.find({ is_active: 1 }).select({category_name: 1, _id: 0});
        res.send(categories);
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/create-category/add', auth, async (req, res) => {
    const category = new Category(req.body);

    try {
        await category.save();
        res.send({ category });
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get('/create-product', auth, (req, res) => {
    res.render('createProduct', {
        title: 'Create Product',
        isLoggedIn: req.user ? true : false,
        isAdmin: req.user.employment === 'PRIVATE' ? true : false
    });
})

const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image.'));
        }

        cb(undefined, true);
    }
})

router.post('/create-product/add', auth, upload.single('product_image'), async (req, res) => {
    const product = new Product(req.body);

    try {
        const buffer = await sharp(req.file.buffer).resize({
            width: 600,
            height: 600
        }).png().toBuffer();
        product.product_image = buffer;

        await product.save();
        res.redirect('/create-product');
    } catch (e) {
        res.status(400).send(e);
    }
})

router.post('/product/get', async (req, res) => {
    try {
        const products = await Product.find(req.body);
        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/product/view/:id', auth, (req, res) => {
    res.render('productView', {
        title: 'Product Page',
        isLoggedIn: req.user ? true : false,
        params: req.params
    });
})

router.post('/product/getDetails', auth, async (req, res) => {
    try {
        const products = await Product.find(req.body);
        res.send(products);
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/product/post', auth, async (req, res) => {
    try {
        const product = await Product.findOne({_id: req.body.productId});
        const payload = {
            category_name: product.category_name,
            product_name: product.product_name,
            item_qty: req.body.qty,
            price: product.price,
            customer_email: req.user.email,
            customer_firstname: req.user.firstname,
            customer_lastname: req.user.lastname,
            item_image: product.product_image
        };

        product.inventory = product.inventory - req.body.qty;

        const cart = new Cart(payload);
        await cart.save();
        await product.save();

        res.send({cart});
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/cake', auth, (req, res) => {
    res.render('cake', {
        title: 'Category | Cakes',
        isLoggedIn: req.user ? true : false
    });
})

router.get('/cart', auth, (req, res) => {
    res.render('cart', {
        title: 'Cart Page',
        isLoggedIn: req.user ? true : false
    });
})

router.get('/cart/getDetails', auth, async (req, res) => {
    try {
        const items = await Cart.find({ customer_email: req.user.email, order_placed: 0 });
        res.send({ items, addresses: req.address });
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/checkout/placeOrder', auth, async (req, res) => {
    try {
        const incrementId = Math.floor(Math.random() * 9000000000) + 1000000000;
        const items = await Cart.find({customer_email: req.user.email}).select({price: 1});

        let grandTotal = 0;
        let itemIds = [];
        items.length && items.map(item => {
            grandTotal += parseFloat(item.price);
            itemIds.push({ id: item._id });

            item.order_placed = 1;
            item.order_increment_id = incrementId;

            item.save();
        })

        const payload = {
            increment_id: incrementId,
            item_ids: itemIds,
            customer_email: req.user.email,
            customer_firstname: req.user.firstname,
            customer_lastname: req.user.lastname,
            billing_address: req.body.billing_address,
            shipping_address: req.body.shipping_address,
            grandTotal
        };

        const order = new SalesOrder(payload);
        await order.save();
        sendPlaceOrderEmail(order.customer_email, order.customer_firstname);

        res.send({ order });
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/orders', auth, async (req, res) => {
    try {
        const orders = await SalesOrder.find({ customer_email: req.user.email });
        res.send(orders);
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/getAddressById', auth, async (req, res) => {
    try {
        const address = await Address.findOne(req.body);
        res.send(address);
    } catch (e) {
        res.status(500).send();
    }
})

router.get('/order/view/:id', auth, (req, res) => {
    res.render('orderView', {
        title: 'Order View Page',
        isLoggedIn: req.user ? true : false,
        params: req.params
    });
})

router.post('/order/getDetails', auth, async (req, res) => {
    try {
        const items = await Cart.find({ customer_email: req.user.email, order_increment_id: req.body.increment_id });
        const order = await SalesOrder.findOne(req.body).select({shipping_address: 1, _id: 0});
        const address = await Address.findOne({ _id: order.shipping_address });
        res.send({ items, address });
    } catch (e) {
        res.status(500).send();
    }
})

router.post('/print/invoice', auth, async (req, res) => {
    try {
        const invoiceContent = req.body.html;
        const filePath = __dirname + '/../../public/invoices/order-invoice.pdf';

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(invoiceContent);
        await page.pdf({ path: filePath, format: 'A4' });
        await browser.close();

        res.status(200).send({ status: true });
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;