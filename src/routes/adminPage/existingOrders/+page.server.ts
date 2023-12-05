import type { PageServerLoad } from './$types';
import  type { Actions } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ fetch, parent }) => {
    const parentData = await parent();
    const sdekOrdersFetch = await fetch('http://localhost:9999/api/sdek/admin/orders');
    let sdekOrdersData = [];

    if (sdekOrdersFetch.ok) {
        sdekOrdersData = await sdekOrdersFetch.json();
        console.log('Fetched succesfully', sdekOrdersData.data);
    } else {
        console.error('Failed to fetch categories');
    }
    return {
        props: {
            ...parentData.props, 
            sdekOrders: sdekOrdersData, 
        },
    };
};


export const actions: Actions = {
    approveOrder: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const formData = Object.fromEntries(await request.formData());
        try {
            // const response = await fetch(`http://localhost:9999/api/sdek/order?name_of_recepient=${formData.name_of_recipient}&phone_of_recepient=${formData.phone_of_recepient}&additional_num=${formData.additional_phone}`, {
            const response = await fetch(`http://localhost:9999/api/sdek/admin/orders/${formData.order_request_id}/approve?length=${formData.length_input}&heigth=${formData.height_input}&width=${formData.width_input}`, {
                method: 'PUT',
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
