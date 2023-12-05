<script lang="ts">
  import { enhance } from "$app/forms";
  import { error } from "@sveltejs/kit";
  /** @type {import('./$types').PageData} */
  export let data;
  let wow = data.props;
  // console.log("admin page:", wow);
</script>

<div class="flex justify-center flex-col container px-6 py-8 mx-auto gap-5">
  {#if wow.data.isLoggedIn && wow.data.user.is_superuser}
    <div class="flex justify-center">
      <a
        class=" w-60 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        href="createCategory/parentCategory">Create Parent Category</a
      >
    </div>
    <div class="flex justify-center">
      <a
        class=" w-60 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        href="createCategory/childCategory">Create Child Category</a
      >
    </div>
  {:else}
    <h1
      class="mt-28 flex justify-center font-bold text-2xl text-gray-900 md:text-5xl lg:text-6xl"
    >
      You are not allowed here!
    </h1>
  {/if}
</div>
