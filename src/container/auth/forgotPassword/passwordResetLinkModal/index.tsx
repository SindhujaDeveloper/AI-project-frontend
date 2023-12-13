import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, FormLabel, ModalBody, Modal, ModalFooter, ModalHeader, ModalTitle, FormGroup, Row, FormControl, Col } from "react-bootstrap";
import { IModalProps, IStore } from "../../../../types";
import { regexExpressions } from "../../../../utils/constants/auth";
import { forgetPasswordRequest } from "../../../../redux/reducers";

export const PasswordResetLinkModal = ({ show, handleClose }: IModalProps) => {
  const dispatch = useDispatch();

  const isMailSent = useSelector((state: IStore) => state.auth.isMailSent);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  return (
    <Modal show={show} onHide={() => { handleClose(); setEmail(""); }}>
      <ModalHeader closeButton>
        <ModalTitle>Send Email To Reset Password</ModalTitle>
      </ModalHeader>

      <ModalBody>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="Enter Your Email Address"
              name="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value.toLowerCase());
                setIsValidEmail(regexExpressions.email.test(e.target.value.toLowerCase()));
              }}
              value={email.toLowerCase()}
              isInvalid={!isValidEmail}
            />
            <FormControl.Feedback type="invalid">
              Please enter a valid email address.
            </FormControl.Feedback>
          </Col>
        </FormGroup>
        <FormLabel>
          {isMailSent
            ? "Go to your mail and click reset password button you will navigate to a reset password page"
            : "To reset your password, please click the Send Link button. A link will be sent to your registered email address."
          }
        </FormLabel>
      </ModalBody>

      <ModalFooter>
        <Button
          variant="primary"
          onClick={() => {
            if (isValidEmail) dispatch(forgetPasswordRequest({ email }));
          }}
          disabled={!isValidEmail || email === ""}
        >
          Send Link
        </Button>
      </ModalFooter>
    </Modal>
  );
};