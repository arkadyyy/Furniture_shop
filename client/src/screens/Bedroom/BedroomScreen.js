import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
  Image,
  Container,
  InputGroup,
} from "react-bootstrap";
import products from "../../products";
import ProductSmall from "../../components/ProductSmall";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../LivingRoom/LivingRoom.css";
import axios from "axios";
import { productReducer } from "../../reducers/ProductReducer";

const Bedroom = () => {
  const [BedroomProducts, setBedroomProducts] = useState([]);
  const products = useSelector((state) => state.productReducer.products);
  useEffect(() => {
    setBedroomProducts(
      products.filter((product) => product.category === "bedroom")
    );
  }, []);
  return (
    <div style={{ overflow: "hidden" }}>
      <NavBar />
      <div className='heroSection'>
        <div className='heroSectionText'>
          <h1>Bedroom</h1>
          <p>
            Lorem ipsum dolor sit amet,<br></br> consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <div className='inputHeroSearch'>
            <label>search by price range</label>
            <input placeholder='from' />
            <input placeholder='to' />
            <Button style={{ margin: "1rem 0" }} variant='danger'>
              Search
            </Button>
          </div>
        </div>
        <div className='heroSectionBackground'></div>
      </div>
      <Container>
        <Row style={{ position: "relative" }} className='mx-5 my-auto'>
          {BedroomProducts.map((product) => (
            <Col>
              <Row>
                <ProductSmall product={product} />
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Bedroom;
