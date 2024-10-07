<!-- pages/index.vue -->
<template>
  <div class="container mx-auto my-5 p-10">
    <h1 class="text-2xl font-bold mb-5">To-Do List</h1>
    <form @submit.prevent="addTodo" class="mb-5">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new task"
        class="border border-gray-300 p-2 rounded-lg w-1/2"
      />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded-lg ml-2">
        Add
      </button>
    </form>

    <table class="min-w-full border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 p-2 text-left">Task</th>
          <th class="border border-gray-300 p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="todo in todos"
          :key="todo.id"
          class="border-b border-gray-300"
        >
          <td class="border border-gray-300 p-2">
            <span :class="{ 'line-through': todo.completed }">{{
              todo.title
            }}</span>
          </td>
          <td class="border border-gray-300 p-2">
            <button
              @click="editTodo(todo)"
              class="bg-yellow-500 text-white p-1 rounded-lg mr-2"
            >
              Edit
            </button>
            <button
              @click="deleteTodo(todo.id)"
              class="bg-red-500 text-white p-1 rounded-lg"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: "",
    };
  },
  computed: {
    todos() {
      const todos = this.$store.getters["todos/getTodos"];
      console.log("Todos from store:", todos); // Log the todos from the store
      return todos;
    },
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim()) {
        const todo = {
          title: this.newTodo,
          completed: false,
        };
        await this.$store.dispatch("todos/addTodo", todo);
        this.newTodo = "";
      }
    },
    async editTodo(todo) {
      const updatedTodo = {
        ...todo,
        completed: !todo.completed,
      };
      await this.$store.dispatch("todos/updateTodo", updatedTodo);
    },
    async deleteTodo(todoId) {
      await this.$store.dispatch("todos/deleteTodo", todoId);
    },
  },
  async mounted() {
    await this.$store.dispatch("todos/fetchTodos");
  },
};
</script>

<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
