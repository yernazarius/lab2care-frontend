/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, cookies }) {
    try {
        const sessionId = cookies.get('fastapiusersauth');
        const res = await fetch('http://localhost:9999/api/cart/', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Cookie": `fastapiusersauth=${sessionId}`,
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();

        return {
            props: {
                data: data,
            }
        };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        // You can return a specific error message, or handle it as needed
        return {
            props: {
                data: false 
            }
        };
        
    }
}
