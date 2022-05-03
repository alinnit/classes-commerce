import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/Header"
import { DataProvider } from "./components/Context"
import ProductList from "components/ProductList"
import ProductPage from "components/ProductPage"
import Cart from "components/Cart"

class App extends React.Component {
  render() {
    return (
      <DataProvider>
        <div className="app">
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={ProductList} />
              <Route path="/product/:id" component={ProductPage} />
              <Route path="/cart" exact component={Cart} />
            </Switch>
          </Router>
        </div>
      </DataProvider>
    )
  }
}

export default App
