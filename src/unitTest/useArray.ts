import { useState } from "react"

interface ArrayResult<A> {
  value: A[],
  clear: () => void,
  removeIndex: (index: number) => void,
  add: (p: A) => void
}

export const useArray = <A>(person: A[]): ArrayResult<A> => {
  const [personState, setPersonState] = useState(person)

  const clear = () => {
    setPersonState([])
  }

  const removeIndex = (index: number) => {
    const list = [...personState]
    list.splice(index, 1)
    setPersonState(list)
  }

  const add = (p: A) => {
    const list = [...personState]
    list.push(p)
    setPersonState(list)
  }

  return { value: personState, clear, removeIndex, add }
}
