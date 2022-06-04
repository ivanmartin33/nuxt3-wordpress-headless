<script setup lang="ts">
definePageMeta({
	middleware: "auth",
});

const { data, refresh } = await useAsyncData("posts", () => GqlGetPosts(), {
	initialCache: false,
});

const reloadPosts = () => {
	refresh();
};

reloadPosts();
</script>

<template>
	<div class="p-10">
		<h1 class="text-4xl mb-5">Posts</h1>

		<div class="flex flex-col gap-5">
			<TransitionGroup name="posts">
				<div v-for="post in data.posts.nodes" :key="post.id" class="">
					<PostCard :post="post" @modify="reloadPosts" />
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>

<style>
.posts-move, /* apply transition to moving elements */
.posts-enter-active,
.posts-leave-active {
	transition: all 0.5s ease;
}

.posts-enter-from,
.posts-leave-to {
	opacity: 0;
	transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.posts-leave-active {
	position: absolute;
}
</style>
