import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const token = pathname.split('/account/verify-token/')[1];
    const sendData = {
        token: token
    }
    console.log('token', sendData);
    try {
        // Send the request to the API endpoint for password reset
        const response = await fetch('http://localhost:9999/api/auth/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        });

        // Handle the response
        if (response.ok) {
            console.log('Account verify successful')
            return {
                props: {
                    is_verified: true
                }
            }
        } else {
            console.log('Account verify failed')
            console.log(response)
            // If the response is not OK, capture the response body for the error message
            // return json({ error: responseBody.detail }, { status: response.status });
            return {
                props: {
                    is_verified: false
                }
            }
        }
    } catch (err) {
        // Catch and handle any errors that occur during the fetch operation
        console.error('Error occurred while requesting password reset:', err);
        return {
            props: {
                is_verified: false
            }
        }
    }
}