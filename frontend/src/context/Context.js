import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Context = createContext();

const ENV = process.env.REACT_APP_ENV;
const PORT = process.env.REACT_APP_BACKEND_PORT;
// const BACKEND =
//   ENV === 'AWS'
//     ? 'http://backend:5000'
//     : process.env.REACT_APP_BACKEND || 'http://127.0.0.1:5000';

// const baseUrl = `${BACKEND}/api/`;

const baseUrl =
  ENV === 'AWS'
    ? `${process.env.REACT_APP_BACKEND_AWS}/api/`
    : `${process.env.REACT_APP_BACKEND}/api/` || 'http://127.0.0.1:5000/api/';

console.log(baseUrl);

const ContextProvider = ({ children }) => {
  let localUser = localStorage.getItem('user');
  console.log(localUser);
  if (localUser) localUser = JSON.parse(localUser);
  if (!localUser) localUser = {};
  const [userInfo, setUserInfo] = useState(localUser || null);
  const [todos, setTodos] = useState([]);

  const registerUser = async (userData, navigate) => {
    console.log(userData);
    console.log(baseUrl);
    try {
      const res = await axios({
        method: 'post',
        url: `${baseUrl}auth/register/`,
        data: userData,
      });

      console.log(res.data);
      setUserInfo({ token: res.data.token, ...res.data.user });
      localStorage.setItem(
        'user',
        JSON.stringify({ token: res.data.token, ...res.data.user })
      );
      toast.success('User registered successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const loginUser = async (userData, navigate) => {
    try {
      console.log(userData);
      const res = await axios({
        method: 'post',
        url: `${baseUrl}auth/login/`,
        data: userData,
      });

      console.log(res.data);
      setUserInfo({ token: res.data.token, ...res.data.user });
      localStorage.setItem(
        'user',
        JSON.stringify({ token: res.data.token, ...res.data.user })
      );
      toast.success('User loggedin successfully');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const logout = async (navigate) => {
    localStorage.removeItem('user');
    setUserInfo(null);
    toast.success('Logged out successfully');
    navigate('/auth/login');
  };

  const getTodos = async () => {
    try {
      console.log(userInfo);
      const res = await axios({
        method: 'get',
        url: `${baseUrl}todos/`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      console.log(res.data.data);
      setTodos(res.data.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const addTodo = async (data) => {
    try {
      await axios({
        method: 'post',
        url: `${baseUrl}todos/`,
        data: data,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      getTodos();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const updateTodo = async (id) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${baseUrl}todos/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      await axios({
        method: 'put',
        url: `${baseUrl}todos/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        data: { completed: !res.data.data.completed },
      });

      getTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: `${baseUrl}todos/${id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      getTodos();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Context.Provider
      value={{
        registerUser,
        loginUser,
        logout,
        userInfo,
        getTodos,
        todos,
        updateTodo,
        deleteTodo,
        addTodo,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
