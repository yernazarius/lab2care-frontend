<script lang="ts">
  import { enhance } from "$app/forms";

  interface User {
    is_superuser?: boolean;
    name?: string;
    email?: string;
    is_verified?: boolean;
  }
  export let errorMessage: any;
  export let data;
  let wow: { data: { isLoggedIn: boolean; user: User } } = data.props;
  let addresses = data.props.addresses;
  console.log(wow);
  let emptyUserState = {
    isLoggedIn: false,
    user: {},
  };
  let showAddressDialog = false;
  const toggleAddressDialog = () => {
    showAddressDialog = !showAddressDialog;
  };
</script>

<main class="bg-gray-100 h-full min-h-[800px]">
  {#if !wow.data.isLoggedIn}
    <!-- Your not allowed here section -->
  {:else}
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-wrap -mx-4">
        <!-- Sidebar -->
        <div class="w-full lg:w-1/4 px-4 mb-6 lg:mb-0">
          <div class="p-6 bg-white rounded-lg shadow">
            <h2 class="text-xl font-bold mb-6">Account</h2>
            <nav>
              <ul class="space-y-4">
                <li>
                  <a href="#" class="text-gray-700 hover:text-gray-900"
                    >Overview</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-700 hover:text-gray-900"
                    >Profile</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-700 hover:text-gray-900"
                    >Addresses</a
                  >
                </li>
                <li>
                  <a href="#" class="text-gray-700 hover:text-gray-900"
                    >Orders</a
                  >
                </li>
                <li>
                  {#if wow.data.user.is_superuser}
                    <button
                      on:click={() => (location.href = "/adminPage/")}
                      class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Admin Page
                    </button>
                  {/if}
                </li>
                {#if !wow.data.user.is_verified}
                  <li>
                    <p class="text-red-600 font-bold">
                      Your account is not verified.
                    </p>
                    <form
                      use:enhance
                      class="space-y-6"
                      action="?/verifyAccount"
                      method="POST"
                      enctype="multipart/form-data"
                    >
                      <input
                        class="hidden m-0 p-0"
                        type="hidden"
                        name="email"
                        value={wow.data.user.email}
                      />
                      <div>
                        <button
                          type="submit"
                          class=" text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                          >Verify</button
                        >
                      </div>
                    </form>
                    {#if errorMessage}
                      <p>Error: {errorMessage}</p>
                    {:else}
                      check your email for verification link
                    {/if}
                  </li>
                {/if}
                <li>
                  <form
                    use:enhance
                    class="space-y-6"
                    action="?/logout"
                    method="POST"
                    enctype="multipart/form-data"
                  >
                    <div>
                      <button
                        type="submit"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Log out</button
                      >
                    </div>
                  </form>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Content -->
        <div class="w-full lg:w-3/4 px-4">
          <div class="mb-6 p-6 bg-white rounded-lg shadow">
            <div class="mb-6">
              <h1 class="text-2xl font-bold mb-2">
                Hello, {wow.data.user.name}
              </h1>
              <p class="text-gray-700 mb-4">
                Signed in as: {wow.data.user.email}
              </p>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-bold mb-2">Profile</h3>
              <div
                class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              >
                <div
                  class="bg-blue-600 h-2.5 rounded-full"
                  style="width: 75%;"
                />
              </div>
              <p class="text-right text-sm mt-2">75% Completed</p>
            </div>
            <div>
              <h3 class="text-lg font-bold mb-2">Addresses</h3>
              {#if addresses === undefined || (Array.isArray(addresses) && addresses.length > 0 && "detail" in addresses[0])}
                <p class="text-lg font-semibold text-gray-600">
                  0 Saved Addresses
                </p>
              {:else}
                <div class="space-y-4">
                  {#each addresses as item (item.id)}
                    <div class="p-4 rounded-lg shadow-md bg-white">
                      <p class="text-sm font-medium text-gray-700">
                        <b>Country:</b>
                        {item.country}
                      </p>
                      <p class="text-sm font-medium text-gray-700">
                        <b>Postal Code:</b>
                        {item.postal_code}
                      </p>
                      <p class="text-sm font-medium text-gray-700">
                        <b>City:</b>
                        {item.city}
                      </p>
                      <p class="text-sm font-medium text-gray-700">
                        <b>Address:</b>
                        {item.address}
                      </p>
                      <p class="text-sm font-medium text-gray-700">
                        <b>Country Code:</b>
                        {item.code}
                      </p>
                    </div>
                  {/each}
                </div>
                <form
                  class="space-y-6 mt-3"
                  action="?/deleteAllAddresses"
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <div>
                    <button
                      type="submit"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Delete All Addresses</button
                    >
                  </div>
                </form>
              {/if}

              <button
                type="button"
                on:click={toggleAddressDialog}
                class=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Add address
              </button>
            </div>
          </div>
          <!-- Additional sections can go here -->
        </div>
      </div>
    </div>
    {#if showAddressDialog}
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      >
        <div
          class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
          <div class="mt-3 text-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Add Address
            </h3>
            <div class="mt-2 px-7 py-3">
              <form action="?/addAddress" method="POST">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  class="mt-3 px-4 py-2 border rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  class="mt-3 px-4 py-2 border rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  class="mt-3 px-4 py-2 border rounded-md w-full"
                  required
                />
                <input
                  type="text"
                  name="postal_code"
                  placeholder="Postal Code"
                  class="mt-3 px-4 py-2 border rounded-md w-full"
                  required
                />
                <div class="items-center px-4 py-3">
                  <button
                    id="submit"
                    type="submit"
                    class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </div>
            <div class="items-center px-4 py-3">
              <button
                on:click={toggleAddressDialog}
                class="px-4 py-2 bg-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/if}
</main>
