import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} alt="d" variant="top"></Card.Img>
        <Card.Title as="div" className="product-title">
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="h3"><Rating value={product.rating} text={`${product.numReviews} reviews`}/></Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Link>
    </Card>
  );
};

export default Product;
