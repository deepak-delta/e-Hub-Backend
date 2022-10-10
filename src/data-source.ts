import { DataSource } from 'typeorm'
import { User } from './entity/user.entity'

const sqlDS = new DataSource({
  type: 'mongodb',
  url: process.env.MONGOURI,
  useNewUrlParser: true,
  entities: [User],
  synchronize: true,
  logging: false,
  ssl: true,
  authSource: 'admin',
})

export default sqlDS
