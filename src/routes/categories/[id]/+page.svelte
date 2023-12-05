<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";

  // Assuming data is already populated with 'product' and 'reviews' when the page is loaded
  export let data;
  let wow = data.props.product;
  let prod_table = data.props.prodTable;
  console.log(prod_table);
  let reviews = data.props.reviews; // Initialized with existing reviews

  let newReview = {
    rating: 5, // Default rating value
    comment: "", // Empty string for new comment
  };

  function imageNameWithoutExtension(image: string): string {
    return image.replace(/\.[^/.]+$/, "");
  }
  // Function to submit a new review
  async function submitReview() {
    const response = await fetch(
      `http://localhost:9999/api/review/?product_id=${wow.id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      }
    );

    if (response.ok) {
      const review = await response.json();
      reviews = [...reviews, review]; // Add new review to existing list
      newReview.comment = ""; // Reset comment for new input
      // Optionally, reset rating to default or keep user selection
      // newReview.rating = 5;
    } else {
      // Handle error, alert user
      alert("Failed to submit review. Please try again.");
    }
  }

  // Optionally fetch reviews when component is mounted or when product id changes
  onMount(async () => {
    // Fetch and update reviews list
    const reviewResponse = await fetch(
      `http://localhost:9999/api/review/${wow.id}`
    );
    reviews = await reviewResponse.json();
  });
</script>

<section class="py-10 font-poppins">
  <div class="max-w-6xl px-4 mx-auto">
    <div class="flex flex-wrap mb-24 -mx-4">
      <div class="w-full px-4 mb-8 md:w-1/2 md:mb-0">
        <div class="sticky top-0 overflow-hidden">
          <div class="relative mb-6 lg:mb-10 lg:h-max">
            <img
              class="object-contain w-full lg:h-full productImage"
              src="/productImages/{wow.image}"
              alt={wow.name}
              style:--planet="image-{imageNameWithoutExtension(wow.image)}"
            />
          </div>
        </div>
      </div>
      <div class="w-full px-4 md:w-1/2">
        <div class="lg:pl-20">
          <div class="mb-6">
            <span
              class="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 rounded-xl"
              >New Arrival</span
            >
            <h2
              class="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl"
            >
              {wow.name}
            </h2>
            <div class="flex flex-wrap items-center mb-6">
              <div class="text-yellow-500 flex">
                {#each Array(5) as _, index (index)}
                  <span class="text-lg">
                    {index < wow.rating ? "★" : "☆"}
                  </span>
                {/each}
              </div>
              <a
                class="mb-4 text-xs underline hover:text-blue-600 lg:mb-0"
                href="#"
              >
                View the acer store
              </a>
            </div>
            <p class="inline-block text-2xl font-semibold text-gray-700">
              Price:
              <span>{wow.price}</span>
            </p>
          </div>
          <div class="mb-6">
            <h2 class="mb-2 text-lg font-bold text-gray-700">System Specs :</h2>
            <div class="bg-gray-100 rounded-xl">
              <div class="p-3 lg:p-5">
                <div class="p-2 rounded-xl lg:p-6 bg-gray-50">
                  <div class="flex flex-col gap-4">
                    {#each prod_table as index}
                      <div
                        class="flex flex-wrap justify-center gap-x-10 gap-y-4"
                      >
                        <div class="w-full mb-4 lg:mb-0 md:w-2/5">
                          <div class="flex">
                            <span class="mr-3 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="w-7 h-7 bi bi-cpu"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0zm-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3h-7zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
                                />
                              </svg>
                            </span>
                            <div>
                              <h2 class="text-base font-semibold text-gray-700">
                                {index.title}
                              </h2>
                            </div>
                          </div>
                        </div>
                        <div class="w-full mb-4 lg:mb-0 md:w-2/5">
                          <div class="flex">
                            <span class="mr-3 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-clock-history w-7 h-7"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"
                                />
                                <path
                                  d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"
                                />
                                <path
                                  d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"
                                />
                              </svg>
                            </span>
                            <div>
                              <h2 class="text-base font-semibold text-gray-700">
                                {index.description}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    {/each}
                  </div>
                  <div class="mt-4 w-max">
                    <h5>Context:</h5>
                    <p class="mb-2 text-sm font-medium text-gray-500">
                      {wow.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="py-6 mb-6 border-t border-b border-gray-200">
            <span class="text-base text-gray-600">In Stock</span>
            <p class="mt-2 text-sm text-blue-500">
              Ships from china.
              <span class="text-gray-600">
                Most customers receive within 3-31 days.
              </span>
            </p>
          </div>
          <div class="mb-6" />
          <div class="flex flex-wrap items-center mb-6">
            <div class="mb-4 mr-4 lg:mb-0">
              <div class="w-28">
                <div
                  class="relative flex flex-row w-full h-10 bg-transparent rounded-lg"
                >
                  <button
                    class="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-300"
                  >
                    <span class="m-auto text-2xl font-thin">-</span>
                  </button>
                  <input
                    type="number"
                    class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
                    placeholder="1"
                  />
                  <button
                    class="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer d hover:text-gray-700 hover:bg-gray-300"
                  >
                    <span class="m-auto text-2xl font-thin">+</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mb-4 lg:mb-0">
              <button
                class="flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 hover:bg-blue-600 hover:border-blue-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class=" bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
              </button>
            </div>
            <a
              href="#"
              class="w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl"
            >
              Add to cart
            </a>
          </div>
          <div class="flex gap-4 mb-6">
            <a
              href="#"
              class="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 rounded-xl"
            >
              Buy now</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Display reviews -->
{#each reviews as review}
  <div class="bg-white shadow-lg rounded-lg p-4 max-w-4xl mx-auto mb-10">
    <div class="flex items-center justify-between">
      <h5 class="text-lg font-bold">{review.name_of_user}</h5>
      <span class="text-sm text-gray-500"
        >{new Date(review.created_at).toLocaleDateString()}</span
      >
    </div>
    <div class="border-t border-gray-200 mt-2 pt-2">
      <p class="text-gray-800">{review.comment}</p>
      <div class="flex items-center mt-2">
        <div class="text-yellow-500 flex">
          {#each Array(5) as _, index (index)}
            <span class="text-lg">
              {index < review.rating ? "★" : "☆"}
            </span>
          {/each}
        </div>
        <span class="ml-2 text-gray-600 text-sm">Rating: {review.rating}</span>
      </div>
    </div>
  </div>
{/each}

<form action="?/submitReview" method="post" class=" max-w-4xl mx-auto mb-10">
  <input type="hidden" name="productId" value={wow.id} />

  <div class="mb-4">
    <label for="rating" class="block mb-2 text-sm font-medium text-gray-700"
      >Rating</label
    >
    <select
      bind:value={newReview.rating}
      id="rating"
      name="rating"
      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    >
      <option value="5">5 - Excellent</option>
      <option value="4">4 - Very Good</option>
      <option value="3">3 - Good</option>
      <option value="2">2 - Fair</option>
      <option value="1">1 - Poor</option>
    </select>
  </div>
  <div class="mb-4">
    <label for="comment" class="block mb-2 text-sm font-medium text-gray-700"
      >Your Review</label
    >
    <textarea
      bind:value={newReview.comment}
      id="comment"
      rows="5"
      name="comment"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      placeholder="Write your review here..."
    />
  </div>
  <div class="flex items-center justify-between">
    <button
      type="submit"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Submit Review
    </button>
  </div>
</form>

<style>
  .productImage {
    view-transition-name: var(--planet);
  }
</style>
