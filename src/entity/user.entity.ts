import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  verificationCode: string

  @Column({ default: false })
  verified: boolean
}
