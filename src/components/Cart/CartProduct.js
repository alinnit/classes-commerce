import React, { Component } from "react"
import { DataContext } from "../Context"
import SelectedOption from "./SelectedOption"
import "./Cart.css"

export class CartProduct extends Component {
  static contextType = DataContext

  render() {
    const { currentCurrency, addCart, deleteCart } = this.context
    const { item } = this.props
    const { qty, product, selectedAttributes } = item
    const { name, brand, prices, gallery } = product
    return (
      <div>
        <div className="cart__product">
          <div className="cart__productLeft">
            <div className="cart__brand">
              {brand}
            </div>
            <div className="cart__name">
              {name}
            </div>
            <div className="cart__price">
              {prices[currentCurrency].currency.symbol}{prices[currentCurrency].amount}
            </div>
            <div className="cart__attributes">
              {Object.entries(selectedAttributes).map(([name, item]) => {
                const { attributes = [] } = product
                const attribute = attributes.find((attribute) => attribute.name === name)
                const { type } = attribute || {}
                return (
                  <SelectedOption
                    key={name}
                    name={name}
                    item={item}
                    type={type}
                  />
                )
              })}
            </div>
          </div>
          <div className="cart__productRight">
            <div className="cart__quantity">
              <button
                className="cart__quantityButton"
                onClick={() => addCart(product, selectedAttributes)}
              >
                +
              </button>
              <div className="cart__quantityNumber">{qty}</div>
              <button
                className="cart__quantityButton"
                onClick={() => deleteCart(product, selectedAttributes)}
              >
                -
              </button>
            </div>
            <img className="cart__productImage" alt="" src={gallery[0]} width="145" height="145" />
          </div>
        </div>
      </div>
    )
  }
}

export default CartProduct