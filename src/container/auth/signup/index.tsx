import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  Tabs,
  Tab,
  FormCheck,
  FormText,
  Container,
} from "react-bootstrap";
import { signUpValidationSchema } from "../../../utils/helpers/validation";
import { signUpRequest } from "../../../redux/reducers";
import { IStore } from "../../../types";
import { userRoles } from "../../../utils/constants/auth";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state: IStore) => state.auth.currentUser);

  const [tabName, setTabName] = useState(userRoles.INDIVIDUAL);

  const isOrganisation = tabName === userRoles.CORPORATE;
  const initialValues = {
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAgreeTerms: false,
    isAgreeConsent: false,
    ...(isOrganisation && { companyUrl: "", companyName: "" })
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, handleReset, isSubmitting } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      const { isAgreeTerms, isAgreeConsent, ...newApiPayload } = values;
      dispatch(
        signUpRequest({
          ...newApiPayload,
          isOrganisation,
          isTermsAccepted: values.isAgreeTerms && values.isAgreeConsent
        })
      );
      setSubmitting(false);
    }
  });

  useEffect(() => {
    if (currentUser?.token !== "") {
      handleReset(initialValues);
    }
  }, [currentUser?.token]); //eslint-disable-line

  return (
    <Container className="w-50">
      <h3 className="text-center">Sign Up </h3>
      <Tabs
        defaultActiveKey={userRoles.INDIVIDUAL}
        id="justify-tab-example"
        className="mb-3"
        variant="pills"
        justify
        onSelect={(k) => {
          if (k !== null) setTabName(k);
        }}
        activeKey={tabName}
      >
        <Tab title={"Individual"} eventKey={userRoles.INDIVIDUAL} />
        <Tab title={"Corporate"} eventKey={userRoles.CORPORATE} />
      </Tabs>

      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="Name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              isInvalid={!!(errors.name !== undefined && touched.name !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.name !== undefined && touched.name !== undefined ? errors.name : null}
            </FormControl.Feedback>

          </Col>
          <Col>
            <FormControl
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email.toLowerCase()}
              isInvalid={!!(errors.email !== undefined && touched.email !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.email !== undefined && touched.email !== undefined ? errors.email : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="User Name"
              name="userName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
              isInvalid={!!(errors.userName !== undefined && touched.userName !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.userName !== undefined && touched.userName !== undefined ? errors.userName : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        {isOrganisation && (
          <FormGroup as={Row} className="mb-3">
            <Col>
              <FormControl
                placeholder="Company Name"
                name="companyName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyName}
                isInvalid={!!(errors.companyName !== undefined && touched.companyName !== undefined)}
              />
              <FormControl.Feedback type="invalid">
                {errors.companyName !== undefined && touched.companyName !== undefined ? errors.companyName : null}
              </FormControl.Feedback>
            </Col>
            <Col>
              <FormControl
                placeholder="Company URL"
                name="companyUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.companyUrl}
                isInvalid={!!(errors.companyUrl !== undefined && touched.companyUrl !== undefined)}
              />
              <FormControl.Feedback type="invalid">
                {errors.companyUrl !== undefined && touched.companyUrl !== undefined ? errors.companyUrl : null}
              </FormControl.Feedback>
            </Col>
          </FormGroup>
        )}

        <FormGroup
          as={Row}
          className="mb-3"
        >
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

        <FormCheck
          className="pt-2"
          label="Terms and Conditions"
          type="checkbox"
          name="isAgreeTerms"
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values.isAgreeTerms}
          isInvalid={!!(!values.isAgreeTerms && touched.isAgreeTerms !== undefined)}
          feedbackType="invalid"
          feedback={"You should select the terms and conditions checkbox"}
        />
        <FormCheck
          className="pt-2"
          label="Consent"
          type="checkbox"
          name="isAgreeConsent"
          onChange={handleChange}
          onBlur={handleBlur}
          checked={values.isAgreeConsent}
          isInvalid={!!(!values.isAgreeConsent && touched.isAgreeConsent !== undefined)}
          feedbackType="invalid"
          feedback={"You should select the consent checkbox"}
        />
        <FormGroup as={Row} className="mb-3 pt-2">
          <Col>
            <Button
              type="submit"
              className="w-100"
              disabled={
                isSubmitting ||
                (Object.values(values).filter((it) => it === "" || it === false).length !== 0) ||
                Object.values(errors).filter((it) => it !== "").length !== 0
              }
            >
              Register
            </Button>
          </Col>
        </FormGroup>
        <div className="text-center">
          <FormText>{"Already have an account?"}<FormText className="text-decoration-underline" onClick={() => { navigate("/login"); }}>Log-in</FormText></FormText>
        </div>
      </Form>
    </Container>
  );
};

export default SignUp;
