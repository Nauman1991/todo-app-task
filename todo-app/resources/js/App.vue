<template>
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <router-link
                            to="/"
                            class="flex-shrink-0 flex items-center"
                        >
                            <!-- <img
                                class="h-8 w-auto"
                                src="@/assets/logo.png"
                                alt="Logo"
                            /> -->
                        </router-link>
                    </div>
                    <div class="flex items-center">
                        <button
                            v-if="isAuthenticated"
                            @click="logout"
                            class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <router-view></router-view>
            </div>
        </main>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup() {
        const router = useRouter();
        const isAuthenticated = computed(() => !!localStorage.getItem('token'));

        const logout = async () => {
            try {
                await axios.post('/logout');
                localStorage.removeItem('token');
                router.push('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        return {
            isAuthenticated,
            logout
        };
    }
};
</script>
