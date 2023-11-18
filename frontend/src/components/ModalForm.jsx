import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const ModalForm = ({ modal, toggle, addTodo }) => {
  const formik = useFormik({
    initialValues: {
      description: '',
      category: '',
      completed: false,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Required'),
      category: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await addTodo(values);
      resetForm();
      toggle();
    },
  });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   });
  // };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Todo</ModalHeader>
      <ModalBody>
        <Form className="my-3" onSubmit={formik.handleSubmit}>
          <FormGroup style={{ width: '18rem' }}>
            <Label for="category">Enter Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.category && formik.errors.category && (
              <div className="text-danger">{formik.errors.category}</div>
            )}
          </FormGroup>

          <FormGroup style={{ width: '18rem' }}>
            <Label for="description">Enter Task</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-danger">{formik.errors.description}</div>
            )}
          </FormGroup>

          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                value={formik.values.completed}
                onChange={formik.handleChange}
              />
              Completed
            </Label>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button className="me-4" color="primary" type="submit">
              Add
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalForm;
