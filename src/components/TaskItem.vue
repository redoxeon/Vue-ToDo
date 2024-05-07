<script setup>
import { ref } from 'vue'
const task = defineModel('task')
const status = defineModel('status')
const showStatusMenu = ref(false)
const editingTask = ref(false)
const text = ref('')

const emit = defineEmits(['statusUpdate', 'taskUpdate', 'remove'])

function statusMenuVis() {
  showStatusMenu.value = !showStatusMenu.value
}
function editTask() {
  editingTask.value = !editingTask.value
}

function updateStatus(status) {
  emit('statusUpdate', status)
  statusMenuVis()
}
function submitEdits() {
  editingTask.value = false
  if (text.value.trim() === '') {
    return
  }
  emit('taskUpdate', text.value)
  text.value = ''
}
</script>
<template>
  <div :class="`task-item ${status && 'status'}`">
    <div @click="statusMenuVis" class="status" v-if="status == 'todo'">
      <font-awesome-icon :icon="['fas', 'circle-dot']" style="color: #9893a5" />
    </div>
    <div @click="statusMenuVis" class="status" v-if="status == 'pending'">
      <font-awesome-icon :icon="['fas', 'circle-half-stroke']" style="color: #ea9d34" />
    </div>
    <div @click="statusMenuVis" class="status" v-if="status == 'done'">
      <font-awesome-icon :icon="['fas', 'circle-check']" style="color: #56949f" />
    </div>
    <div v-if="!editingTask" @click="editTask" class="task-content">
      {{ task }}
    </div>
    <div v-else class="task-content">
      <input type="text" v-model="text" />
      <button @click="submitEdits">Edit</button>
    </div>
    <div v-show="showStatusMenu">
      <font-awesome-icon
        :icon="['fas', 'circle-dot']"
        class="status-updates"
        style="color: #9893a5"
        @click="updateStatus('todo')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-half-stroke']"
        class="status-updates"
        style="color: #ea9d34"
        @click="updateStatus('pending')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-check']"
        class="status-updates"
        style="color: #56949f"
        @click="updateStatus('done')"
      />
      <font-awesome-icon
        :icon="['fas', 'circle-xmark']"
        style="color: #b4637a"
        class="status-updates"
        @click="$emit('remove')"
      />
    </div>
  </div>
</template>
