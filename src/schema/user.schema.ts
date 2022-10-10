import { object, string, TypeOf } from 'zod'

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }),

    lastName: string({
      required_error: 'Last name is required',
    }),

    password: string({
      required_error: 'Password is required',
    }).min(8, 'Password is too short'),

    confirmPassword: string({
      required_error: 'Confirm password is required',
    }),

    email: string({
      required_error: 'email is required',
    }).email('Not a valid email'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Password do not match',
  }),
})

export const verifyUserSchema = object({
  params: object({
    id: string(),
    verificationCode: string(),
  }),
})

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
})

export type createUserInput = TypeOf<typeof createUserSchema>['body']
export type verifyUserInput = TypeOf<typeof verifyUserSchema>['params']
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body']
