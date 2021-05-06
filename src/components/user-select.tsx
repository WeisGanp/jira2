import React from "react"
import { IdSelect } from "components/id-select"
import { useUsers } from "util/user"

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const users = useUsers()
  return <IdSelect options={users} {...props}></IdSelect>
}
