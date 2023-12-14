import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Row,
  FormText,
  Container,
} from "react-bootstrap";
import { signUpValidationSchema } from "../../../utils/helpers/validation";
import { signUpRequest } from "../../../redux/reducers";


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    city: "",
    gender: "",
    birthdate: "",
    mobileno: ""
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: signUpValidationSchema,
    validateOnChange: true,
    onSubmit: (values, { setSubmitting }) => {
      console.log("values", values)
      dispatch(signUpRequest({...values}));
      setSubmitting(false);
    }
  });

  return (
    <Container className="w-50">
      <h3 className="text-center">Sign Up </h3>
      {/* <Tabs
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
      </Tabs> */}

      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="First Name"
              name="firstname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
              isInvalid={!!(errors.firstname !== undefined && touched.firstname !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.firstname !== undefined && touched.firstname !== undefined ? errors.firstname : null}
            </FormControl.Feedback>

          </Col>
          <Col>
            <FormControl
              placeholder="Last Name"
              name="lastname"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
              isInvalid={!!(errors.lastname !== undefined && touched.lastname !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.lastname !== undefined && touched.lastname !== undefined ? errors.lastname : null}
            </FormControl.Feedback>

          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="Mobile no"
              name="mobileno"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.mobileno.toLowerCase()}
              isInvalid={!!(errors.mobileno !== undefined && touched.mobileno !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.mobileno !== undefined && touched.mobileno !== undefined ? errors.mobileno : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
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
          <Col>
            <FormControl
              placeholder="User Name"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              isInvalid={!!(errors.username !== undefined && touched.username !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.username !== undefined && touched.username !== undefined ? errors.username : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <Col>
            <FormControl
              placeholder="Gender"
              name="gender"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              isInvalid={!!(errors.gender !== undefined && touched.gender !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.gender !== undefined && touched.gender !== undefined ? errors.gender : null}
            </FormControl.Feedback>
          </Col>
          <Col>
            <FormControl
              placeholder="Birth Date"
              name="birthdate"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.birthdate}
              isInvalid={!!(errors.birthdate !== undefined && touched.birthdate !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.birthdate !== undefined && touched.birthdate !== undefined ? errors.birthdate : null}
            </FormControl.Feedback>
          </Col>
        </FormGroup>

        <FormGroup
          as={Row}
          className="mb-3"
        >
          <Col>
            <FormControl
              placeholder="City"
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              isInvalid={!!(errors.city !== undefined && touched.city !== undefined)}
            />
            <FormControl.Feedback type="invalid">
              {errors.city !== undefined && touched.city !== undefined ? errors.city : null}
            </FormControl.Feedback>
          </Col>
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

        {/* <FormCheck
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
        /> */}
        <FormGroup as={Row} className="mb-3 pt-2">
          <Col>
            <Button
              type="submit"
              className="w-100"
              disabled={
                isSubmitting}
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
