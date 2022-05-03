import React, { Component } from "react"
import { DataContext } from "../Context"
import CartProduct from "./CartProduct"

import "./Cart.css"

class CartItems extends Component {
  static contextType = DataContext

  render() {

    const { cart } = this.context
    if (cart.length === 0) return <div>Cart is empty</div>

    return (
      <div className="cart">
        {Object.values(cart).map((item, index) => {
          return (
            <div className="cart__indexProducts" key={index}>
              <CartProduct
                key={index}
                item={item}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default CartItems