import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { Context } from '../context/Context';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const { registerUser } = useContext(Context);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      username: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await registerUser(values, navigate);
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
        <p className="fs-2">Register Page</p>
        <FormGroup style={{ width: '18rem' }}>
          <Label for="username">Enter Your Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-danger">{formik.errors.username}</div>
          )}
        </FormGroup>
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

        <Button color="secondary" style={{ width: '18rem' }}>
          Register
        </Button>

        <p className="mt-4">
          Do have an account?
          <Link to="/auth/login">
            <span className="text-primary m-1 text-decoration-underline">
              Log in
            </span>
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
