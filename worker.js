async function readRequestBody(request) {
    return await request.json()
}

async function readResponseBody(response) {
    return await request.body
}

function isAmex(input) {
    return input.toLowerCase().includes("amex");
}

// Assumes a Google pay Android notification string
function parseNotification(input) {
    const amountWithCurrency = (input.split(' '))[0]
    const amountWithoutCurrency = amountWithCurrency.replace(/[^\d.-]/g, '');
    return amountWithoutCurrency
}

async function handleRequest(request) {
    const reqBody = await readRequestBody(request);
    const notificationString = reqBody.notification;

    if (!isAmex(notificationString)) {
        return false;
    }

    const amount = parseNotification(notificationString);

    const monzoResponse = await fetch(MONZO_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({"value1": amount}),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })

    return new Response('OK');
}

addEventListener("fetch", event => {
    return event.respondWith(handleRequest(event.request))
})
