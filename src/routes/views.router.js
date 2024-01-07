import { Router } from "express";
import { productsManager } from '../dao/manager/products.manager.js';
import { cartsManager } from "../dao/manager/carts.manager.js";
import { userManager } from "../dao/manager/users.manager.js";
import { messagesManager } from "../dao/manager/messages.manager.js";

const router = Router()

// HOME
router.get('/', async (req, res) => {
    let ctx = {}
    if(req.user){
        ctx['user'] = req.user
    }
    res.render('home', ctx)
})

router.get('/login', async (req, res) => {
    res.render('login')
})

router.get('/signup', async (req, res) => {
    res.render('signup')
})

router.get('/productsWS', async (req, res) => {
    const products = await productsManager.findAll()
    const cart = req.session.cart;
    res.render('productsWS', { 
        products: products, 
        style: "products",
        cart_id : cart
    })
})

// View de products con paginate pero sin websocket
router.get('/products', async (req, res) => {
    const products = await productsManager.findAllPg(req.query)
    
    const cart_id = req.session.cart
    const first_name = req.session.first_name
    const cart = await cartsManager.findByID(cart_id)
    const obj = JSON.parse(JSON.stringify(products))
    res.render('products', { 
        products: obj.payload, 
        style: "products", 
        info: obj, 
        cart_id: cart_id, 
        user: first_name,
        cart: cart.cart
    })
}) 

router.get('/product/:pid', async (req, res) => {
    const { pid } = req.params
    const product = await productsManager.findByID(pid)
    res.render('oneProduct', { product })
})


// CARTS VIEWS
router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params
    const cart = await cartsManager.findByID(cid)
    res.render('cart', { cart: cart.cart })
})


// CHATS VIEWS
router.get("/chats", async (req, res) => {
    const chats = await messagesManager.findAll()
    res.render("chats", { chats });
});

router.get("/chat/:cid", async (req, res) => {
    const { cid } = req.params
    const chat = await messagesManager.findByID(cid)
    res.render("chat", { chat: chat._id, messages: chat.chats });
});





export default router