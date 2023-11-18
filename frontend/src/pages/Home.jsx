import React, { useContext, useEffect, useState } from 'react';

import { Layout } from '../components/';
import './home.css';
import Todos from '../components/Todos';
import { Context } from '../context/Context';
import ModalForm from '../components/ModalForm';
import { Button } from 'reactstrap';

const Home = () => {
  let { getTodos, todos, updateTodo, deleteTodo, addTodo } =
    useContext(Context);

  const [filter, setFilter] = useState('All');

  const categories = todos.reduce(
    (acc, item) =>
      !acc.includes(item.category) ? [...acc, item.category] : acc,
    ['All']
  );

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleCategoryClick = (category) => {
    if (category === 'All') setFilter('All');
    else setFilter(category);
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-end align-items-end">
        <Button className="mt-2 me-2" color="primary" onClick={toggle}>
          Add
        </Button>
      </div>
      <p className="fs-2 text-center mt-5">ToDo List</p>
      <div className="d-flex justify-content-center mb-3">
        {categories.length > 2 &&
          categories.map((category) => (
            <Button
              key={category}
              className="me-2"
              color="secondary"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
      </div>
      <Todos
        todos={todos}
        filter={filter}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />

      <ModalForm toggle={toggle} modal={modal} addTodo={addTodo} />
    </Layout>
  );
};

export default Home;
