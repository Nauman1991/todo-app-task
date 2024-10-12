<template>
    <header class="app-header">
        <h1 class="title">My TODO App</h1>
        <p class="subtitle">Stay organized and productive!</p>
        <div class="auth-section">
            <template v-if="isAuthenticated">
                <span class="welcome-message">Welcome, {{ user?.name }}</span>
                <button @click="handleLogout" class="auth-button logout-button">
                    Logout
                </button>
            </template>
            <template v-else>
                <button @click="$emit('showLogin')" class="auth-button">
                    Login
                </button>
                <button @click="$emit('showSignup')" class="auth-button">
                    Signup
                </button>
            </template>
        </div>
    </header>
</template>

<script setup>
import { useAuth } from "../store/Auth";

const { user, isAuthenticated, logout } = useAuth();

const handleLogout = async () => {
    try {
        await logout();
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

defineEmits(["showLogin", "showSignup"]);
</script>
