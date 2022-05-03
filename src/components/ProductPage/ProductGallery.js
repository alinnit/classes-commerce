import React, { Component } from "react"
import "./ProductPage.css"

export class ProductGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPic: 0
    }
  }

  updateCurrentPic = (i) => {
    this.setState({ currentPic: i })
  }

  render() {
    const { pictures } = this.props
    const { currentPic = 0 } = this.state
    return (
      <div className="productPage__gallery">
        <div className="productPage__gallery__imageList">
          {pictures.map((url, i) => (
            <img
              className="gallery__images"
              key={i}
              src={url}
              alt=""
              width="80"
              height="80"
              onClick={() => this.updateCurrentPic(i)}
            />
              )
              )}
        </div>
        <div className="productPage__gallery__image">
          <img src={pictures[currentPic]} alt="" width="610" height="511" />
        </div>
      </div>
    )
  }

}


export default ProductGallery