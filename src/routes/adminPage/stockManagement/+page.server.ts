import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ fetch, parent, cookies }) => {
    const parentData = await parent();
    const sessionId = cookies.get('fastapiusersauth');
    const productResponce = await fetch('http://localhost:9999/api/product/');
    let productData = [];
    if (productResponce.ok) {
        productData = await productResponce.json();
    } else {
        console.error('Failed to fetch products quantity data');
    }
    return {
        props: {
            ...parentData.props, // Spread existing parent props here
            productData: productData, // Add categories data
        },
    };
};
