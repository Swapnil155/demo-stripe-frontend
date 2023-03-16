import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getlogin,
  resetError,
  resetSuccess,
  userAuthenticate,
} from "../../Features/User";
import { Link, useNavigate } from "react-router-dom";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("password is required"),
});
const Login = () => {
  const { loading, userData, serverFailed, serverSuccess } = useSelector(
    (state) => state.users
  );
  const [show, setShow] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && serverSuccess) {
      setShow(true);
      setToastBg(`bg-success`);
      setServerError(serverSuccess);
      setTimeout(() => {
        dispatch(resetSuccess());
        // dispatch(userAuthenticate());
        navigate("/");
      }, 1000);
    }
    if (serverFailed != null) {
      console.log(serverFailed);
      setShow(true);
      setToastBg(`bg-danger`);
      setServerError(serverFailed.message);
      setTimeout(() => {
        dispatch(resetError());
      }, 4000);
    }
  }, [userData, navigate, dispatch, serverFailed, serverSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (values) => {
    dispatch(getlogin(values));
    // alert(JSON.stringify(values));
  };

  return (
    <Fragment>
      <ToastContainer className="pb-5" position="bottom-center">
        <Toast
          className={toastBg}
          onClose={() => setShow(false)}
          show={show}
          delay={4000}
          autohide
        >
          <div
            className="py-3 text-white text-center"
            style={{ fontSize: "1rem" }}
          >
            {serverError}
          </div>
        </Toast>
      </ToastContainer>
      <Container className="mt-5 d-flex flex-column align-items-center">
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

            <Button
              type="submit"
              className="btn-primary"
              style={{ letterSpacing: "2px", fontWeight: "600" }}
              disabled={loading}
            >
              {!loading ? (
                `Login`
              ) : (
                <Fragment>
                  <Spinner
                    size="sm"
                    className="me-3"
                    animation="border"
                    variant="light"
                  />
                  {`Login`}
                </Fragment>
              )}
            </Button>
          </Form>
        </Card>

        <div
          className="mt-3 text-muted d-flex justify-content-en"
          style={{ fontWeight: "500" }}
        >
          Do you don't have an account? <Link to={"/Register"}>Sign Up</Link>
        </div>
      </Container>
    </Fragment>
  );
};

export default Login;
