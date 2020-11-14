import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ProductsRequest } from "../../actions/ProductAction";
import { PurchaseCart } from "../../actions/CartActions";
import Axios from "axios";
const CartSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const userData = useSelector((state) => state.LoginReducer.userData);

  const updateProducts = () => {
    Axios.put("api/purchase", { cartItems, username: userData.username }).then(
      (res) => {
        console.log(res);
      }
    );
  };
  const wrapperFunction = () => {
    updateProducts();
    dispatch(ProductsRequest());

    dispatch(PurchaseCart());
  };

  const [purchased, setpurchased] = useState(false);

  const showSpinner = () => {
    setpurchased(true);
    setTimeout(() => {
      setpurchased(false);
    }, 2000);
  };
  return (
    <div style={{ overflow: "hidden" }}>
      <NavBar />
      <Container style={{ marginTop: "6rem" }}>
        <Row>
          <Col sm={8}>
            <h1>Cart summary</h1>
            {cartItems.length > 0 ? (
              <ListGroup className='mx-3' variant='flush'>
                {cartItems.map((cartItem) => (
                  <ListGroup.Item>
                    <Row>
                      <Col xs={6} md={4}>
                        <Image src={cartItem.product.image} thumbnail rounded />
                      </Col>
                      <Col>
                        <Row>name : {cartItem.product.name}</Row>
                        <Row>price : {cartItem.product.price}</Row>
                        <Row>quantity : {cartItem.quantity}</Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : purchased ? (
              <Spinner animation='border' role='status'>
                <span className='sr-only'>Loading...</span>
              </Spinner>
            ) : (
              <h6>your cart is empty</h6>
            )}
          </Col>
          <Col sm={4}>
            <Form>
              <h1>Delivery properties</h1>

              <h3>{userData.username}</h3>
              <h3>{userData.address}</h3>
              <h3>{userData.email}</h3>
              <h3></h3>
              <footer>
                <Button
                  onClick={() => {
                    return wrapperFunction(), showSpinner();
                  }}
                  variant='danger'
                >
                  Purchese
                </Button>
              </footer>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartSummary;
