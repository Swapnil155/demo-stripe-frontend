import { Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Stack,
  Table,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AddCars, createMember } from "../../Features/addCars";

const addSchema = yup
  .object({
    ownername: yup.string().required(),
    DOB: yup.string().required(),
    gender: yup.string().required(),
    VRN: yup.string().required(),
  })
  .required();

const AddCar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addSchema),
  });

  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.list);
  const counte = useSelector((state) => state.cars.count);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    // dispatch(AddCars(data));
    dispatch(createMember(data));
    reset();
  };
  return (
    <Fragment>
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
              </Form.Group>
            </Col>

            <Col md>
              <Form.Group className="mb-3" controlId="Register.ControlInput1">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" {...register("DOB")} required />
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
                  <option>Choose...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
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
              </Form.Group>
            </Col>

            <Col className="pt-1" sm="1">
              <Button className="mt-4" type="submit">
                {" "}
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
                <th>Owner Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>VRN</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {counte > 0 &&
                cars.map((car, index) => (
                  <tr key={car.id}>
                    <td>{(index += 1)}</td>
                    <td>{car.car.ownername}</td>
                    <td>{car.car.DOB}</td>
                    <td>{car.car.gender}</td>
                    <td>LD67LYO</td>
                    <td>
                      <Stack direction="horizontal" gap={2}>
                        <Button variant="secondary">Edit</Button>

                        <Button variant="danger">Delete</Button>
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
