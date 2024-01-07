// import { Router } from "express";
// import { userManager } from "../dao/manager/users.manager.js";
// import { cartsManager } from "../dao/manager/carts.manager.js";

// const router = Router();


// router.get('/', async (req, res) => {
//     const session = {
//         first_name: req.session.first_name,
//         email: req.session.email,
//         cart: req.session.cart 
//     }
//     res.json(session)
// })

// router.post('/login', async (req,res) => {
//     const { email, password } = req.body;
//     const userDB = await userManager.findByField({'email':email})
//     if(!userDB){
//         return res.json({ error: "This email does not exists" })
//     }

//     req.session["email"] = email;
//     req.session["cart"] = userDB.cart;
//     req.session["first_name"] = userDB.first_name;
    
//     if( email == "adminCoder@coder.com" && password === "Cod3r123"){
//         req.session["isAdmin"] = true;
//     }

//     res.redirect("/")
// })

// router.post('/signup', async (req,res) => {
//     const cart = await cartsManager.createOne({});
//     const user = { ...req.body, cart: cart._id};
//     const createdUser = await userManager.createOne(user);
//     res.redirect('/login')
// })

// export default router;
