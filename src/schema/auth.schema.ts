import { object, string, TypeOf } from 'zod'

export const createLoginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email(),
    password: string({
      required_error: 'Password is required',
    }).min(8, 'Invalid email or password'),
  }),
})

export type createLoginInput = TypeOf<typeof createLoginSchema>['body']
