import React, { useState } from "react";
import NavBar from "../../components/Navbar";
import { Button, Table, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RemoveItemFromCart } from "../../actions/CartActions";
import { Redirect } from "react-router-dom";
const Cart = ({ history }) => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const userLogged = useSelector((state) => state.LoginReducer.userLogged);
  const adminLogged = useSelector((state) => state.LoginReducer.isAdmin);
  const dispatch = useDispatch();
  const [smShow, setSmShow] = useState(false);
  return (
    <div>
      <NavBar />
      <Button
        onClick={() => history.push(history.goBack())}
        className='btn btn-light'
        style={{ margin: "4rem 1rem" }}
      >
        back
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>product</th>
            <th>quantity</th>
            <th>price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((cartItem, index) => (
            <tr>
              <td>{index + 1}</td>
              <td
                onClick={() =>
                  history.push(`productscreen/${cartItem.product.name}`)
                }
                style={{ cursor: "pointer" }}
              >
                {cartItem.product.name}
              </td>
              <td>
                {/* <Form.Control as='select' value={cartItem.quantity}>
                  {[...Array(cartItem.quantity).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control> */}
                {cartItem.quantity}
              </td>

              <td>{cartItem.product.price * cartItem.quantity}</td>
              <td>
                <Button
                  variant='light'
                  onClick={() =>
                    dispatch(RemoveItemFromCart(cartItem.product.name))
                  }
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ display: "flex", float: "right", padding: "2rem" }}>
        <h4 style={{ textAlign: "right", margin: "2rem" }}>
          total price : $
          {cartItems
            .map((cartItem) => +cartItem.product.price * cartItem.quantity)
            .reduce((acc, item) => acc + item, 0)}
        </h4>
        <Button
          className='btn-block'
          onClick={() => {
            !adminLogged && !userLogged
              ? setSmShow(true)
              : history.push("/cartsummary");
          }}
          variant='danger'
          style={{ margin: " 1rem 0", width: "180px", height: "75px" }}
        >
          continue purchese
        </Button>
      </div>
      <Modal
        size='sm'
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-sm'>
            Please log in to continue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          dont have an account yet ?<Button>create account</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
