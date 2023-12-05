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

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const productId = formData.get('productId');
        const sessionId = cookies.get('fastapiusersauth');
    
        try {
            const response = await fetch(`http://localhost:9999/api/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Cookie': `fastapiusersauth=${sessionId};`
            },
            });
    
            if (response.ok) {
            console.log('Product deleted successfully');
            // Handle successful deletion, maybe by sending a redirect or updating the local state
            } else {
                console.log(response);
            console.error('Failed to delete product');
            // Handle error, maybe by sending back an error message
            }
        } catch (error) {
            console.error('Error occurred while deleting product:', error);
        }
    }
};