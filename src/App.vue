<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import TaskItem from './components/TaskItem.vue'

const tasks = ref([])
const text = ref('')
const activeFilter = ref('all')

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

const getTasks = computed(() => {
  if (activeFilter.value === 'all') {
    return tasks.value
  }
  return tasks.value.filter((task) => task.status === activeFilter.value)
})

function filterBy(filter) {
  if (activeFilter.value === filter) {
    activeFilter.value = 'all'
  } else {
    activeFilter.value = filter
  }
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
    <section class="filter-menu">
      <span style="margin-right: 0.5rem">Filter by:</span>
      <font-awesome-icon
        :icon="['fas', 'filter-circle-xmark']"
        class="status-filters"
        :class="{ inactive: activeFilter !== 'all' }"
        style="color: #b4637a"
        @click="filterBy('all')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-dot']"
        class="status-filters"
        :class="{ inactive: activeFilter !== 'todo' }"
        style="color: #9893a5"
        @click="filterBy('todo')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-half-stroke']"
        class="status-filters"
        :class="{ inactive: activeFilter !== 'pending' }"
        style="color: #ea9d34"
        @click="filterBy('pending')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-check']"
        class="status-filters"
        :class="{ inactive: activeFilter !== 'done' }"
        style="color: #56949f"
        @click="filterBy('done')"
      />
    </section>
    <div class="task-section">
      <section class="task-list">
        <h3 v-if="tasks.length === 0">Let's get something done...</h3>
        <h3 v-else-if="getTasks.length === 0">No tasks match this filter!</h3>
        <div class="list">
          <div v-for="task in getTasks" :key="task.task">
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
