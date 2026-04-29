<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList 
      v-bind:propsdata="todoItems" 
      @removeTodo="removeTodo" 
      @toggleComplete="toggleComplete"
      @editTodo="editTodo"
    ></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

export default {
  data() {
    return {
      todoItems: [],
    };
  },
  methods: {
    clearAll() {
      localStorage.clear();
      this.todoItems = [];
    },
    addTodo(todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
      this.sortTodoItems();
    },
    removeTodo(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
    },
    toggleComplete(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(this.todoItems[index]));
      this.sortTodoItems();
    },
    editTodo(todoItem, index, newText) {
      localStorage.removeItem(todoItem.item);
      this.todoItems[index].item = newText;
      localStorage.setItem(newText, JSON.stringify(this.todoItems[index]));
      this.sortTodoItems();
    },
    sortTodoItems() {
      this.todoItems.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    }
  },
  created() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === 'loglevel:webpack-dev-server') continue;
        
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (item && typeof item === 'object' && 'item' in item) {
            this.todoItems.push(item);
          } else {
            const obj = { completed: false, item: key };
            this.todoItems.push(obj);
          }
        } catch (e) {
          const obj = { completed: false, item: key };
          this.todoItems.push(obj);
        }
      }
      this.sortTodoItems();
    }
  },
  components: {
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter,
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #e7e7e9;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
