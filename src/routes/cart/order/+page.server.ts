import { redirect } from '@sveltejs/kit';

export const actions = {
    createOrder: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const formData = Object.fromEntries(await request.formData());
        try {
            const response = await fetch(`http://localhost:9999/api/sdek/order?name_of_recepient=${formData.name_of_recipient}&phone_of_recepient=${formData.phone_of_recepient}&additional_num=${formData.additional_phone}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`,
                },
            });

            if (response.ok) {
                console.log('Order creation successful');

            } else {
                console.log(response);
                console.error('Order creation failed');

            }
        } catch (error) {
            console.error('Error occurred while creating order:', error);
        }
        throw redirect(302, '/');
    }
};
