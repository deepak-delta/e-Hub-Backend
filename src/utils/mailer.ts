import nodemailer, { SendMailOptions } from 'nodemailer'
import { smtp } from '../config'

// const createTestCreds = async () => {
//   const creds = await nodemailer.createTestAccount()
//   console.log(creds)
// }

// createTestCreds()

const transporter = nodemailer.createTransport({
  ...smtp,
  auth: { user: smtp.user, pass: smtp.pass },
})
const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, 'Error sending email')
      return
    }

    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
}

export default sendEmail
