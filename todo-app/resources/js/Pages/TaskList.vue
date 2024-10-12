<template>
    <div>
        <div class="mb-4">
            <input
                v-model="search"
                placeholder="Search tasks"
                class="border rounded p-2 w-full"
            />
        </div>
        <div class="mb-4">
            <select
                v-model="sortBy"
                @change="sortTasks"
                class="border rounded p-2"
            >
                <option value="created_at">Created At</option>
                <option value="completed_at">Completed</option>
                <option value="priority">Priority</option>
                <option value="due_date">Due Date</option>
            </select>
        </div>
        <div class="mb-4">
            <select
                v-model="filterBy"
                @change="filterTasks"
                class="border rounded p-2"
            >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="todo">Todo</option>
                <option value="archived">Archived</option>
            </select>
        </div>
        <ul>
            <li
                v-for="task in filteredTasks"
                :key="task.id"
                class="mb-4 p-4 border rounded"
            >
                <h3 class="text-xl font-bold">{{ task.title }}</h3>
                <p>{{ task.description }}</p>
                <p>Due: {{ task.due_date }}</p>
                <p>Priority: {{ task.priority }}</p>
                <div class="mt-2">
                    <button
                        @click="toggleComplete(task)"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                        {{
                            task.completed_at
                                ? 'Mark Incomplete'
                                : 'Mark Complete'
                        }}
                    </button>
                    <button
                        @click="toggleArchive(task)"
                        class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                        {{ task.archived_at ? 'Restore' : 'Archive' }}
                    </button>
                    <button
                        @click="editTask(task)"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                        Edit
                    </button>
                    <button
                        @click="deleteTask(task.id)"
                        class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    props: {
        tasks: Array
    },
    emits: ['update-task', 'delete-task'],
    setup(props, { emit }) {
        const search = ref('');
        const sortBy = ref('created_at');
        const filterBy = ref('all');

        const filteredTasks = computed(() => {
            let result = props.tasks;

            if (search.value) {
                result = result.filter(
                    (task) =>
                        task.title
                            .toLowerCase()
                            .includes(search.value.toLowerCase()) ||
                        task.description
                            .toLowerCase()
                            .includes(search.value.toLowerCase())
                );
            }

            if (filterBy.value === 'completed') {
                result = result.filter((task) => task.completed_at);
            } else if (filterBy.value === 'todo') {
                result = result.filter((task) => !task.completed_at);
            } else if (filterBy.value === 'archived') {
                result = result.filter((task) => task.archived_at);
            }

            return result.sort((a, b) => {
                if (sortBy.value === 'priority') {
                    const priorityOrder = {
                        Urgent: 0,
                        High: 1,
                        Normal: 2,
                        Low: 3
                    };
                    return (
                        priorityOrder[a.priority] - priorityOrder[b.priority]
                    );
                } else {
                    return (
                        new Date(b[sortBy.value]) - new Date(a[sortBy.value])
                    );
                }
            });
        });

        const toggleComplete = (task) => {
            const updatedTask = {
                ...task,
                completed_at: task.completed_at ? null : new Date()
            };
            emit('update-task', updatedTask);
        };

        const toggleArchive = (task) => {
            const updatedTask = {
                ...task,
                archived_at: task.archived_at ? null : new Date()
            };
            emit('update-task', updatedTask);
        };

        const editTask = (task) => {
            // Implement edit functionality (e.g., open edit modal)
        };

        const deleteTask = (taskId) => {
            if (confirm('Are you sure you want to delete this task?')) {
                emit('delete-task', taskId);
            }
        };

        const sortTasks = () => {
            // Sorting is handled in the computed property
        };

        const filterTasks = () => {
            // Filtering is handled in the computed property
        };

        return {
            search,
            sortBy,
            filterBy,
            filteredTasks,
            toggleComplete,
            toggleArchive,
            editTask,
            deleteTask,
            sortTasks,
            filterTasks
        };
    }
};
</script>
