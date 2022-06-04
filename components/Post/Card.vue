<template>
	<div class="flex flex-col gap-5 bg-slate-700 p-5 rounded-sm w-3/5">
		<h2 class="text-xl uppercase mb-5">
			{{ post.title }}
		</h2>
		<div class="text-sm mb-5 text-gray-400">
			Author: {{ post.author.node.name }}
		</div>
		<div
			id="content"
			v-dompurify-html="post.content"
			contenteditable="true"
			:inputmode="'text'"
			class="focus:border-0 focus:outline-none"
			@focus="initialCache"
			@focusout="save(post.id, $event)"
		></div>

		<button
			class="flex justify-center hover:bg-violet-700 hover:text-white duration-200 px-5 py-1 rounded-sm bg-gray-600 w-fit mt-5"
		>
			Save
		</button>
	</div>
</template>

<script setup lang="ts">
const { post } = defineProps(["post"]);
const contentInit = ref("");
const { getJwtToken } = useAuth();
const emit = defineEmits(["modify"]);

const initialCache = (e) => {
	// console.log(e.target.innerText);
	contentInit.value = e.target.innerText;
};

const save = async (id: string, e) => {
	const editableText: string = e.target.innerText;
	const isEdit = editableText.localeCompare(contentInit.value);
	console.log(isEdit);
	if (isEdit !== 0) {
		useGqlToken(getJwtToken());
		const { data, error } = await useAsyncData(
			"edit",
			() =>
				GqlEditPost({ id, content: editableText }).catch((e) => console.log(e)),
			{
				initialCache: false,
			}
		);

		if (error.value) {
			console.log(error.value);
		}

		contentInit.value = "";
		emit("modify");
	}
};
</script>

<style lang="scss">
.post-content {
	@apply flex flex-col gap-5 bg-gray-700 p-5 rounded-sm relative;

	img {
		width: 20%;
	}
}
</style>
