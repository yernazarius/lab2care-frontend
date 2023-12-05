<script lang="ts">
  import { enhance } from "$app/forms";

  import type { PageData } from "./$types";

  export let data;

  let openDialogForOrderId: any = true;
  let showAddressDialog = false;

  function toggleDialog(orderId: any) {
    showAddressDialog = !showAddressDialog;
    openDialogForOrderId = openDialogForOrderId === orderId ? null : orderId;
  }
</script>

<div class="p-4 container mx-auto">
  {#each data.props.sdekOrders.data as orderRequest}
    <div class="bg-white shadow-lg rounded-lg p-6 mb-4 mx-5">
      <div class="text-lg font-bold mb-2">
        Order #{orderRequest.order_request.id}
      </div>
      <div class="text-sm mb-4 text-black">
        <p>Recipient: {orderRequest.order_request.name_of_recipient}</p>
        <p>Phone: {orderRequest.order_request.phone_of_recipient}</p>
        <p>Additional Number: {orderRequest.order_request.additional_num}</p>
        <p>Address ID: {orderRequest.order_request.address_id}</p>
        <p>Order Weight: {orderRequest.order_request.order_weigth}g</p>
        <p
          style="color: {orderRequest.order_request.order_status === 'approved'
            ? 'green'
            : orderRequest.order_request.order_status === 'pending'
            ? 'red'
            : 'inherit'}"
        >
          Status: {orderRequest.order_request.order_status}
        </p>
      </div>
      <div class="font-medium">Products:</div>
      <ul class="list-disc pl-6">
        {#each orderRequest.products as product}
          <li>
            Product ID {product.product_id}, Quantity: {product.quantity}
            <a
              class="text-blue-900 underline"
              href="/categories/{product.product_id}">product Link</a
            >
          </li>
        {/each}
      </ul>
      <button
        class="mt-3 text-gray-500 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        on:click={() => toggleDialog(orderRequest.order_request.id)}
      >
        Approve
      </button>

      <!-- Dialog -->
      {#if openDialogForOrderId === orderRequest.order_request.id && showAddressDialog}
        <div
          class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        >
          <div
            class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
          >
            <div class="mt-3 text-center">
              <form use:enhance method="POST" action="?/approveOrder">
                <div class="text-lg font-bold mb-2">
                  Approve Order #{orderRequest.order_request.id}
                </div>
                <div class="mt-2 px-7 py-3">
                  <input
                    type="hidden"
                    value={orderRequest.order_request.id}
                    placeholder="Input 1"
                    class="mb-3 p-2 w-full border rounded"
                    name="order_request_id"
                  />
                  <div class="mt-6">
                    <div class="flex flex-col space-y-4">
                      <div>
                        <label
                          for="length"
                          class="block text-sm font-medium text-gray-700"
                          >Length</label
                        >
                        <input
                          type="number"
                          id="length"
                          name="length_input"
                          min="0"
                          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter length"
                        />
                      </div>

                      <div>
                        <label
                          for="width"
                          class="block text-sm font-medium text-gray-700"
                          >Width</label
                        >
                        <input
                          type="number"
                          id="width"
                          name="width_input"
                          min="0"
                          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter width"
                        />
                      </div>

                      <div>
                        <label
                          for="height"
                          class="block text-sm font-medium text-gray-700"
                          >Height</label
                        >
                        <input
                          type="number"
                          id="height"
                          name="height_input"
                          min="0"
                          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Enter height"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="items-center px-4 py-3">
                  <button
                    type="submit"
                    id="submit"
                    class="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700"
                  >
                    Confirm
                  </button>
                </div>
              </form>
              <div class="items-center px-4 py-3">
                <button
                  class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700"
                  on:click={() => toggleDialog(orderRequest.order_request.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>
