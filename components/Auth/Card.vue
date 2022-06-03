<script setup lang="ts">
const authState = ref<"Login" | "Signup">("Login");
const input = reactive({ password: "", user: "" });
const authError = ref("");
const router = useRouter();

const { signUp, signIn } = useAuth();

const toggleAuthState = () => {
	if (authState.value === "Login") authState.value = "Signup";
	else authState.value = "Login";
	authError.value = "";
};

const handleSubmit = async () => {
	if (input.user !== "" || input.password !== "") {
		try {
			if (authState.value === "Signup") {
				await signUp({ user: input.user, password: input.password });
			} else {
				await signIn({ user: input.user, password: input.password });
				router.push("/profil");
			}

			input.user = "";
			input.password = "";
			authError.value = "";
		} catch (e) {
			authError.value = e.message;
		}
	}
};
</script>

<template>
	<div>
		<div>
			<div
				class="flex flex-col justify-between items-center h-sm w-md gap-6 p-10 text-white"
			>
				<h1 class="text-xl text-violet-600">My Lists and Todos</h1>
				<input
					placeholder="Email"
					type="email"
					class="bg-transparent p-2 rounded-sm focus:border-violet-700 focus:ring-0 w-full"
					v-model="input.user"
				/>
				<input
					placeholder="Password"
					type="password"
					class="bg-transparent p-2 rounded-sm focus:border-violet-700 focus:ring-0 w-full"
					v-model="input.password"
					@keypress.enter="handleSubmit"
				/>

				<button
					class="flex justify-center hover:bg-violet-700 hover:text-white duration-200 px-5 py-1 rounded-sm bg-gray-700 button"
					@click="handleSubmit"
				>
					{{ authState === "Login" ? "Login" : "Signup" }}
				</button>
				<p v-if="authError" class="text-red-600">{{ authError }}</p>
				<p
					class="text-sm text-gray-500 cursor-pointer hover:text-violet-500 duration-200"
					@click="toggleAuthState"
				>
					{{
						authState === "Login"
							? "Don't have an account ? Create one now"
							: "Already have an account ? Login here"
					}}
				</p>
			</div>
		</div>
	</div>
</template>
<style scoped>
.button:hover {
	border-color: rgba(0, 0, 0, 0) !important;
}
</style>
