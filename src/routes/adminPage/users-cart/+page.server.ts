/** @type {import('./$types').PageServerLoad} */

export async function load({ fetch, cookies }) {
    const res = await fetch('http://localhost:9999/api/cart/get_all', {
        method: 'GET'
    });
    
    const data = await res.json();
    console.log(data);
    return {
        props: {
            data: data,
        }
        
    };
}