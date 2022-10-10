import { Entity, Column, ObjectIdColumn, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  confirmPassword: string

  @Column()
  verificationCode: string

  @Column({ default: true })
  verified: boolean

  @Column({ default: 'test' })
  passwordResetCode: string
}
