import React from "react";
import { Row, Col, ListGroup, Container, Button, Form } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container
        fluid
        // style={{
        //   backgroundColor: "black",
        //   color: "white",
        //   height: "45vh",
        //   padding: "2rem",
        //   whiteSpace: "nowrap",
        //   overflow: "hidden",
        //   textOverflow: "ellipsis",
        // }}
        classname='d-flex p-2'
        style={{ padding: "2rem", backgroundColor: "black", color: "white" }}
      >
        <Row>
          <Col className='py-3' xl={5} lg={4} md={6} sm={12}>
            <h1 className='navbarLogo'>maynooth furniture</h1>
            <h6>Best furniture, Best prices </h6>
            <div style={{ margin: "1rem 0" }}>
              <h4>
                <strong>About us</strong>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </p>
            </div>
          </Col>
          <Col className='py-3' xl={3} lg={3} md={10} sm={12}>
            <h2>Information</h2>
            <ListGroup>
              {/* <ListGroup.Item variant='light'>
                Cras justo odio</ListGroup.Item>
              <ListGroup.Item variant='light'>
                Dapibus ac facilisis in
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                Morbi leo risus</ListGroup.Item>
              <ListGroup.Item variant='light'>
                Porta ac consectetur ac
              </ListGroup.Item>
              <ListGroup.Item variant='light'>
                Vestibulum at eros
              </ListGroup.Item> */}
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
            </ListGroup>
          </Col>
          <Col className='py-3' xl={3} lg={3} md={10} sm={12}>
            <h2>Helpful links</h2>
            <ListGroup>
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
              <a>Morbi leo risus</a>
            </ListGroup>
            ,
          </Col>
          <Col className='py-3' xl={3} lg={2} md={10} sm={12}>
            <h2>Subscribe for more info !</h2>

            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='light'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Button
              style={{ width: "100%", display: "block" }}
              variant='danger'
            >
              Subscribe
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
