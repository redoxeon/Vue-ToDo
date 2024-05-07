<script setup>
import { ref, onMounted, watch } from 'vue'
import TaskItem from './components/TaskItem.vue'

const tasks = ref([])
const text = ref('')

watch(
  tasks,
  (newTaskValue) => {
    localStorage.setItem('tasks', JSON.stringify(newTaskValue))
  },
  { deep: true }
)
onMounted(() => {
  tasks.value = JSON.parse(localStorage.getItem('tasks')) || []
})

function addTask() {
  if (text.value.trim() === '') {
    return
  }
  tasks.value.unshift({
    task: text.value,
    status: 'todo'
  })
  text.value = ''
}

function deleteTask(task) {
  tasks.value = tasks.value.filter((x) => x !== task)
}

function setTaskStatus(task, status) {
  task.status = status
}
</script>

<template>
  <main class="app">
    <section class="greeting">
      <h3 class="title">Michael Harding's Vue To-Do List</h3>
    </section>
    <div class="input-section">
      <section class="create-task">
        <form @submit.prevent="addTask">
          <input type="text" placeholder="Add a task" v-model="text" />
          <input type="submit" value="Add task" />
        </form>
      </section>
    </div>
    <div class="task-section">
      <section class="task-list">
        <h3 v-show="tasks.length === 0">Let's get something done...</h3>
        <div class="list">
          <div v-for="task in tasks" :key="task.task">
            <TaskItem
              v-model:task="task.task"
              v-model:status="task.status"
              @remove="deleteTask(task)"
              @statusUpdate="(s) => setTaskStatus(task, s)"
              @taskUpdate="(t) => (task.task = t)"
            ></TaskItem>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
