import { Fragment, useState } from "react";
import { Button, Card, Container, InputGroup } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../../Features/User";
import CheckoutModel from "./CheckoutModel";

const Checkout = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.users.value);
  const prices = useSelector((state) => state.users.prices);
  const [modelShow, setModelShow] = useState(false);
  const [subcription, setSubcription] = useState('')
  return (
    <Fragment>
      <CheckoutModel
        show={modelShow}
        onHide={() => setModelShow(false)}
        cars={counter}
        prices={subcription === 'monthly'? prices : prices*10 }
        subcription={subcription}
      />

      <Container className="mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <div style={{ fontWeight: "800", fontSize: "3rem" }}>Buy premium</div>
        </div>

        <div className="d-flex justify-content-center mt-5">
          <Card className="shadow border-0 p-3 ">
            <CardHeader className="mb-3">
              <div style={{ fontWeight: "800", fontSize: "1rem" }}>
                How many cars do you have
              </div>
            </CardHeader>
            <InputGroup className="mb-3 d-flex justify-content-center">
              <Button
                variant="outline-secondary"
                id="button-addon1"
                onClick={() => {
                  dispatch(increment());
                }}
              >
                +
              </Button>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ width: "3rem" }}
              >
                {counter}
              </div>

              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={() => {
                  dispatch(decrement());
                }}
              >
                -
              </Button>
            </InputGroup>

            <div className="mb-3">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ fontWeight: "800", fontSize: "1.5rem" }}
              >
                ${prices}
              </div>
              <div className="d-flex align-items-center justify-content-center text-muted">
                per month
              </div>
            </div>

            <Card.Footer className="pt-3">
              <InputGroup className="d-flex align-items-center justify-content-center">
                <Button
                  variant="outline-primary"
                  onClick={() => (setModelShow(true), setSubcription('monthly'))}
                  id="button-addon3"
                  disabled={counter !== 0 ? false : true}
                >
                  Monthly
                </Button>
                <Button
                  variant="outline-success"
                  id="button-addon4"
                  onClick={() => (setModelShow(true), setSubcription('yearly'))}
                  disabled={counter !== 0 ? false : true}
                >
                  Annual
                </Button>
              </InputGroup>
            </Card.Footer>
          </Card>
        </div>
      </Container>
    </Fragment>
  );
};

export default Checkout;
