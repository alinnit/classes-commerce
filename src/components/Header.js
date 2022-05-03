import React, { Component } from "react"
import { Link } from "react-router-dom"
import { DataContext } from "./Context"
import "./Header.css"
import logo from "../logo.png"
import CartItems from "./Cart/CartItems"
import cartimg from "../cartimg.png"
import cartimgitems from "../cartimgitems.png"

class Header extends Component {
  static contextType = DataContext
  state = {
    modalIsOpen: false
  }

  render() {
    const { categories, updateCurrency, currentCurrency, cart, total } = this.context
    const { modalIsOpen, currentCategory } = this.state

    const count = Object.values(cart).reduce((sum, cartItem) => {
      const { qty } = cartItem
      return sum + qty
    }, 0)

    return (
      <header>
        <div className="header__container">
          <nav className="header__left">
            {categories.map(({ name }) => {
              const selected = currentCategory === name
              return (
                <ul key={name}>
                  <li>
                    <Link
                      to={`/?category=${name}`}
                      className="header__links"
                      onClick={() => this.setState({ currentCategory: name })}
                    >
                      {selected &&
                        <div className="header__selected">{name}</div>
                      }
                      {!selected &&
                        <div>{name}</div>
                      }
                    </Link>
                  </li>
                </ul>
              )
            })}
          </nav>

          <img className="logo" alt="" src={logo} />

          <div className="header__right">
            <div className="currencyChanger">
              <select
                className="currency"
                onChange={(event) => updateCurrency(event.target.value)}
                value={currentCurrency}
              >
                <option value="0">$ USD</option>
                <option value="1">£ GBP</option>
                <option value="2">A$ AUD</option>
                <option value="3">¥ JPY</option>
                <option value="4">₽ RUB</option>
              </select>
            </div>
            <div className="header__cart">
              {(count < 1) &&
                <div>
                  <img
                    alt=""
                    src={cartimg}
                    width="26.67"
                    height="20"
                    onClick={() => this.setState({ modalIsOpen: !modalIsOpen })}
                  />
                </div>
              }
              {(count >= 1) &&
                <div className="cart__imageContainer">
                  <div className="cart__image">
                    <img
                      alt=""
                      src={cartimgitems}
                      width="26.67"
                      height="20"
                      onClick={() => this.setState({ modalIsOpen: !modalIsOpen })}
                    />
                  </div>
                  <div className="cart__imageText">{count}</div>
                </div>
              }

              {modalIsOpen &&
                <div
                  className="cartModal__overlay"
                  onClick={() => this.setState({ modalIsOpen: false })}
                >
                  <div
                    className="cartModal"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="cartModal__header">
                      <strong>My Bag</strong>
                      {`${count} items`}
                    </div>
                    <div className="cartModal__content">
                      <CartItems />
                    </div>
                    <div className="cartModal__footer">
                      <div className="cartModal__row">
                        Total: {categories[0].products[0].prices[currentCurrency].currency.symbol}{" "}{total}
                      </div>
                      <div className="cartModal__row">
                        <button className="modal__buttonBag" onClick={() => this.setState({ modalIsOpen: false })}>
                          <Link to="/cart">
                            View bag
                          </Link>
                        </button>
                        <button className="modal__buttonCheckOut">Check Out</button>
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
            <div></div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header