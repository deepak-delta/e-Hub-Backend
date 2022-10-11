const smtp = {
  user: 'ufi3onqvikofjtbo@ethereal.email',
  pass: 'YpU266JDPXQscYXVUA',
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
}

const jwtKeys = {
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
  refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
}

export { smtp, jwtKeys }
