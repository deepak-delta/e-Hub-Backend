import { DataSource } from 'typeorm'
import { User } from './entity/user.entity'

const sqlDS = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://delta4241:delta4241@cluster0.hmoxw.mongodb.net/ehub?retryWrites=true&w=majority',
  useNewUrlParser: true,
  // port: 27017,
  // username: 'delta4241',
  // password: 'delta4241',
  // database: 'ehub',
  entities: [User],
  synchronize: true,
  logging: false,
  ssl: true,
  authSource: 'admin',
})

export default sqlDS
