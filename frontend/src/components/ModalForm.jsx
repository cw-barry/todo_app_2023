import { useState } from 'react';
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

const ModalForm = ({ modal, toggle, addTodo }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    completed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addTodo(formData);

    setFormData({
      description: '',
      category: '',
      completed: false,
    });

    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Todo</ModalHeader>
      <ModalBody>
        <Form className="my-3" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="category">Enter Category</Label>
            <Input
              type="text"
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Enter Task</Label>
            <Input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
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
