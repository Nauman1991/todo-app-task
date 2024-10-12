<template>
    <div
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
        >
            <div
                class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
            ></div>
            <span
                class="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
                >&#8203;</span
            >
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
                <form @submit.prevent="createTask">
                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="mb-4">
                            <label
                                for="title"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Title</label
                            >
                            <input
                                type="text"
                                id="title"
                                v-model="task.title"
                                required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div class="mb-4">
                            <label
                                for="description"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Description</label
                            >
                            <textarea
                                id="description"
                                v-model="task.description"
                                required
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>
                        <div class="mb-4">
                            <label
                                for="due_date"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Due Date</label
                            >
                            <input
                                type="date"
                                id="due_date"
                                v-model="task.due_date"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div class="mb-4">
                            <label
                                for="priority"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Priority</label
                            >
                            <select
                                id="priority"
                                v-model="task.priority"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="Urgent">Urgent</option>
                                <option value="High">High</option>
                                <option value="Normal">Normal</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label
                                for="tags"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Tags</label
                            >
                            <input
                                type="text"
                                id="tags"
                                v-model="tagInput"
                                @keydown.enter.prevent="addTag"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <div class="mt-2">
                                <span
                                    v-for="tag in task.tags"
                                    :key="tag"
                                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                                >
                                    {{ tag }}
                                    <button
                                        @click="removeTag(tag)"
                                        class="ml-1 text-red-500"
                                    >
                                        &times;
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div class="mb-4">
                            <label
                                for="attachment"
                                class="block text-gray-700 text-sm font-bold mb-2"
                                >Attachment</label
                            >
                            <input
                                type="file"
                                id="attachment"
                                @change="handleFileUpload"
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    </div>
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="submit"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Create Task
                        </button>
                        <button
                            @click="$emit('close')"
                            type="button"
                            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['close', 'create-task'],
    setup(props, { emit }) {
        const task = ref({
            title: '',
            description: '',
            due_date: '',
            priority: 'Normal',
            tags: [],
            attachment: null
        });

        const tagInput = ref('');

        const addTag = () => {
            if (tagInput.value.trim()) {
                task.value.tags.push(tagInput.value.trim());
                tagInput.value = '';
            }
        };

        const removeTag = (tagToRemove) => {
            task.value.tags = task.value.tags.filter(
                (tag) => tag !== tagToRemove
            );
        };

        const handleFileUpload = (event) => {
            task.value.attachment = event.target.files[0];
        };

        const createTask = () => {
            emit('create-task', task.value);
        };

        return {
            task,
            tagInput,
            addTag,
            removeTag,
            handleFileUpload,
            createTask
        };
    }
};
</script>
