import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Carousel,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductSmall = ({ product }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} className='m-3 p-3 rounded shadow-sm'>
        <Card.Img
          class=' img-fluid rounded mx-auto d-block'
          src='https://drive.google.com/file/d/1kFCXWIaM0oB9Xy-PhQZMx054cWgQ78ob/view?usp=sharing'
          variant='top'
        />

        <Card.Body>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Card.Body>
        <Card.Text as='div'>{product.description}</Card.Text>
        <div style={{ borderBottom: "2px solid #333" }}></div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: " 0 0.2rem",
          }}
        >
          <h3 style={{ margin: "1rem" }}> ${product.price}</h3>

          <Link
            style={{
              border: "none",
              backgroundColor: "transparent",
              textDecoration: "none",
            }}
            to={`productscreen/${product.name}`}
          >
            <Button variant='danger'>Buy Now</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ProductSmall;
