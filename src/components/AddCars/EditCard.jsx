import { Fragment, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { differenceInYears } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { editMember } from "../../redux/Features/addCars";

const editOwnerSchema = yup
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
  })
  .required();

const EditCard = (props) => {
  const [show, setShow] = useState(false);
  const [toastBg, setToastBg] = useState("");
  const [serverError, setServerError] = useState("");
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", resolver: yupResolver(editOwnerSchema) });

  const onSubmit = (values) => {
    const { ownername, DOB, gender } = values;
    const data = {
      _id: props.user && props.user._id,
      ownername,
      DOB,
      gender,
    };
    // console.log(data);
    dispatch(editMember(data));
    // alert(JSON.stringify(data));
    props.onHide();
  };
  return (
    <Fragment>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.user && props.user.registration}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body className="row">
            <Form.Group
              className="mb-3 col-12"
              controlId="editOwner.ControlInput1"
            >
              <Form.Label>Owner name</Form.Label>
              <Form.Control
                type="text"
                {...register("ownername")}
                placeholder="Enter owner name"
                defaultValue={props.user && props.user.ownerName}
              />
              <Form.Text className="text-danger">
                {errors.ownername?.message}
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3 col-6"
              controlId="editOwner.ControlInput2"
            >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                {...register("DOB")}
                defaultValue={props.user && props.user.age}
              />
              <Form.Text className="text-danger">
                {errors.DOB?.message}
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3 col-6"
              controlId="Register.ControlInput1"
            >
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
          </Modal.Body>
          <Modal.Footer className="d-flex flex-column align-items-center">
            <Button type="submit">Update</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EditCard;
