import { DataSource } from 'typeorm'
import { Session } from './entity/auth.entity'
import { User } from './entity/user.entity'

const mongoProdDS = new DataSource({
  type: 'mongodb',
  url: process.env.MONGOURI,
  useNewUrlParser: true,
  entities: [User, Session],
  synchronize: true,
  logging: false,
  ssl: true,
  authSource: 'admin',
})

const mongoDevDS = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'ehub',
  entities: [User, Session],
  synchronize: true,
  logging: false,
})

const mongoDS = process.env.PROD === 'true' ? mongoProdDS : mongoDevDS

export default mongoDS
