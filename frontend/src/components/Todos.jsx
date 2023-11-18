import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
} from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import { MdOutlineDoneOutline } from 'react-icons/md';
import { MdRemoveDone } from 'react-icons/md';
import { useEffect } from 'react';

const Todos = ({ todos, deleteTodo, updateTodo, filter }) => {
  const renderingTodos =
    filter === 'All' ? todos : todos.filter((todo) => todo.category === filter);
  return (
    <Container>
      <Row className="mt-3">
        <Col md={{ size: 6, offset: 3 }}>
          <ListGroup>
            {renderingTodos?.map((todo) => (
              <ListGroupItem
                key={todo._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.description}
                  </span>
                  <span className="ms-5">(cat-{todo.category})</span>
                </div>
                <div className="icon-container">
                  {!todo.completed ? (
                    <MdOutlineDoneOutline
                      onClick={() => updateTodo(todo._id)}
                      className="me-3 done-icon"
                    />
                  ) : (
                    <MdRemoveDone
                      onClick={() => updateTodo(todo._id)}
                      className="me-3 undone-icon"
                    />
                  )}
                  <FaTrash
                    onClick={() => deleteTodo(todo._id)}
                    className="trash-icon"
                  />
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Todos;
