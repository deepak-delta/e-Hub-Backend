import sqlDS from '../data-source'
import { User } from '../entity/user.entity'

const userRepository = sqlDS.getRepository(User)
const createUser = async (userData: any) => {
  await userRepository.save(userData)
  console.log('User has been saved')

  return userData
}

const updateUser = async (user: User) => {
  await userRepository.save(user)
}

const findUserById = async (id: string) => {
  const user = await userRepository.findOneBy({
    id: +id,
  })

  return user
}
export { createUser, findUserById, updateUser }
