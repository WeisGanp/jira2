import { useEffect, useRef, useState } from 'react'
import { User } from "screens/project-list/index.d"
import { clearObject } from 'util/index'
import { useHttp } from "util/http"

/**
 * 生成用户选择下拉列表数据对象，只在componentDidMount时调用一次
 * @param param 
 * @returns 
 */
export const useUsers = (param?: Partial<User>) => {
  const [users, setUsers] = useState<User[]>([])
  const client = useRef(useHttp<User[]>())
  const p = useRef(param)
  useEffect(() => {
    client.current("users", { data: clearObject(p.current || {}) }).then(setUsers)
  }, [])
  return users
}