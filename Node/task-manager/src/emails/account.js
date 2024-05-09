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

const sendCancelationEmail = (email, name) => {
    sgmail.send({
        to: email,
        from: 'abhishek.anand@tothenew.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}