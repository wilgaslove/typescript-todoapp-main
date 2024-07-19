<template>
  <li :class="{ completed: todo.complete, editing: editing }">
    <div class="view">
      <input type="checkbox" class="toggle" v-model="isTodoCompleted" />
      <label @dblclick="startEditing">{{ todo.title }}</label>
      <button class="destroy" @click="emit('delete-todo', todo)"></button>
    </div>
    <div class="input-container">
      <input
        ref="editRef"
        id="edit-to-input"
        type="text"
        class="edit"
        v-model="editInput"
        @keyup.enter="finishEdit"
        @blur="concelEdit"
      />
      <label class="visually-hidden" for="edit-to-input">Editer</label>
    </div>
  </li>

  <!-- <pre>{{ todo }} {{ isTodoCompleted }}</pre>  -->
</template>

<script setup lang="ts">
import type { Todo } from '@/@types'
import { computed, nextTick, ref, watch } from 'vue'

const editRef = ref<HTMLInputElement>() // élement du DOM
const props = defineProps<{
  todo: Todo
}>()

const emit = defineEmits<{
  (e: 'delete-todo', todo: Todo): void
  (e: 'update-todo', todo: Todo, completeVal: boolean): void
  (e: 'edit-todo', todo: Todo, value: string): void
}>()

// const isTodoCompleted = computed<boolean>({
//   get: () => props.todo.complete,
//   set: (val: boolean) => emit('update-todo', props.todo, val)
// });

const isTodoCompleted = ref<boolean>(props.todo.complete)

watch(isTodoCompleted, (newVal) => {
  emit('update-todo', props.todo, newVal)
})

// watch(
//   () => isTodoCompleted.value,
//   (newVal) => {
//     alert("emit('update-todo')")
//     emit('update-todo', props.todo, newVal)
//   }
// )

const editing = ref<boolean>(false)
const editText = ref<string>('')
const editInput = computed({
  get: () => props.todo.title,
  set: (val) => {
    editText.value = val
  }
})

function startEditing() {
  editing.value = true

  //faire un focus sur le champ de saisie
  nextTick(() => {
    editRef.value?.focus()
  })
}

function finishEdit() {
  editing.value = false
  editTodo()
}

function editTodo() {
  emit('edit-todo', props.todo, editText.value) //emettre un event

  editText.value = ''
}

function concelEdit() {}
</script>

<style scoped>
.visually-hidden {
  bottom: 0;
  clip: rect(0 0 0 0);
  clip-path: 50%;
  height: 1px;
  width: 1px;
  margin: -1;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}
</style>
