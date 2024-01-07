const socketClient = io()


const form = document.getElementById("create_product_form")
const products = document.getElementById("show_products_list")
const cartList = document.getElementById("cartList")
const addCartForm = document.getElementById("addCartForm")
const prodDetailsForm = document.getElementById("productDetailsForm")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const code = e.target.elements.code.value;
    const price = e.target.elements.price.value;
    const status = e.target.elements.status.value;
    const stock = e.target.elements.stock.value;
    const category = e.target.elements.category.value;
    const thumbnail = e.target.elements.thumbnail.value;

    const product = {
        title: title,
        description: description,
        code: code,
        price: parseInt(price),
        status: status,
        stock: parseInt(stock),
        category: category,
        thumbnail: thumbnail,
    }
    socketClient.emit("product", product)
})

socketClient.on("allProducts", (productList) => {
    const prods = productList.map((prod) => `
            <div class="prod_info">
                <h2>${prod.title}</h2>
                <h3>${prod.description}</h3>
                <p>${prod.price} | Cantidad disponible: ${prod.stock}</p>
                <hr>
            </div>
            <div class="prod_btns">
                <form action="" method="get" id="addCartForm">
                    <input type="hidden" name="product_id" value="{{this._id}}">
                    <input type="hidden" name="cart_id" value="{{@root.cart_id}}">
                    <button type="submit">ADD TO CART</button>
                </form>
                <form action="product/{{this._id}}" method="get" id="productDetailsForm">
                    <button type="submit">SHOW DETAILS</button>
                </form>
            </div>
            `).join(" ")
    products.innerHTML = prods
})



addCartForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const product_id = e.target.elements.product_id.value;
    const cart_id = e.target.elements.cart_id.value;
    console.log("-------------");
    console.log("product_id");
    console.log(product_id);
    console.log("cart_id");
    console.log(cart_id);
    console.log("-------------");

    const obj = {
        product_id,
        cart_id
    }
    socketClient.emit("addCart", obj)
})
socketClient.on("cartProducts", (productList) => {
    const prods = productList.map((prod) => `
            <div class="prod_info">
                <h2>${prod.product.title}</h2>
                <h3>${prod.product.description}</h3>
                <p>${prod.product.price} | Cantidad: ${prod.quantity}</p>
                <hr>
            </div>
            `).join(" ")
    console.log("----------------------")
    console.log("prods")
    console.log(prods)
    console.log("----------------------")
    cartList.innerHTML = prods
})
