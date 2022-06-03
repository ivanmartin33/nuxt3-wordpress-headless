<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

const user = useUser();
</script>
<template>
	<div>
		<h1>{{ user.name }}</h1>
	</div>
</template>
