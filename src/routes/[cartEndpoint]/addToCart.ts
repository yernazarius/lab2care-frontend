
// export async function POST({request, cookies}) {
//     const sessionId = cookies.get('fastapiusersauth');

//     const response = await fetch("http://localhost:9999/api/cart", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Cookie": `fastapiusersauth=${sessionId}`,
//         },
//         body: JSON.stringify(request.body),
//     });

//     const data = await response.json();
//     return response;
// }
