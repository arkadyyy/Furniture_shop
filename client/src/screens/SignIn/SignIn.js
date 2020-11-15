import React from "react";
import NavBar from "../../components/Navbar";
import {
  Container,
  Col,
  Row,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import axios from "axios";
const SignIn = () => {
  const SignInFn = (z) => {
    axios.post("/api/signin", z).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <h1 style={{ padding: "5rem 0" }}>Sign in</h1>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <FormControl
                  width='50%'
                  type='text'
                  className='mr-sm-2 '
                  id='username'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <FormControl
                  width='50%'
                  type='text'
                  className='mr-sm-2 '
                  id='address'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <FormControl
                  width='50%'
                  type='text'
                  className='mr-sm-2 '
                  id='email'
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <FormControl
                  width='50%'
                  type='text'
                  className='mr-sm-2 '
                  id='password'
                />
              </Form.Group>

              <Button
                onClick={() => {
                  console.log(
                    document.querySelector("#username").value,
                    document.querySelector("#address").value,
                    document.querySelector("#email").value,
                    document.querySelector("#password").value
                  );
                  SignInFn({
                    username: document.querySelector("#username").value,
                    address: document.querySelector("#address").value,
                    email: document.querySelector("#email").value,
                    password: document.querySelector("#password").value,
                  });
                }}
                variant='danger'
              >
                Sign in
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
