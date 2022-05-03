import React, { Component } from "react"
import "./Cart.css"


class SelectedOption extends Component {

  render() {
    const { item, type, name } = this.props
    switch (type) {
      case ("swatch"): {
        return (
          <div className="cart__attribute">
            <div className="cart__attributeName">{name}</div>
            <div className={`productPage__${type}${item.id}`} />
          </div>
        )
      }
      default: {
        return (
          <div className="cart__attribute">
            <div className="cart__attributeName">{name}</div>
            <div className="cart__attributeValue">{item.id}</div>
          </div>
        )
      }
    }
  }
}

export default SelectedOption