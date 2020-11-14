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
import { Link, withRouter } from "react-router-dom";

const ProductSmall = ({ product, history, match }) => {
  const redirect = () => {
    console.log(match.params);
    if (match.params.name) {
      history.push(`${product.name}`);
    } else {
      history.push(`productscreen/${product.name}`);
    }
  };
  return (
    <div>
      <Card
        style={{
          width: "18rem",
          maxHeight: "25rem",
          display: "flex",
          flexFlow: "column nowrap",
          flex: "1",
        }}
        className='h-200 m-3 p-3 rounded shadow-sm'
      >
        <div></div>
        <Card.Img
          class=' card-img-top img-fluid rounded mx-auto d-block embed-responsive'
          src={product.image}
          variant='thumbnail'
          style={{ position: "relative", height: "30vh", width: "45vw" }}
        />

        <Card.Body>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Card.Body>

        <div style={{ borderBottom: "2px solid #333" }}></div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: " 0 0.2rem",
            flexShrink: 0,
          }}
        >
          <h3 style={{ margin: "1rem" }}> ${product.price}</h3>

          <Button onClick={() => redirect()} variant='danger'>
            Buy Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(ProductSmall);
