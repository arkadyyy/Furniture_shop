import React, { useEffect, useState } from "react";
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
import Footer from "../../components/Footer";
import Pic from "../../images/clock.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ProductsRequest } from "../../actions/ProductAction";
import Axios from "axios";

const HomeScreen = () => {
  const disptach = useDispatch();

  let username = useSelector((state) => state.LoginReducer.userData.username);
  let cartItems = useSelector((state) => state.cartReducer.cartItems);

  let products = useSelector((state) => state.productReducer.products);
  const [newItems, setnewItems] = useState([]);

  // let twoDaysAgo = new Date();
  // twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  // console.log(twoDaysAgo.getDate());
  // console.log(new Date().getDate());
  // const newProducts = products.filter((product) => {
  //   return product.createdAt.getDate() <= twoDaysAgo.getDate();
  // });
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

  console.log(newItems);
  const sendCartToServer = (username, cartItems) => {
    if (username) {
      Axios.post("/api/setcart", { username, cartItems }).then((res) => {
        console.log(res);
      });
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <NavBar />
      <div className='heroSection'>
        <div className='heroSectionText'>
          <h1>Best furniture,</h1>
          <h1>Best prices</h1>
        </div>
        <div className='heroSectionBackground'></div>
      </div>

      <Container fluid>
        <div className='newIn'>
          <Row
            className='justify-content-md-center'
            style={{ margin: "3rem 0" }}
          >
            <Col>
              <div
                style={{
                  display: "flex",
                  textAlign: "bottom",
                  padding: "5rem",
                  alignItems: "left",
                }}
              >
                <h1>New In</h1>
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
            </Col>
          </Row>
          <Row style={{ overflow: "auto" }}>
            {products
              .map((product) => {
                let x = new Date(product.createdAt).getDate();
                if (x <= new Date().getTime()) {
                  console.log("created at : ", x);
                  console.log("today date : ", new Date().getDate());

                  return (
                    <Col className='mx-auto my-2' sm={12} md={6} lg={3}>
                      <ProductSmall product={product} />;
                    </Col>
                  );
                } else {
                  console.log("created at else : ", x);
                  console.log("today date else : ", new Date().getDate());
                }
              })
              .slice(0, 3)}
          </Row>
        </div>

        <div className='insparation'>
          <div
            style={{
              display: "flex",
              textAlign: "bottom",
              padding: "5rem",
              overflow: "auto",
            }}
          >
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
            <Container className='px-3'>
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
      </Container>
      <Footer />
    </div>
  );
};

export default HomeScreen;
