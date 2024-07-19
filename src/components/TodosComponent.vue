<template>
  <div>
    <TodoHeader @add-todo="addTodo" />

    <TodoMain
      :taches="todos"
      @delete-todo="deleteTodo"
      @update-todo="updateTodo"
      @edit-todo="editTodo"
    />

    <TodoFooter :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import TodoHeader from '@/components/TodoHeader.vue'
import TodoMain from '@/components/TodoMain.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import type { Todo } from '@/@types'
import { ref } from 'vue'
import { nanoid } from 'nanoid'
import { useStorage } from '@vueuse/core'
// import { todo } from 'node:test'

// const todos = ref<Todo[]>([])
const todos = useStorage<Todo[]>('todoapp-todos', [])
function addTodo(value: string): void {
  if (value.trim().length === 0) {
    // si la tâche est vide,
    return // on soirt de la function sans rien faire
  }
  todos.value.push({
    id: nanoid(),
    title: value,
    complete: false
  })
}

function deleteTodo(todo: Todo): void {
  todos.value = todos.value.filter((t) => t !== todo)
}

function updateTodo(doto: Todo, completedValue: boolean) {
  doto.complete = completedValue
}

function editTodo(todo: Todo, value: string) {
  todo.title = value
}
</script>

<style scoped></style>
