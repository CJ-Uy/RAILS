<template>
  <div class="flex justify-center items-center h-screen">
    <h1 class="text-3xl font-bold text-green-500">
      Installed Tailwind CSS in Nuxt 3
    </h1>
    <br>
    <button class="login-button" @click="google_login">
      Login with Google
    </button>
  </div>
</template>


<script>
export default defineComponent({
  methods: {
    google_login() {
      window.location.href = "localhost:4000/auth/google";
    }
  }
});
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
