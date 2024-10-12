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
                <form @submit.prevent="updateTask">
                    <!-- Form fields similar to CreateTaskModal, but pre-filled with task data -->
                    <!-- ... -->
                    <div
                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="submit"
                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Update Task
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
    props: {
        task: Object
    },
    emits: ['close', 'update-task'],
    setup(props, { emit }) {
        const editedTask = ref({ ...props.task });

        const updateTask = () => {
            emit('update-task', editedTask.value);
        };

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

        return {
            editedTask,
            tagInput,
            updateTask,
            addTag,
            removeTag,
            handleFileUpload
        };
    }
};
</script>
