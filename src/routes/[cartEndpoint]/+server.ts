
export async function POST({request, cookies}) {
    const sessionId = cookies.get('fastapiusersauth');
    const requestBody = await request.json();
    const response = await fetch("http://localhost:9999/api/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": `fastapiusersauth=${sessionId}`,
        },
        body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("data",data);
    console.log("response",response);
    return response;
}
