<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let productData = data.props.productData;
  console.log("productData:", productData);
</script>

<div class="container mx-auto p-4">
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each productData as product}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          class="w-full h-64 object-cover"
          src={`/productImages/${product.image}`}
          alt="test product 2"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold">{product.name}</h2>
          <div>
            <p class="text-gray-600">{product.description}</p>
          </div>

          <div class="flex justify-between items-center mt-4">
            <span class="text-xl font-bold">${product.price}</span>
            {#if product.quantity == 0}
              <span
                class="bg-red-200 text-red-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >Out of Stock -
                <b>{product.quantity}</b>
              </span>
            {:else if product.quantity < 10}
              <span
                class="bg-yellow-200 text-yellow-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >Amount is low -
                <b>{product.quantity}</b>
              </span>
            {:else}
              <span
                class="bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
                >In Stock -
                <b>{product.quantity}</b>
              </span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
