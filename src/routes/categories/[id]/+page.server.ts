/** @type {import('./$types').PageServerLoad} */
import { page } from '$app/stores';
import type { Actions } from '@sveltejs/kit';

export async function load({ fetch, params, cookies }) {
    const sessionId = cookies.get('fastapiusersauth');
    console.log("sesstion cookie", sessionId);
    const res = await fetch(`http://localhost:9999/api/product/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `fastapiusersauth=${sessionId};`
        },
    });
    console.log(res);
    const data = await res.json();

    const reviewsResponse = await fetch(`http://localhost:9999/api/review/${params.id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cookie': `fastapiusersauth=${sessionId};`
        },
      });
      const reviews = await reviewsResponse.json();

      const prodTable = await fetch(`http://localhost:9999/api/product_description/get/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const prodTableData = await prodTable.json();
    console.log(prodTableData);


    return {
        props: {
            product: data,
            reviews: reviews,
            prodTable: prodTableData

        }
        
    };
    
}


export const actions: Actions = {
    submitReview: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        console.log("sesstion cookie", sessionId);
        const rawData = Object.fromEntries(await request.formData());
        console.log("raw data", rawData);
        const newReview = {
            rating: rawData.rating,
            comment: rawData.comment,
        };
        console.log("new review", newReview);

        const response = await fetch(
            `http://localhost:9999/api/review/?product_id=${rawData.productId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": `fastapiusersauth=${sessionId};`
                },
                body: JSON.stringify(newReview),
            }
        );

        if (response.ok) {
            const reviewData = await response.json(); // Get the new review data from your API response
            console.log("New review submitted successfully", reviewData);
        
            // Respond to the Svelte action with the newly created review data
            return {
                status: 303, // HTTP status for "See Other"
                headers: {
                    'Location': '.' // Redirect to the current page, triggering SvelteKit to re-render
                },
                props: { newReview: reviewData } // Pass the new review data as props
            };
        } else {
            console.log("Failed to submit new review");
            // Handle error, return a response indicating failure
            return {
                status: response.status, // Reflect the failed HTTP status
                body: {
                    error: 'Failed to submit review'
                }
            };
        }
    }
};
