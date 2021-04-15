import React from "react"
import { useArray } from "./useArray"
import { Person } from "./index.d"

const UserArray = () => {
  const person: Person[] = [
    { name: "jack", age: 24 },
    { name: "ma", age: 24 },
  ]

  const { value, clear, removeIndex, add } = useArray(person)

  return (
    <div>
      <button onClick={() => add({ name: "jhon", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove one</button>
      <button
        onClick={() => {
          clear()
        }}
      >
        clear
      </button>
      {value.map((person: Person, index: number) => (
        <div>
          <span style={{ color: "red" }}>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  )
}
export default UserArray
