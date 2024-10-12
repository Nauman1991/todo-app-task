<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">Todo List</h1>
        <div class="mb-6">
            <button
                @click="showCreateTaskModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Create New Task
            </button>
        </div>
        <TaskList
            :tasks="tasks"
            @update-task="updateTask"
            @delete-task="deleteTask"
        />
        <CreateTaskModal
            v-if="showCreateTaskModal"
            @close="showCreateTaskModal = false"
            @create-task="createTask"
        />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TaskList from '../Pages/TaskList.vue';
import CreateTaskModal from '../components/Modals/CreateTaskModal.vue';

export default {
    components: {
        TaskList,
        CreateTaskModal
    },
    setup() {
        const tasks = ref([]);
        const showCreateTaskModal = ref(false);

        const fetchTasks = async () => {
            try {
                const response = await axios.get('/tasks');
                tasks.value = response.data.data;
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        const createTask = async (newTask) => {
            try {
                await axios.post('/tasks', newTask);
                fetchTasks();
                showCreateTaskModal.value = false;
            } catch (error) {
                console.error('Error creating task:', error);
            }
        };

        const updateTask = async (updatedTask) => {
            try {
                await axios.put(`/tasks/${updatedTask.id}`, updatedTask);
                fetchTasks();
            } catch (error) {
                console.error('Error updating task:', error);
            }
        };

        const deleteTask = async (taskId) => {
            try {
                await axios.delete(`/tasks/${taskId}`);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        };

        onMounted(fetchTasks);

        return {
            tasks,
            showCreateTaskModal,
            createTask,
            updateTask,
            deleteTask
        };
    }
};
</script>
