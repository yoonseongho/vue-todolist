<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem.item" class="shadow">
        <i
          class="checkBtn fas fa-check"
          aria-hidden="true"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          v-on:click="toggleComplete(todoItem, index)"
        ></i>
        
        <!-- 수정 모드일 때 -->
        <input 
          v-if="editIndex === index" 
          type="text" 
          v-model="editText" 
          class="editInput"
          v-on:keyup.enter="saveEdit(todoItem, index)"
        />
        <!-- 일반 모드일 때 -->
        <span 
          v-else 
          v-bind:class="{ textCompleted: todoItem.completed }"
        >
          {{ todoItem.item }}
        </span>

        <div class="btnContainer">
          <!-- 수정/저장 버튼 -->
          <span v-if="editIndex === index" class="saveBtn" @click="saveEdit(todoItem, index)">
            <i class="fas fa-save" aria-hidden="true"></i>
          </span>
          <span v-else class="editBtn" @click="startEdit(todoItem, index)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
          </span>

          <!-- 삭제 버튼 (수정 중이 아닐 때만 표시) -->
          <span
            v-if="editIndex !== index"
            class="removeBtn"
            type="button"
            @click="removeTodo(todoItem, index)"
          >
            <i class="far fa-trash-alt" aria-hidden="true"></i>
          </span>
        </div>
      </li>
    </transition-group>
  </section>
</template>

<script>
export default {
  props: ["propsdata"],
  data() {
    return {
      editIndex: -1,
      editText: ""
    };
  },
  methods: {
    removeTodo(todoItem, index) {
      this.$emit("removeTodo", todoItem, index);
    },
    toggleComplete(todoItem, index) {
      this.$emit("toggleComplete", todoItem, index);
    },
    startEdit(todoItem, index) {
      this.editIndex = index;
      this.editText = todoItem.item;
    },
    saveEdit(todoItem, index) {
      if (this.editText.trim() !== "") {
        this.$emit("editTodo", todoItem, index, this.editText);
        this.editIndex = -1;
        this.editText = "";
      }
    }
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 10px;
  cursor: pointer;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}

.editInput {
  border: none;
  border-bottom: 1px solid #62acde;
  font-size: 1rem;
  width: 60%;
  height: 30px;
  margin-top: 10px;
}

.btnContainer {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

.editBtn {
  color: #62acde;
  cursor: pointer;
}

.saveBtn {
  color: #2f9d27;
  cursor: pointer;
}

.removeBtn {
  color: #de4343;
  cursor: pointer;
}
</style>
