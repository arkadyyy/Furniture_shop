import React from "react";
import NavBar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  ListGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
const CartSummary = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const userData = useSelector((state) => state.LoginReducer.userData);
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7%" }}>
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
                <Button variant='danger'>Purchese</Button>
              </footer>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartSummary;
