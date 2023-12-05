import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';



export const load: PageServerLoad = async ({ fetch, parent, cookies }) => {
    // Retrieve data from the parent load function
    const parentData = await parent();
    const sessionId = cookies.get('fastapiusersauth');
    // Fetch categories from your API
    const productResponce = await fetch('http://localhost:9999/api/product/');
    let productData = [];

    if (productResponce.ok) {
        productData = await productResponce.json();
    } else {
        console.error('Failed to fetch categories');
        // Handle error or return an empty list
    }

    // Combine parent data with categories and return them together
    return {
        props: {
            ...parentData.props, // Spread existing parent props here
            productData: productData, // Add categories data
            sessionId: sessionId
        },
    };
};
