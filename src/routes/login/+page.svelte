<main class="flex w-full h-screen">
	<section class="w-1/3 border-r flex">
		<form
			class="flex flex-col w-full px-10 m-auto gap-2 items-center"
			method="POST">
			<h3 class="text-sm font-mono mb-4">Log in with</h3>
			<button
				class="bg-[#1C2128] text-white social-btn"
				formaction="?/login&provider=github">
				<div class="text-xl i-ri-github-fill" />
			</button>
			<button
				class="bg-[#5865F2] text-white social-btn"
				formaction="?/login&provider=discord">
				<div class="text-xl i-carbon-logo-discord" />
			</button>
			<button
				class="bg-white border text-gray-500 social-btn"
				formaction="?/login&provider=google">
				<div class="text-xl i-logos-google-icon" />
			</button>
		</form>
	</section>

	<section class="flex w-2/3">
		<div class="m-auto">
			<h1 class="font-bold text-4xl">Dango Notes🍡</h1>
		</div>
	</section>
</main>

<style>
	.social-btn {
		height: 50px;
		width: 100%;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.95;
		transition: all 0.25s ease-in-out;
	}
	.social-btn:hover {
		opacity: 1;
	}
</style>
