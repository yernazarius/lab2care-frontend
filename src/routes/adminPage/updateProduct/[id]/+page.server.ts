import type { PageServerLoad } from './$types';
import  type { Actions } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ fetch, parent, request }) => {
    const parentData = await parent();
    const url = new URL(request.url);
    const pathname = url.pathname;
    const segments = pathname.split('/');
    const updateProductIndex = segments.indexOf('updateProduct');

    let productId = null;
    if (updateProductIndex >= 0 && segments.length > updateProductIndex + 1) {
        productId = segments[updateProductIndex + 1];
    }

    const productResponce = await fetch(`http://localhost:9999/api/product/${productId}`);
    let productData = null;

    if (productResponce.ok) {
        productData = await productResponce.json();
    } else {
        console.error('Failed to fetch categories');
        // Handle error or return an empty list
    }

    const categoriesResponce = await fetch('http://localhost:9999/api/category');
    let categoriesData = null;
    if (categoriesResponce.ok) {
        categoriesData = await categoriesResponce.json();
    } else {
        console.error('Failed to fetch categories');
        // Handle error or return an empty list
    }

    return {
        props: {
            ...parentData.props,
            productData: productData, 
            categoriesData: categoriesData,

        },
    };
};



export const actions: Actions = {
    updateProduct: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const formData = Object.fromEntries(await request.formData());
        console.log("FORM DATA", formData);
        const sentData = {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            quantity: formData.quantity,
            category_id: formData.categoryId,
            image: formData.productImage,
            weigth: formData.weigth,
        };
        console.log("DATA SENT TO SERVER", sentData);
        try {
            // const response = await fetch(`http://localhost:9999/api/sdek/order?name_of_recepient=${formData.name_of_recipient}&phone_of_recepient=${formData.phone_of_recepient}&additional_num=${formData.additional_phone}`, {
            const response = await fetch(`http://localhost:9999/api/product/${formData.productId}`, {
                method: 'PUT',
                body: JSON.stringify(sentData),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`,
                },
            });
            if (response.ok) {
                console.log('Order approving successful');

            } else {
                console.log("DATA SENT TO SERVER", formData);
                console.log(response);
                console.error('Order approving failed');

            }
        } catch (error) {
            console.error('Error occurred while approving order:', error);
        }
    }
};
