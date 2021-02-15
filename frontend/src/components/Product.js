import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="row">
          <div className="price">${product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {/* product.seller.seller.name points to the product model.seller which refs user model object, which then points the usermodel.seller.name */}
              {product.seller.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
