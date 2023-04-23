<template>
  <div class="flex justify-center items-center h-screen">
    <h1 class="text-3xl font-bold text-green-500">
      Installed Tailwind CSS in Nuxt 3
    </h1>
    <h2> {{ data }}</h2>
    <br>

    <nuxt-link to="/login">
      <button class="login-button">
        Login with Google
      </button>
    </nuxt-link>

  </div>
</template>


<script setup>

</script>


<style scoped>
.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #757575;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #f0f0f0;
}

</style>
