async function readRequestBody(request) {
    return await request.json()
}

async function readResponseBody(response) {
    return await request.body
}

// Assumes an Amex notification string
function parseNotification(input) {
    const chargeStatement = input.split('£')[1]
    const amount = chargeStatement.split(' ')[0]
    return amount;
}

async function handleRequest(request) {
    const reqBody = await readRequestBody(request);
    const notificationString = reqBody.notification;

    const amount = parseNotification(notificationString);
    console.log(amount);

    await fetch("MONZO_URL", {
        method: "POST",
        body: JSON.stringify({"value1": amount}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return new Response(amount);
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})
