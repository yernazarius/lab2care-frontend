import type { PageServerLoad } from './$types';
import { redirect, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch, parent }) => {
    // Retrieve data from the parent load function
    const parentData = await parent();

    // Fetch categories from your API
    const categoryResponse = await fetch('http://localhost:9999/api/parent_category/');
    let categoriesData = [];

    if (categoryResponse.ok) {
        categoriesData = await categoryResponse.json();
    } else {
        console.error('Failed to fetch categories');
        // Handle error or return an empty list
    }

    // Combine parent data with categories and return them together
    return {
        props: {
            ...parentData.props, // Spread existing parent props here
            parentCategories: categoriesData, // Add categories data
        },
    };
};

export const actions: Actions = {
    addChildCatogory: async ({ request, cookies }) => {
        const sessionId = cookies.get('fastapiusersauth');
        const data = Object.fromEntries(await request.formData());
        console.log(data);
        try {
            const response = await fetch('http://localhost:9999/api/category/', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `fastapiusersauth=${sessionId};`
                },
            });
            // console.log(response);
            if (response.ok) {

                console.log('Catogory added successfully');
                throw redirect(308, '/'); // Redirect to some success page or product listing
            } else {
                console.log(response);
                console.error('Failed to add catogory');
                throw new Error('Failed to add catogory');
            }
        } catch (error) {
            console.error('Error occurred while adding catogory:', error);
        }
        throw redirect(307, '/adminPage'); // Fallback redirect
    }
};
