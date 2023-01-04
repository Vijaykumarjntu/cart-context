import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    console.log('working')
    this.setState({cartList: []})
  }

  removeCartItem = y => {
    const {cartList} = this.state
    const newList = cartList.filter(x => x.id !== y)
    this.setState({cartList: newList})
  }

  incrementCartItemQuantity = y => {
    const {cartList} = this.state
    const newList = cartList.map(x => {
      if (x.id === y) {
        return {...x, quantity: x.quantity + 1}
      }
      return x
    })
    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = y => {
    const {cartList} = this.state
    const newList = cartList.map(x => {
      if (x.id === y && x.quantity > 1) {
        return {...x, quantity: x.quantity - 1}
      }
      return x
    })
    this.setState({cartList: newList})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App