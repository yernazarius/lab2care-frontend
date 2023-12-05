<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let cartData = data.props.data;
</script>

<div class="container mx-auto p-4">
  {#each cartData as cart}
    <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
      <div class="mb-4">
        <h2 class="text-xl font-semibold">Cart ID: {cart.cart_id}</h2>
        <p>User: {cart.user.name} ({cart.user.email})</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each cart.items as item}
          <div class="bg-gray-100 p-4 rounded-lg">
            <img
              src="/productImages/{item.product.image}"
              alt={item.product.name}
              class="w-full h-48 object-cover rounded-md mb-2"
            />
            <h3 class="text-lg font-semibold">{item.product.name}</h3>
            <p class="text-gray-600">{item.product.description}</p>
            <p class="text-gray-800 font-bold">Price: ${item.product.price}</p>
            <p class="text-sm text-gray-500">Quantity: {item.quantity}</p>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
