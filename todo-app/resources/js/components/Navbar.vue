<template>
    <nav>
      <router-link to="/">Home</router-link>
      <template v-if="isAuthenticated">
        <router-link to="/dashboard">Dashboard</router-link>
        <button @click="handleLogout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </template>
    </nav>
  </template>
  
  <script setup>
  import { useAuth } from '../store/auth';
  import { useRouter } from 'vue-router';
  
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  </script>