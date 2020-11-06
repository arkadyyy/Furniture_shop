import React, { useEffect } from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import { message } from "antd";
import socketIOClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
import { UserSettings } from "../screens/UserSettings.js/UserSettings";
import { SetExistingCart } from "../actions/CartActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ history }) => {
  const test222 = () => {
    Axios.get("/api/test").then((res) => {
      console.log(res.data);
    });
  };
  useEffect(() => {
    test222();
  }, []);
  const [show, setShow] = useState(false);
  //user settings state
  const [modalShow, setModalShow] = useState(false);

  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  let isAdmin = useSelector((state) => state.LoginReducer.isAdmin);
  let userLogged = useSelector((state) => state.LoginReducer.userLogged);
  let username = useSelector((state) => state.LoginReducer.userData.username);
  let cartItems = useSelector((state) => state.cartReducer.cartItems);
  const logIn = (e) => {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    console.log("login click is working");
    console.log(username);
    console.log(password);
    Axios.post("/api/login", {
      username: username,
      password: password,
    }).then((res) => {
      console.log(res);
      if (res.data.isAdmin && res.data.loginSucces) {
        dispatch({
          type: "LOG_IN_ADMIN",
          payload: {
            username: res.data.userData.username,
            email: res.data.userData.email,
            address: res.data.userData.address,
          },
        });

        if (res.data.cart) {
          console.log("cartitems : ", res.data.cart.cartItems);

          dispatch(SetExistingCart(res.data.cart.cartItems));
        }
      } else if (!res.data.isAdmin && res.data.loginSucces) {
        dispatch({
          type: "LOG_IN_USER",
          payload: {
            username: res.data.userData.username,
            email: res.data.userData.email,
            address: res.data.userData.address,
          },
        });
        if (res.data.cart) {
          console.log("cartitems : ", res.data.cart.cartItems);

          dispatch(SetExistingCart(res.data.cart.cartItems));
        }
      } else {
        message.error("password or username incorrect");
      }

      console.log(res);
    });
    handleClose();
  };

  const sendCartToServer = (username, cartItems) => {
    Axios.post("/api/setcart", { username, cartItems }).then((res) => {
      console.log(res);
    });
  };
  useEffect(() => {
    sendCartToServer(username, cartItems);
  }, [cartItems]);

  return (
    <>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <Link style={{ textDecoration: "none" }} to='/'>
          <Navbar.Brand className='navbarLogo'>maynooth furniture</Navbar.Brand>
        </Link>
        <Nav inline className='mr-auto'>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to='/living_room'
          >
            Living room
          </Link>

          <Link
            style={{ color: "white", textDecoration: "none" }}
            to='/kitchen'
          >
            Kitchen
          </Link>
          <Link
            style={{ color: "white", textDecoration: "none" }}
            to='/bedroom'
          >
            Bedroom
          </Link>
          <Link style={{ color: "white", textDecoration: "none" }} to='/cart'>
            Cart
          </Link>
          {isAdmin && (
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to='/managerscreen'
            >
              manage shop
            </Link>
          )}
        </Nav>

        <Form inline>
          {userLogged ||
            (isAdmin && (
              <span style={{ color: "white" }}>{`Hello ${username}`}</span>
            ))}
          {userLogged && (
            <span style={{ color: "white" }}>{`Hello ${username}`}</span>
          )}
          {userLogged && (
            <Button variant='light' onClick={() => setModalShow(true)}>
              <FontAwesomeIcon icon={faCog} />
            </Button>
          )}

          {userLogged || isAdmin ? (
            <Button
              variant='light'
              onClick={() => {
                dispatch({ type: "LOG_OUT_USER" });
                history.push("/");
                cartItems.length > 0 && sendCartToServer(username, cartItems);
              }}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          ) : (
            <Button
              variant='light'
              className='mx-3'
              variant='light'
              onClick={handleShow}
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
          )}
        </Form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              style={{ display: "block", margin: "1rem" }}
              placeholder='username'
              id='username'
            ></input>
            <input
              style={{ display: "block", margin: "1rem" }}
              placeholder='password'
              id='password'
            ></input>
            <h8 style={{ display: "block", margin: "1rem" }}>
              Dont have a user yet ?
            </h8>
            <Button onClick={() => history.push("/signin")} variant='light'>
              Sign in
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button onClick={logIn} variant='success'>
              Log in
            </Button>
          </Modal.Footer>
        </Modal>
      </Navbar>
      <UserSettings show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default withRouter(NavBar);
