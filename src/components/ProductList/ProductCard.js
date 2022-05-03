import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "../Context"
import "./ProductCards.css"
import normal from "../../normal.png"
import pressed from "../../pressed.png"


class ProductCard extends Component {
  static contextType = DataContext
  state = {
    button: normal,
    selectedAttributes: {}
  }

  handlePress() {
    if (this.state.button === normal) {
      this.setState({ button: pressed })
    } else {
      this.setState({ button: normal })
    }
  }


  render() {
  const { currentCurrency, addCart } = this.context
  const { selectedAttributes } = this.state
  const { products } = this.props

  return (
    <div className="productCard__container">
      {products.map(({ id, name, gallery, prices }) => (
        <Link
          to={`/product/${id}`}
          key={id}
          style={{ textDecoration: "none" }}
        >
          <div
            className="productCard"
          >
            <div className="productCard__image">
              <img
                src={gallery[0]}
                alt={id}
                width="354"
                height="330"
              />
            </div>
            <div className="productCard__content">
              <div className="productCard__contentRight">
                <div className="productCard__name">
                  {name}
                </div>
                <div className="productCard__price">
                  {prices[currentCurrency].currency.symbol}{prices[currentCurrency].amount}
                </div>
              </div>
              <img
                alt=""
                src={`${this.state.button}`}
                onClick={(event) => {
                  event.preventDefault()
                  addCart(products.find(product => product.id === id), selectedAttributes)
                }}
              />
            </div>
          </div>
        </Link>
       ))}
    </div>
  )
  }
}

export default ProductCard

