import { CreateUser } from '@/core/types/user'
import { register, OutsideRegister } from './register'
import * as TE from 'fp-ts/TaskEither'
import { pipe } from 'fp-ts/function'

const registerOk: OutsideRegister<string> = async (data) => {
  return `Usuário ${data.username} cadastrado com sucesso!`
}

const data: CreateUser = {
  username: 'john',
  email: 'john@doe.com',
  password: 'john123!',
}

it('Deveria cadastrar um usuário com sucesso', async () => {
  return pipe(
    data,
    register(registerOk),
    TE.map(result => expect(result).toBe(`Usuário ${data.username} cadastrado com sucesso!`)),
  )()
})
