import { Fragment } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const Register = () => {
  return (
    <Fragment>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="shadow border-0 p-5" style={{ width: "35rem" }}>
          <h2> Register</h2>

          <Form>
            <Form.Group className="mb-3" controlId="Register.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your full name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput2">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="tel" pattern="/(7|8|9)\d{9}/" placeholder="Enter your mobile number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your mail address"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput5">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Confirm Password"
              />
            </Form.Group>

            <Button type="submit">Register</Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Register;
