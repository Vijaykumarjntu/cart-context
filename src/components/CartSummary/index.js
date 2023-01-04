// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const pricesArray = cartList.map(x => x.price * x.quantity)
      let sum = 0
      for (let i = 0; i < pricesArray.length; i += 1) {
        sum += pricesArray[i]
      }
      const remove = () => {
        removeAllCartItems()
      }
      return (
        <>
          <h1>Cart Summary RS:{sum}</h1>
          <h1>{cartList.length} items in cart</h1>
          <button type="button" onClick={remove}>
            Clear All
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
