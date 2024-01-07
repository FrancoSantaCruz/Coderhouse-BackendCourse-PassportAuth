import { Router } from 'express'
import { productsManager } from '../dao/manager/products.manager.js'

const router = Router()


router.get('/', async(req, res) => {
    try {
        const products = await productsManager.findAllPg(req.query)
        if(!products){
            res.status(200).json({message: 'No products found.'})
        } else {
            res.status(200).json({message:'Products found', products})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.get('/:pid', async(req,res) => {
    const {pid} = req.params;
    try {
        const product = await productsManager.findByID(pid)
        if(!product){
            res.status(400).json({message:'Product not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Product found.', product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }

})

router.post('/', async (req,res) => {
    const {title, description, code, price, status, stock, category, thumbnails} = req.body
    if(!title || !description || !price || !code || !stock || !category || !status){
        return res.status(400).json({message: 'Some data is missing.'})
    }
    const obj = {
        title : title,
        description : description,
        code:code,
        price: parseInt(price),
        status: status == "True" ? true : false,
        stock: parseInt(stock),
        category:category,
        thumbnails: thumbnails ? thumbnails : []
    }

    try {
        const newProduct = await productsManager.createOne(obj)
        res.redirect(`/product/${newProduct._id}`)
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.delete('/:pid', async(req,res) => {
    const {pid} = req.params
    try {
        const product = await productsManager.deleteOne(pid)
        if(!product){
            res.status(400).json({message:'Product not found with the ID sent.'})
        } else {
            res.status(200).json({message:'Product deleted successfully', productDeleted : product})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

router.put('/:pid', async(req,res) => {
    const {pid} = req.params
    const {title, description, code, price, status, stock, category, thumbnails} = req.body
    if(!title || !description || !price || !code || !stock || !category || !status){
        return res.status(400).json({message: 'Some data is missing.'})
    }
    const obj = {
        title : title,
        description : description,
        code:code,
        price: parseInt(price),
        status: status == "True" ? true : false,
        stock: parseInt(stock),
        category:category,
        thumbnails: thumbnails ? thumbnails : []
    }

    try {
        const prodUpdated = await productsManager.updateOne(pid, obj)
        if(!prodUpdated){
            res.status(400).json({message:'Product not found with the ID sent or the information is invalid.'})
        } else{ 
            res.status(200).json({message:'Product updated.', ProductUpdated : prodUpdated})
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
})

export default router;