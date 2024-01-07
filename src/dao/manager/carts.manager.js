import { cartsModel } from '../models/carts.model.js'
import Manager from './manager.js';
import { productsManager } from './products.manager.js';

class CartsManager extends Manager {
    constructor() {
        super(cartsModel)
    }

    async findByID(id) {
        return cartsModel.findById({ _id: id }).populate('cart.product').lean()
    }

    async addProdToCart(cid, pid) {
        // TEST: http://localhost:8080/api/carts/654acfec48a93452f4574154/product/6530cc0f5485577be08cd83e
        try {
            let cart = await this.findByID(cid)
            let product = await productsManager.findByID(pid)

            if (!cart) {
                throw new Error("Cart not found");
            }

            if (!product) {
                throw new Error("product not found");
            }

            const prod = cart.cart.find(
                (p) => p.product._id == pid
            );

            if (prod) {
                // agregar 1 en el quantity
                prod.quantity += 1
            } else {
                // agregar el producto por primera vez
                const obj = {
                    cart: [
                        {
                            product: pid,
                            quantity: 1
                        }
                    ]
                }

                cart.cart = [...cart.cart, ...obj.cart]
            }
            const res = await this.updateOne(cart._id, cart)
            return res;
        } catch (error) {
            return error
        }
    }


    async deleteProdFromCart(cid, pid) {
        try {

            const cart = await this.findByID(cid)
            const prod = await productsManager.findByID(pid)

            if (!cart) {
                throw new Error("Cart not found");
            }

            if (!prod) {
                throw new Error("product not found");
            }

            // Verificar que tenga ese producto en el cart. 
            // En caso de que no, avisar
            // Si lo tiene, debo verificar si el resultado del quantity-1 da 0,
            // debo eliminar el producto. si no, setear el resultado. 

            let product = cart.cart.find(product => {
                return product.product._id.equals(prod._id)
            })
            if (product) {
                // Verificar si el resultado de quantity-1 es 0 
                const op = product.quantity - 1
                
                if (op <= 0) {
                    // Si lo es, eliminar producto.
                                        
                    cart.cart = cart.cart.filter( p => p._id !== product._id)

                    const deleted = await this.updateOne(cart._id, cart)

                    return deleted
                } else {
                    // Si no, setear el resultado de la operación como nuevo quantity
                    
                    product.quantity = op
                    
                    const res = await this.updateOne(cart._id, cart)
                    return res
                }
            } else {
                // retornar que no existe ese producto en el carrito.
                throw new Error("Product doesn't exists in this cart.")
            }


        } catch (error) {
            return error
        }
    }
    
}

export const cartsManager = new CartsManager();
