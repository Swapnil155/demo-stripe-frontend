import { Fragment } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditCard = (props) => {
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
        <Modal.Body>
          <Form className="row">
            <Form.Group
              className="mb-3 col-12"
              controlId="Register.ControlInput3"
            >
              <Form.Label>Owner name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter owner name"
                defaultValue={props.user && props.user.ownerName}
              />
              <Form.Text className="text-danger"></Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3 col-6"
              controlId="Register.ControlInput3"
            >
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                defaultValue={props.user && props.user.age}
              />
              <Form.Text className="text-danger"></Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3 col-6"
              controlId="Register.ControlInput3"
            >
              <Form.Label>Gender</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                defaultValue={`${props.user && props.user.gender}`}
              >
                <option>Choose...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Select>
              <Form.Text className="text-danger"></Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default EditCard;
