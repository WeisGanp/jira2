import { User } from "screens/project-list/index.d"
import { http } from "util/http"

const localStorageKey = '__auth_provider_token__'
/**
 * 获取用户token
 * @returns {*} 已登陆用户的token
 */
export const getToken = () => window.localStorage.getItem(localStorageKey)

/**
 * 将用户token使用localStorage进行本地缓存
 * @param '{ user }' user用户信息
 * @returns user用户信息
 */
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

/**
 * 用户登录接口
 * @param data 包含username password
 * @returns 登录用户信息
 */
export const login = async (data: { username: string; password: string }) => {
  return http('login', {
    data,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
  }).then((response) => {
    return handleUserResponse(response)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

/**
 * 用户注册接口
 * @param data 包含username password 
 * @returns 注册用户信息
 */
export const register = (data: { username: string; password: string }) => {
  return http('register', {
    data,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST"
  }).then((response) => {
    return handleUserResponse(response)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

/**
 * 用户登出接口
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => window.localStorage.removeItem(localStorageKey)
