# amex-monzo-sync

A quick automation I made for myself. Keeps your American Express balance in sync with your Monzo balance.

A watcher will detect notifications from the Amex app for Android. Notifications are parsed to get the £value of the amount spent, which is then added to a pot, and deducted from the main Monzo account balance.

`worker.js` is deployed to CloudFlare Workers (a serverless function). 

## How to use

1. Set up a [IFTTT trigger that listens for Amex notifications](https://ifttt.com/connect/android_device/if_notifications) on your phone (only tested on Android).
2. Tell the IFTTT trigger to call a webhook.
3. Deploy `worker.js` somewhere that can be called, I'm using [CloudFlare Workers.](https://workers.cloudflare.com/) Post to from IFTTT. JSON should be something like: `{"value1": "You have a £0.60 charge on your Amex Card"}`.
4. Create second webhook in IFTTT that calls the Monzo API and moves £n to a pot of your choosing.
5. Ensure `worker.js` calls the second webhook URL.

Now any American Express payments will be reflected in your main account balance.

Further - set Amex payments from [Monzo to come out of the same pot to close the loop.](https://monzo.com/help/budgeting-overdrafts-savings/web-bill-pots)

***

![notification](https://github.com/amaitu/amex-monzo-sync/blob/main/screenshots/notification.jpg)

![monzo](https://github.com/amaitu/amex-monzo-sync/blob/main/screenshots/monzo.jpeg)
