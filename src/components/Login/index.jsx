import { Fragment } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getlogin } from "../../Features/User";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => ({ ...state.users }));

  const onSubmit = (values) => {
    dispatch(getlogin({values}));
    alert(JSON.stringify(values));
  };

  return (
    <Fragment>
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="shadow border-0 p-5" style={{ width: "35rem" }}>
          <h2>Login</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="Register.ControlInput3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your mail address"
                {...register("email")}
              />
              <Form.Text className="text-danger">
                {errors.email?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                {...register("password")}
              />
              <Form.Text className="text-danger">
                {errors.password?.message}
              </Form.Text>
            </Form.Group>

            <Button type="submit" disabled={loading}>
              Loging
            </Button>
          </Form>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Login;
