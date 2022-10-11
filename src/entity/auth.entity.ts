import {
  Entity,
  Column,
  ObjectIdColumn,
  PrimaryColumn,
  Timestamp,
} from 'typeorm'

@Entity()
export class Session {
  @ObjectIdColumn()
  _id: string

  @PrimaryColumn()
  sessionId: string

  @Column()
  userId: string

  @Column()
  valid: boolean
}
