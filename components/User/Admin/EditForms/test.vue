<script setup>
const people = [...]

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return people
  }

  return people.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})
</script>

<template>
  <div>
    <UInput v-model="q" placeholder="Filter people..." />

    <UTable :rows="filteredRows" />
  </div>
</template>
