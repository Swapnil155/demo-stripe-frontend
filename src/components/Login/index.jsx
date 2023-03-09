import { Fragment } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

const Login = () => {
  return (
    <Fragment>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="shadow border-0 p-5" style={{ width: "35rem" }}>
          <h2>Login</h2>

          <Form>
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

            <Button type="submit">Loging</Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Login;
