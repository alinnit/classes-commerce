
import React, { Component } from "react"
import _ from "lodash"


export const DataContext = React.createContext()

export class DataProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      currentCurrency: "0",
      cart: {},
      product: {},
      total: 0
    }
  }

  updateCurrency = (currentCurrency) => {
    this.setState({ currentCurrency })
  }

  getCartKey = ({ product, selectedAttributes }) => {
    const { name } = product
    const attributesKey = _.sortBy(Object.entries(selectedAttributes), ([name]) => name)
      .map(([name, item]) => `${name}-${item.id}`)
      .join("-")
      .concat(name)
    return attributesKey

  }

  addCart = (product, selectedAttributes) => {
    const { cart, currentCurrency } = this.state
    const cartKey = this.getCartKey({ product, selectedAttributes })
    const cartItem = cart[cartKey] || { product, selectedAttributes }
    const qty = (cartItem?.qty || 0) + 1
    this.setState({ cart: {
        ...cart,
        [cartKey]: {
          ...cartItem,
          qty,
          subTotal: qty * product.prices[currentCurrency].amount
        }
      } })
  }

  deleteCart = (product, selectedAttributes) => {
    const { cart, currentCurrency } = this.state
    const cartKey = this.getCartKey({ product, selectedAttributes })
    const cartItem = cart[cartKey] || { product, selectedAttributes }
    const qty = (cartItem?.qty || 1) - 1
    if (qty) {
      this.setState({ cart: {
        ...cart,
        [cartKey]: {
          ...cartItem,
          qty,
          subTotal:
            (cartItem.qty * product.prices[currentCurrency].amount) -
            product?.prices[currentCurrency].amount
        }
      } })
    } else {

      this.setState({ cart: _.pickBy({
        ...cart,
        [cartKey]: false
      }, Boolean)
    })
    }
  }

  componentDidMount() {
    this.loadCategories()
  }


  async loadCategories() {
    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            categories {
              name
              products {
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
        }
         `
      })
    })
    const { data } = await res.json()
    const { categories } = data || {}

    this.setState({
      categories,
      products: categories?.[0]?.products,
    })
 }

  render() {
    const { products, categories, currentCurrency, cart } = this.state
    const { children } = this.props
    const { updateCurrency, addCart, deleteCart } = this
    const total = Object.values(this.state.cart).reduce((acc, item) => {
      return acc + item.subTotal
    }, 0)

    return (
      <DataContext.Provider
        value={{
          products,
          categories,
          currentCurrency,
          updateCurrency,
          cart,
          addCart,
          deleteCart,
          total
        }}
      >
        {children}

      </DataContext.Provider>
    )
  }
}
