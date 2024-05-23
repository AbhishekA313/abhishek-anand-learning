const sgmail = require('@sendgrid/mail');

sgmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'abhishek.anand@tothenew.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
}

const sendUpdateEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'abhishek.anand@tothenew.com',
        subject: 'Updated email address',
        text: `Hi ${name},
            Your email address has been updated, please verify by clicking on below link.
            This link will be expire after 10 minutes.
            <button type="button">Verify Email</button>
        `
    });
}

const sendPlaceOrderEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'abhishek.anand@tothenew.com',
        subject: 'Thanks for order placing!',
        text: `Hi ${name},
            <p>Your order has been placed, you can download invoice from your my account page by clicking on view order button.</p>
        `
    });
}

module.exports = {
    sendWelcomeEmail,
    sendUpdateEmail,
    sendPlaceOrderEmail
}