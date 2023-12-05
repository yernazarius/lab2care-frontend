<script lang="ts">
  import { browser } from "$app/environment";
  import { writable } from "svelte/store";

  export let data: any;

  // Create a writable store for product data for reactivity
  const productData = writable(data.props.productData);
  let isDeleting = false;

  const handleDelete = async (productId: number) => {
    // Check if we are in the browser
    if (!browser) return;

    // Confirm with the user before deleting
    if (!confirm("Are you sure you want to delete this product?")) return;

    isDeleting = true;

    const formData = new FormData();
    formData.append("productId", productId.toString());

    try {
      const res = await fetch(window.location.href, {
        method: "POST",
        body: formData,
        // No need to set headers as cookies are handled automatically
      });

      if (res.ok) {
        // Remove the product from the productData store
        productData.update((currentProducts) => {
          return currentProducts.filter((p: any) => p.id !== productId);
        });
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete the product");
      }
    } catch (error) {
      alert("Error deleting the product");
      console.error("Error deleting the product:", error);
    } finally {
      isDeleting = false;
    }
  };
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
  <h2 class="mt-10 text-center text-3xl font-extrabold text-gray-900">
    Delete Product
  </h2>
</div>

<div class="max-w-2xl mx-auto px-4 min-h-[800px]">
  {#if isDeleting}
    <p class="text-center">Deleting product...</p>
  {/if}

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
        <button
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300 mt-4 self-end"
          on:click={() => handleDelete(product.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  {/each}
</div>
