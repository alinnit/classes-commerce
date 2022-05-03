import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { DataContext } from "../Context"
import ProductGallery from "./ProductGallery"
import ProductOptions from "./ProductOptions"
import "./ProductPage.css"
import ReactHtmlParser from "react-html-parser"


export class ProductPage extends Component {
  static contextType = DataContext
  state = {
    selectedAttributes: {},
    button: "0"
  }

componentDidMount() {
  const { match = {} } = this.props
  const { params = {} } = match
  const { id } = params
  this.loadProduct({ id })
}

componentDidUpdate(prevProps) {
  const prevId = prevProps?.match?.params?.id
  const id = this.props?.match?.params?.id

  if (prevId && id && prevId !== id) {
    this.loadProduct({ id })
  }
}

handleChange = (name, item) => {
  const { selectedAttributes } = this.state
  this.setState({ selectedAttributes: {
    ...selectedAttributes,
    [name]: item
  } })
}

handlePress() {
  if (this.state.button === "0") {
    this.setState({ button: "1" })
  } else {
    this.setState({ button: "0" })
  }
}

async loadProduct({ id }) {
  const res = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query {
            product (id: "${id}") { 
            id
            name
            inStock
            gallery
            description
            category
            attributes {
              id
              name
              type
              items {
                displayValue
                value
                id
              }
            }
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            brand
          }
        }
       `
    })
  })
  const { data } = await res.json()
  const { product } = data || {}
  this.setState({
    product,
    pictures: product.gallery,
    attributes: product.attributes,
    prices: product.prices,
    description: product.description,
    selectedAttributes: {}
  })
}

  render() {
    const { currentCurrency, addCart } = this.context
    const {
      product = {},
      pictures = [],
      attributes = [],
      prices = [],
      selectedAttributes = {},
      description = ""
    } = this.state

    return (
      <div className="productPage__container">
        <ProductGallery pictures={pictures} />
        <div className="productPage__content">
          <div className="productPage__brand">{product.brand}</div>
          <div className="productPage__model">{product.name}</div>
          <div className="productPage__attributes" >
            <div className="productPage__options">
              {attributes.map(({ name, type, items }) => {
                 return (
                   <ProductOptions
                     name={name}
                     type={type}
                     items={items}
                     handleChange={this.handleChange}
                     selectedAttributes={selectedAttributes}
                     key={type}
                   />
                 )
                })}
            </div>

            <div className="productPage__price">
              <div className="productPage__priceText">Price:</div>
              <div className="productPage__priceValue">
                {prices[currentCurrency]?.currency.symbol}
                {prices[currentCurrency]?.amount}
              </div>
            </div>
            <button
              className={`productPage__addButton${this.state.button}`}
              onClick={() => {
                  addCart(product, selectedAttributes)
               }}
              onMouseDown={() => this.handlePress()}
              onMouseUp={() => this.handlePress()}
            >
              ADD TO CART
            </button>
            <div className="productPage__description">
              {ReactHtmlParser(description)}
            </div>
          </div>
        </div>
      </div>
    )
  }
 }

export default withRouter(ProductPage)