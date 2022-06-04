<template>
	<div>
		<div v-if="pending">Loading</div>
		<div
			v-else
			class="flex flex-col justify-center items-center w-5/6 p-5"
			style="margin: 0 auto"
		>
			<div v-for="post in posts" :key="post.id">
				<PostCard :post="post" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// const posts = ref([]);

const { data: posts, pending } = useLazyFetch<any>(
	"https://www.marciatack.fr/wp-json/wp/v2/posts"
);
</script>

<style scoped></style>
