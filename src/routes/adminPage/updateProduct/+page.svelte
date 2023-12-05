<script lang="ts">
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";

  export let data: any;

  // Create a writable store for product data for reactivity
  const productData = writable(data.props.productData);
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
  <h2 class="mt-10 text-center text-3xl font-extrabold text-gray-900">
    Update Product
  </h2>
</div>

<div class="max-w-2xl mx-auto px-4 min-h-[800px]">
  {#each $productData as product (product.id)}
    <div class="bg-white rounded-lg shadow-md overflow-hidden flex mb-4 mt-8">
      <img
        src={`/productImages/${product.image}`}
        alt={product.name}
        class="w-48 h-48 object-cover"
      />
      <div class="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 class="text-lg font-bold">{product.name}</h3>
          <p class="text-gray-600 text-sm">{product.description}</p>
          <p class="text-sm font-semibold text-gray-800">${product.price}</p>
        </div>
        <a
          href={`/adminPage/updateProduct/${product.id}`}
          type="button"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300 mt-4 self-end"
        >
          Update
        </a>
      </div>
    </div>
  {/each}
</div>
