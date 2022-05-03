import React, { Component } from "react"
import "./ProductPage.css"

export class ProductOptions extends Component {

  render() {
    const { name, items, type, selectedAttributes, handleChange } = this.props
    return (
      <div
        key={name}
        className="attribute__container"
      >
        <div className="optionName">{name}{":"}</div>
        <div className="options__container">
          {items.map((item) => {
            // TODO: use switch (true)
                      const { value, displayValue } = item
                      const selected = selectedAttributes[name]?.value === value
                      if (selected === true && type === "swatch") {
                        return (
                          <div
                            key={value}
                            className={`productPage__${type}${displayValue}__selected`}
                            onClick={() => handleChange(name, item)}
                          />
                        )
                      } else if (selected !== true && type === "swatch") {
                        return (
                          <div
                            key={value}
                            className={`productPage__${type}${displayValue}`}
                            onClick={() => handleChange(name, item)}
                          />
                        )
                      } else if (selected === true && type === "text") {
                          return (
                            <div
                              key={value}
                              className={`productPage__${type}__selected`}
                              onClick={() => handleChange(name, item)}
                            >
                              {value}
                            </div>
                          )
                        } else {
                          return (
                            <div
                              key={value}
                              className={`productPage__${type}`}
                              onClick={() => handleChange(name, item)}
                            >
                              {value}
                            </div>
                          )
                        }

            })}
        </div>
      </div>
    )
  }

}


export default ProductOptions