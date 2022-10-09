import { DataSource } from 'typeorm'
import { User } from './entity/user.entity'

const sqlDS = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'ehub',
  entities: [User],
  synchronize: true,
  logging: false,
})

export default sqlDS
