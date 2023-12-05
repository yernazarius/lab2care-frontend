<script lang="ts">
  import { enhance } from "$app/forms";
  /** @type {import('./$types').PageData} */
  export let data;
  let wow = data.props;
  let categories = data.props.parentCategories;

  // console.log("admin page:", wow);
</script>

{#if wow.data.isLoggedIn && wow.data.user.is_superuser}
  <div class="container px-6 py-8 mx-auto">
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Add a Child Category
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          use:enhance
          class="space-y-6"
          action="?/addChildCatogory"
          method="POST"
        >
          <!-- You can continue with similar input fields for description, price, etc. -->
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Catogory Name</label
            >
            <div class="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Description</label
            >
            <div class="mt-2">
              <input
                id="name"
                name="description"
                type="text"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm"
              />
            </div>
          </div>
          <div>
            <label
              for="category_id"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Parent Category</label
            >
            <div class="my-4">
              <select
                id="category_id"
                name="parent_category_id"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="">Select a Category</option>
                {#each categories as category}
                  <option value={category.id}>{category.name}</option>
                {/each}
              </select>
            </div>
            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
              >
                Add Catogory
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
{:else}
  <h1>You are not allowed here!</h1>
{/if}
