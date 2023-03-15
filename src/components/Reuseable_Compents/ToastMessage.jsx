import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = ({ toastBg, show, serverError }) => {
  return (
    <ToastContainer className="pb-5" position="bottom-center">
      <Toast
        className={toastBg}
        // onClose={() => setShow(false)}
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
  );
};
export default ToastMessage;
