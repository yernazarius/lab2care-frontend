import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({fetch, cookies, parent}) => {
    const sessionId = cookies.get('fastapiusersauth');
    const parentData = await parent();
    
    const addressResponse = await fetch('http://localhost:9999/api/address/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `fastapiusersauth=${sessionId};`
        }
    });
    let addressData = [];

    addressData = [await addressResponse.json()];
    console.log(addressResponse);
    if (addressResponse.ok) {
        console.log('Address data fetched');
        console.log(addressData);
        // Handle success
    } else {
        console.error('Failed to fetch address data');
        // Handle error or return an empty list
    }

    // Combine parent data with categories and return them together
    return {
        props: {
            ...parentData.props, // Spread existing parent props here
            addresses: addressData, // Add categories data
        },
    };
}

export const actions: Actions = {
    logout: async ({ cookies }) => {
        console.log('Logging out');
        cookies.set('fastapiusersauth', '', {
            httpOnly: false,
            maxAge: 0,  // Instantly expire the cookie
            path: '/',
            sameSite: 'none',
            secure: true
        });
        throw redirect(307, '/');  // Redirect to home after logout
    },
    deleteAllAddresses: async ({ cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        try {
            const response = await fetch('http://localhost:9999/api/address', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`
                }
            });
            if (response.ok) {
                console.log('Address deleted');
            }
            else {  
                console.log(response);
                console.error('Address not deleted');
            }
            
        } catch (error) {
            console.error(error);
        }// Redirect to home after logout

    },
    addAddress: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const data = Object.fromEntries(await request.formData());
        try {
            const response = await fetch('http://localhost:9999/api/address', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`
                }
            });
            if (response.ok) {
                console.log('Address added');
            }
            else {
                console.log(response);
                console.error('Address not added');
            }
            
        } catch (error) {
            console.error(error);
        }
    },
    verifyAccount: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const data = Object.fromEntries(await request.formData());
        try {
            const response = await fetch('http://localhost:9999/api/auth/request-verify-token', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`
                }
            });
            if (response.ok) {
                console.log('Verify token is send to your email');
                return {
                    props: {
                        verificationStatus: response.ok ? 'success' : 'failure',
                        errorMessage: "evetything is ok"
                    }
                };
            }
            else {
                console.log(response);
                console.error('Verify token is not send to your email');
            }
            
        } catch (error) {
            console.error(error);
        }
    },
};
