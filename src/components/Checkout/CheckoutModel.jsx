import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Fragment, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const stripePromise = loadStripe(
  "pk_test_51MZrheSDSUOhX3MpsPyM1G4z4IJq5LIjpL8SYBg2FpEB9nXoQLzJh7fELcaQffdZqlbdUqMK56nnmKWen9mfhiWM00Gt1RnFeu"
);

const MakePayment = (props) => {

  
  const [loader, setLoader] = useState(false);

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
            <Row>
              <Col sm={12}>
                <FormLabel> Card Number</FormLabel>
                <div className="border rounded p-2 w-auto">
                  <CardNumberElement options={CARD_ELEMENT_OPTIONS} />{" "}
                </div>
              </Col>

              <Col sm={6}>
                <FormGroup className="mb-3" controlId="formBasiProfile">
                  <FormLabel> Expiry</FormLabel>
                  <div className="border rounded p-2 w-auto">
                    <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />{" "}
                  </div>
                </FormGroup>
              </Col>

              <Col sm={6}>
                <FormGroup className="mb-3" controlId="formBasiProfile">
                  <FormLabel> CVV</FormLabel>
                  <div className="border rounded p-2 w-auto">
                    <CardCvcElement options={CARD_ELEMENT_OPTIONS} />{" "}
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className="text-center mt-3">
              <Button variant="primary" type="submit" disabled={loader}>
                {!loader ? (
                  `Buy $ ${props.prices}`
                ) : (
                  <Fragment>
                    <Spinner
                      size="sm"
                      className="me-3"
                      animation="border"
                      variant="light"
                    />
                    {`Buy $ ${props.prices}`}
                  </Fragment>
                )}
              </Button>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

const CheckoutModel = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <MakePayment
        show={props.show}
        onHide={props.onHide}
        cars={props.cars}
        prices={props.prices}
        subcription={props.subcription}
      />
    </Elements>
  );
};

export default CheckoutModel;
