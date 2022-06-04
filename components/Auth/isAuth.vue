<template>
	<div v-if="user">
		<slot />
	</div>
	<div v-else>
		<AuthCard />
	</div>
</template>

<script setup lang="ts">
const user = useUser();
</script>

<style></style>
