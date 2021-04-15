import React, { useEffect, useRef, useState } from "react"
import * as auth from "auth-provider"
import { User } from "screens/project-list/index.d"
import { http } from "util/http"
import { useAsync } from "util/use-async"
import { FullPageLoading, FullPageError } from "components/lib"

interface AuthForm {
  username: string
  password: string
}

interface AuthProvideImpl {
  user: User | null
  login: (form: AuthForm) => Promise<void>
  register: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthProvideImpl | undefined>(undefined)
AuthContext.displayName = "AuthContext"

const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http("me", { token })
    user = data.user
  }
  return user
}

/**
 * 登录功能Context
 * @param {*} 内部标签
 * @returns 包含内部标签的Context.Provider
 * @description Context.Provider props中携带的参数：
 *  user 登录用户信息
 *  login 用户登录方法
 *  register 用户注册方法
 *  logout 用户登出方法
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  const {
    run,
    isIdle,
    isLoading,
    isError,
    asyncState,
  } = useAsync<User | null>()
  const promise = useRef(run)
  useEffect(() => {
    promise.current(bootstrapUser()).then((res) => {
      setUser(res)
    })
  }, [])

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageError error={asyncState.error} />
  }
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
/**
 * 获取用户登录功能的Context数据对象
 * @returns 用户登录功能的Context数据对象
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAutn必须在AuthProvider中使用")
  }
  return context
}
