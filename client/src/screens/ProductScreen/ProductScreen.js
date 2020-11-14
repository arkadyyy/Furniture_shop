import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../../components/Navbar";
import { AddItemToCart } from "../../actions/CartActions";
import ProductSmall from "../../components/ProductSmall";
import Footer from "../../components/Footer";

const ProductScreen = ({ match, history }) => {
  const products = useSelector((state) => state.productReducer.products);

  const product = products.find(
    (product) => product.name === match.params.name
  );

  const categoryProducts = products.filter(
    (x) => x.category === product.category
  );

  const [shuffled, setShuffeled] = useState([]);

  useEffect(() => {
    setShuffeled(categoryProducts.sort(() => 0.5 - Math.random()).slice(0, 3));
  }, []);

  console.log(categoryProducts);
  const [quantity, setquantity] = useState(1);
  const dispatch = useDispatch();
  return (
    <>
      <NavBar />
      <Container className='p-5'>
        <Link
          onClick={() => history.push(history.goBack())}
          className='btn btn-light'
        >
          back
        </Link>
        <Row>
          <Col md='8'>
            <h1>{product.description}</h1>
            {/* <div
              style={{
                width: "300px",
                height: "300px",
                backgroundColor: "black",
              }}
            ></div> */}
            <img
              style={{ width: "270px", height: "150px" }}
              src={product.image}
            />
          </Col>
          <Col md='4'>
            <h1>{product.name}</h1>
            <h1>$ {product.price * quantity}</h1>
            <Form.Control
              as='select'
              onChange={(e) => {
                setquantity(e.target.value);
              }}
              value={quantity}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Control>

            <Button
              onClick={() => {
                dispatch(AddItemToCart(quantity, product));
              }}
              className='btn btn-dark'
            >
              add to cart
            </Button>
          </Col>
        </Row>

        <Row className='m-3'>
          <h1>we think this might intrest you </h1>
        </Row>
        <Row className='m-3'>
          {shuffled.map((product) => (
            <ProductSmall product={product} />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default React.memo(ProductScreen);
