import qs from 'qs'
import { logout } from 'auth-provider'
import { useAuth } from 'context/auth-context'

const baseUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string,
  data?: object
}

/**
 * http请求接口
 * @param endpoint 请求后置url
 * @param param 请求配置参数对象{ data, token, headers, ...customCofig }
 * @returns 相应数据的Promise
 */
export const http = async (endpoint: string, { data, token, headers, ...customCofig }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customCofig
  }

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return window.fetch(`${baseUrl}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      await logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

/**
 * 该函数生成带用户token的HTTP请求函数对象
 * @returns 带用户token的HTTP请求函数对象
 */
export const useHttp = <T>() => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>): Promise<T> => http(endpoint, { ...config, token: user?.token })
}
