# google-pay-notification-to-monzo

A quick automation I made for myself. Used to help keep your American Express balance in sync with your Monzo balance.

`worker.js` is deployed to CloudFlare Workers (a serverless function). 

## How to use

1. Set up a [IFTTT trigger that listens for Google Pay notifications](https://ifttt.com/connect/android_device/if_notifications) on your phone (only tested on Android).
2. Tell the IFTTT trigger to call a webhook.
3. Deploy `worker.js` somewhere that can be called, I'm using [CloudFlare Workers.](https://workers.cloudflare.com/) Post to from IFTTT. JSON body is: `{"notification": "£0.60 with Amex •••• 1009"}`
4. Create second webhook in IFTTT that calls the Monzo API and moves £n to a pot of your choosing.
5. Ensure `worker.js` calls the second webhook URL.

Now any American Express payments via Google Pay (could be set up to be outside Google Pay, too) will be reflected in your main account balance.

Further - set Amex payments from [Monzo to come out of the same pot to close the loop.](https://monzo.com/help/budgeting-overdrafts-savings/web-bill-pots)
