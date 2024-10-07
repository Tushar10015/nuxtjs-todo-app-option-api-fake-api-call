// store/todos.js
import axios from "axios";

export const state = () => ({
  todos: [],
});

export const mutations = {
  SET_TODOS(state, todos) {
    console.log("Setting todos:", todos); // Log the todos being set
    state.todos = todos;
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  UPDATE_TODO(state, updatedTodo) {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
  DELETE_TODO(state, todoId) {
    state.todos = state.todos.filter((todo) => todo.id !== todoId);
  },
};

export const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    console.log("Fetched todos:", response.data); // Log the fetched data
    commit("SET_TODOS", response.data);
  },
  async addTodo({ commit }, todo) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      todo
    );
    commit("ADD_TODO", response.data);
  },
  async updateTodo({ commit }, todo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
    commit("UPDATE_TODO", response.data);
  },
  async deleteTodo({ commit }, todoId) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
    commit("DELETE_TODO", todoId);
  },
};

export const getters = {
  getTodos(state) {
    console.log("Getting todos:", state.todos); // Log the todos being retrieved
    return state.todos;
  },
};
