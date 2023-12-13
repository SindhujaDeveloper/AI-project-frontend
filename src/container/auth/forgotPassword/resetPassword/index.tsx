import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, FormControl, FormGroup, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordValidationSchema } from "../../../../utils/helpers/validation";
import { resetPasswordRequest } from "../../../../redux/reducers";
import { IStore } from "../../../../types";


export const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resetPasswordMessage = useSelector((state: IStore) => state.auth.resetPasswordMessage);

  useEffect(() => {
    if (resetPasswordMessage !== "") {
      navigate("/login");
    }
  }, [resetPasswordMessage,navigate]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (_values, { setSubmitting }) => {
      const token = searchParams.get("token");
      if (token !== undefined && token !== null && token !== "") {
        dispatch(resetPasswordRequest({
          ...values,
          token
        }));
        setSubmitting(false);
      }
    }
  });

  return (
    <div>
      <h3>Reset Password</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isInvalid={!!(errors.password !== undefined && touched.password !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.password !== undefined && touched.password !== undefined ? errors.password : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              isInvalid={!!(errors.confirmPassword !== undefined && touched.confirmPassword !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.confirmPassword !== undefined && touched.confirmPassword !== undefined ? errors.confirmPassword : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            Object.values(values).filter((it) => it === "").length !== 0 ||
            Object.values(errors).filter((it) => it !== "").length !== 0
          }
        >
          Confirm
        </Button>

      </Form>
    </div >
  );
};
