<template>
  <main class="main">
    <ul class="todo-list">
      <TodoItem
        v-for="todo in taches"
        :key="todo.id"
        :todo="todo"
        @delete-todo="emit('delete-todo', todo)"
      />
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import TodoItem from '@/components/TodoItem.vue'
// const props = defineProps(['taches']);

const props = defineProps<{
  taches: Todo[]
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()



function editTodo() {
  emit('edit-todo', props.todo, editText.value); //emettre un event


}
</script>

<style scoped></style>
