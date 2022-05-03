import React, { Component } from "react"
import { DataContext } from "../Context"
import "./Cart.css"
import CartItems from "./CartItems"

export class Cart extends Component {
  static contextType = DataContext

  render() {
    const { categories, total, currentCurrency } = this.context
    return (
      <div className="cart">
        <div className="cart__items">
          <CartItems />
        </div>
        <div className="cart__indexBottom">
          Total: {categories[0].products[0].prices[currentCurrency].currency.symbol}{" "}{total}
        </div>
      </div>
    )
  }
}

export default Cart

