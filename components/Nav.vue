<script setup lang="ts">
const user = useUser();
const { signOut } = useAuth();
</script>

<template>
	<nav class="bg-gray-900 w-full">
		<ul
			class="flex justify-start items-center w-full gap-5 py-5 px-10 text-white"
		>
			<li class="hover:text-violet-700 duration-200">
				<nuxt-link to="/">Home</nuxt-link>
			</li>
			<li class="hover:text-violet-700 duration-200">
				<nuxt-link to="/profil">Profil</nuxt-link>
			</li>
			<li class="hover:text-violet-700 duration-200">
				<nuxt-link to="/posts">Posts</nuxt-link>
			</li>
			<li
				v-if="user"
				class="ml-auto cursor-pointer hover:text-red-500 duration-200"
				@click="signOut"
			>
				Logout
			</li>
		</ul>
	</nav>
</template>
