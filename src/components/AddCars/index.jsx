import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Spinner,
  Stack,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { differenceInYears } from "date-fns";
import { createMember, removeMember } from "../../redux/Features/addCars";
import { useNavigate } from "react-router-dom";
import TokenService from "../../services/tokenService";
import EditCard from "./EditCard";

const AddCar = () => {
  const { list, count, serverSuccess, serverFailed, loader, VRNList } =
    useSelector((state) => state.cars);
  const { value, isAuthenticated } = useSelector((state) => state.users);
  // console.log([...list].reverse());
  const [show, setShow] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addSchema = yup
    .object()
    .shape({
      ownername: yup
        .string()
        .required("Thise feild is required")
        .min(4, "Ownername lenght should be at least 4 characters"),
      DOB: yup
        .string()
        .required("Thise feild is required")
        .test("dob", "Should be greater than 18", function (value) {
          return differenceInYears(new Date(), new Date(value)) >= 18;
        }),
      gender: yup.string().required("Thise feild is required"),
      VRN: yup
        .string()
        .required("Thise feild is required")
        .test("VRN-check", "These vehicle already added", function (value) {
          return !VRNList.includes(value);
        }),
    })
    .required();

  const user = TokenService.getUser();
  // console.log(!user.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (list && serverSuccess) {
      setShow(true);
      setToastBg(`bg-success`);
      setServerError(serverSuccess);
    }
    if (serverFailed != null) {
      console.log(serverFailed);
      setShow(true);
      setToastBg(`bg-danger`);
      setServerError(serverFailed.message);
    }
  }, [
    navigate,
    dispatch,
    serverFailed,
    serverSuccess,
    list,
    user,
    isAuthenticated,
  ]);

  const [modalShow, setModalShow] = useState(false);
  const [userData, setUserData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    // dispatch(AddCars(data));
    dispatch(createMember(data));
    reset();
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

      <EditCard
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={userData}
      />

      <Container className="mt-5">
        <Card className="shadow border-0 p-4 mb-5">
          <Form className="row g-2" onSubmit={handleSubmit(onSubmit)}>
            <Col md>
              <Form.Group className="mb-3" controlId="Register.ControlInput1">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter owner name"
                  {...register("ownername")}
                  required
                />
                <Form.Text className="text-danger">
                  {errors.ownername?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-3" controlId="Register.ControlInput1">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" {...register("DOB")} required />
                <Form.Text className="text-danger">
                  {errors.DOB?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-3" controlId="Register.ControlInput1">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  {...register("gender")}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.gender?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-3" controlId="Register.ControlInput1">
                <Form.Label>Vehicle Register Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Number"
                  {...register("VRN")}
                  required
                />
                <Form.Text className="text-danger">
                  {errors.VRN?.message}
                </Form.Text>
              </Form.Group>
            </Col>

            <Col className="pt-1" sm="1">
              <Button className="mt-4" type="submit" disabled={loader}>
                {loader ? (
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  ""
                )}
                Add Cars
              </Button>
            </Col>
          </Form>
        </Card>

        <div className="mt-3">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>VRN</th>
                <th>Owner</th>
                <th>mot Status</th>
                <th>mot Expiry Date</th>
                <th>subscription</th>
                <th>Action</th>
              </tr>
            </thead>
            {}
            <tbody>
              {count > 0 &&
                [...list].reverse().map((car, index) => (
                  <tr key={index}>
                    <td>{(index += 1)}</td>
                    <td>{car && car.registrationNumber}</td>
                    <td>{car && car.member_Details.ownerName}</td>
                    <td>
                      <span
                        className={
                          car && car.motStatus === "Valid"
                            ? "badge rounded-pill text-bg-success"
                            : "badge rounded-pill text-bg-danger"
                        }
                      >
                        {car.motStatus}
                      </span>
                    </td>
                    <td>{car && car.motExpiryDate}</td>

                    <td>
                      {value !== null && value < index ? (
                        <span className="badge rounded-pill text-bg-secondary">
                          select
                        </span>
                      ) : (
                        <span className="badge rounded-pill text-bg-success">
                          active
                        </span>
                      )}
                    </td>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        <Button
                          variant="secondary"
                          onClick={() => (
                            setModalShow(true), setUserData(car.member_Details)
                          )}
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() =>
                            dispatch(removeMember(car.registrationNumber))
                          }
                          variant="danger"
                        >
                          Delete
                        </Button>
                      </Stack>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </Fragment>
  );
};

export default AddCar;
