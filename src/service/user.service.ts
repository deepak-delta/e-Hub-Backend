import sqlDS from '../data-source'
import { User } from '../entity/user.entity'

const createUser = async (userData: any) => {
  const userRepository = sqlDS.getRepository(User)

  await userRepository.save(userData)
  console.log('User has been saved')

  return userData
}

export default createUser
