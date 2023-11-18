import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Context } from '../context/Context';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { loginUser } = useContext(Context);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await loginUser(values, navigate);
      resetForm();
    },
  });

  return (
    <div className="d-flex col-12">
      <img
        src="https://images.pexels.com/photos/14186492/pexels-photo-14186492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="login_page_image"
        className="col-8 d-none d-md-block"
        style={{ height: '100vh' }}
      />

      <Form
        className="col-12 col-md-4 d-flex justify-content-center flex-column align-items-center"
        style={{ height: '100vh' }}
        onSubmit={formik.handleSubmit}
      >
        <p className="fs-2">Login Page</p>
        <FormGroup style={{ width: '18rem' }}>
          <Label for="email">Enter Your Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </FormGroup>
        <FormGroup style={{ width: '18rem' }}>
          <Label for="password">Enter Your Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </FormGroup>
        <Button color="secondary" style={{ width: '18rem' }} type="submit">
          Log in
        </Button>

        <p className="mt-4">
          Don't have an account?
          <Link to="/auth/register">
            <span className="text-primary m-1 text-decoration-underline">
              Sign up for free
            </span>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
