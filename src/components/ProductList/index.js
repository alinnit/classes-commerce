import React, { Component } from "react"
import { DataContext } from "../Context"
import ProductCard from "./ProductCard"
import { withRouter } from "react-router-dom"
import qs from "qs"


class ProductList extends Component {

  static contextType = DataContext

  render() {
    const { categories } = this.context
    const { location = {} } = this.props
    const { search = "" } = location
    const { category = "all" } = qs.parse(search, { ignoreQueryPrefix: true })

    return (
      <div id="productList" className="productList">
        <div className="categoryName">{category}</div>
        {categories
          .filter(({ name }) => name === category)
          .map(({ products }, key) => {
            return (
              <div key={key} className="productList__card">
                <ProductCard
                  products={products}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default withRouter(ProductList)

