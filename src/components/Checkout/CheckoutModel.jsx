import { Fragment } from "react";
import { Form, Modal } from "react-bootstrap";

const CheckoutModel = (props) => {
  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="p-3"
      >
        <Modal.Header
          closeButton
          className="d-flex justify-content-between"
          id="contained-modal-title-vcenter"
        >
          <div className="text-muted">
            <span style={{ fontSize: "2.5rem", fontWeight: "800" }}>
              ${props.prices}
            </span>
            {/* props.subcription.charAt(0).toUpperCase() + props.subcription.slice(1) for first letter captiplaization */}
            <span>/per {props.subcription}</span>
            <div style={{ fontSize: "1rem", fontWeight: "800" }}>
              Total {props.cars} car's
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
            <Form>
                
            </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};
export default CheckoutModel;
