
// Task = uma função que retorna uma promise e nunca falha
// Either = utiliza quando tem algo asíncrono que pode falar
// TaskEither = uma função que retorna uma promise, porém pode falhar

import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { CreateUser } from '@/core/types/user'

export type OutsideRegister<A> = (data: CreateUser) => Promise<A>

type Register = <A>(outsideRegister: OutsideRegister<A>) => (data: CreateUser) => TE.TaskEither<Error, A>

export const register: Register = (outsideRegister) => (data) => {
  return pipe(
    // transforma o outsideRegister em um TaskEither
    TE.tryCatch(
      () => outsideRegister(data),
      E.toError,
    ),
  )
}
