import React, { useEffect } from "react";
import "../HomeScreen/HomeScreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Nav,
  Form,
  FormControl,
  Button,
  Carousel,
  Card,
  Row,
  Col,
  Image,
  Container,
} from "react-bootstrap";
import products from "../../products";
import ProductSmall from "../../components/ProductSmall";
import NavBar from "../../components/Navbar";
import Pic from "../../images/clock.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ProductsRequest } from "../../actions/ProductAction";
import Axios from "axios";

const HomeScreen = () => {
  const disptach = useDispatch();

  let username = useSelector((state) => state.LoginReducer.userData.username);
  let cartItems = useSelector((state) => state.cartReducer.cartItems);

  useEffect(() => {
    disptach(ProductsRequest());
    // window.addEventListener("unload", async (event) => {
    //   // Cancel the event as stated by the standard.
    //   event.preventDefault();

    //   // Chrome requires returnValue to be set.
    //   event.returnValue = "";

    //   await sendCartToServer(username, cartItems);
    // });
  }, []);

  const sendCartToServer = (username, cartItems) => {
    if (username) {
      Axios.post("/api/setcart", { username, cartItems }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className='heroSection'>
        <div className='heroSectionText'>
          <h1>Best furniture,</h1>
          <h1>Best prices</h1>
        </div>
        <div className='heroSectionBackground'></div>
      </div>

      <div className='newIn'>
        <div style={{ display: "flex", textAlign: "bottom", padding: "5rem" }}>
          <h1>New In !</h1>
          <button
            style={{
              border: "none",
              margin: "0 4rem",
              background: "transparent",
            }}
          >
            see all
          </button>
        </div>
        <Row style={{ position: "relative" }} className='mx-5 my-auto'>
          {products.map((product) => (
            <Col>
              <h1>test</h1>
            </Col>
          ))}
        </Row>
      </div>

      <div className='insparation'>
        <div style={{ display: "flex", textAlign: "bottom", padding: "5rem" }}>
          <h1>Some Insparation</h1>
          <button
            style={{
              border: "none",
              margin: "0 4rem",
              background: "transparent",
            }}
          >
            see all
          </button>
        </div>

        <Row>
          <Container>
            <Col className='m-2'>
              <Image
                src='../../images/eduard-militaru-dtuM342uTmc-unsplash.jpg'
                fluid
                width='555px'
              />
            </Col>
          </Container>
          <Col>
            <h2 style={{ textAlign: "left" }}>
              <strong>outdoor insparation</strong>
            </h2>
          </Col>
        </Row>
      </div>

      <footer style={{ height: "40vh", backgroundColor: "black" }}>
        <h6>this is the footer </h6>
      </footer>
    </div>
  );
};

export default HomeScreen;
