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
import { getRegister, resetError, resetSuccess } from "../../Features/User";
import { Link, useNavigate } from "react-router-dom";
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fullname is required")
    .min(4, "Full name lenght should be at least 4 characters"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .min(10, "Must be more than 10 characters")
    .matches(/^(7|8|9)\d{9}/, "Formate not matched"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters"),
  Cpassword: Yup.string()
    .required("Confirm Password is required")
    .min(4, "Password length should be at least 4 characters")
    .max(12, "Password cannot exceed more than 12 characters")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
const Register = () => {
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
        navigate("/");
      }, 4000);
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
  } = useForm({ mode: "onTouched", resolver: yupResolver(registerSchema) });

  const onSubmit = (values) => {
    dispatch(getRegister(values));
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
          <h2> Register</h2>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="Register.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
              />
              <Form.Text className="text-danger">
                {errors.name?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Register.ControlInput2">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your mobile number"
                {...register("mobileNumber")}
              />
              <Form.Text className="text-danger">
                {errors.mobileNumber?.message}
              </Form.Text>
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="Register.ControlInput5">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Confirm Password"
                {...register("Cpassword")}
              />
              <Form.Text className="text-danger">
                {errors.Cpassword?.message}
              </Form.Text>
            </Form.Group>

            <Button
              type="submit"
              className="btn-primary"
              style={{ letterSpacing: "2px", fontWeight: "600" }}
              disabled={loading}
            >
              {!loading ? (
                `Register`
              ) : (
                <Fragment>
                  <Spinner
                    size="sm"
                    className="me-3"
                    animation="border"
                    variant="light"
                  />
                  {`Register`}
                </Fragment>
              )}
            </Button>
          </Form>
        </Card>
        <div
          className="mt-3 text-muted text-center"
          style={{ fontWeight: "500" }}
        >
          Do you already have an account? <Link to={"/login"}>Sign In</Link>
        </div>
      </Container>
    </Fragment>
  );
};

export default Register;
