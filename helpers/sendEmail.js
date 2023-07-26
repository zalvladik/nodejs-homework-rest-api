import sgMail from '@sendgrid/mail'

const {SEND_GRID_API_KEY} = process.env

sgMail.setApiKey(SEND_GRID_API_KEY)

const sendEmail = async(data) => {
    const email = {...data, from: "zalipkav@ukr.net"}
    await sgMail.send(email)
    return true
}

export default sendEmail