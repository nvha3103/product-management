// Caapj nhật số lượng sản phẩm trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']")
if (inputQuantity.length > 0) {
    inputQuantity.forEach(input => {
        input.addEventListener("change", () => {
            const productId = input.getAttribute("product-id")
            const quantity = input.value;
            console.log(productId)
            console.log(quantity)

            window.location.href = `/cart/update/${productId}/${quantity}`
            // console.log(e.target.value);
        })
    })
}
// Caapj nhật số lượng sản phẩm trong giỏ hàng