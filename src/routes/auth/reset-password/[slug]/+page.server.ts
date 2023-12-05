import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { error, json, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = () => {

}

export const actions: Actions = {
    setNewPassword: async ({ request }) => {
        // Extract the form data from the request
        const formData = Object.fromEntries(await request.formData());
        // const email = formData.get('email');
        console.log('formData', formData);
        // Check if the email is provided
        if (!formData) {
            return json({ error: 'Email is required' }, { status: 400 });
        }
        const data = {
            password: formData.password,
            token: formData.token,
        }
        console.log('data', data);
        try {
            // Send the request to the API endpoint for password reset
            const response = await fetch('http://localhost:9999/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // Handle the response
            if (response.ok) {
                console.log('Password reset request successful')
                // If the response is OK, return a success message
                // return json({ message: 'Please check your email to reset your password' });
            } else {
                console.log('Password reset request failed')
                console.log(response)
                // If the response is not OK, capture the response body for the error message
                // return json({ error: responseBody.detail }, { status: response.status });
            }
        } catch (err) {
            // Catch and handle any errors that occur during the fetch operation
            console.error('Error occurred while requesting password reset:', err);
            throw error(500, 'An unexpected error occurred');
        }
        throw redirect(307, "/auth/login/")
    },
};
