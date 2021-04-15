import { useState } from "react"

interface State<D> {
  error: Error | null,
  data?: D | null,
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle'
}

/**
 * 维护项目列表加载状态信息
 * @param initialState 初始加载状态
 * @returns {*} isIdle,isLoading,isError,isSuccess,setData,setError,run,asyncState
 */
export const useAsync = <D>(initialState?: State<D>) => {
  const [asyncState, setAsyncState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })
  type useData = D | null

  /**
   * 成功时的修改加载状态状态函数
   * @param promise 
   * @returns 
   */
  const setData = (data: useData) => {
    setAsyncState({
      error: null,
      data,
      stat: 'success'
    })
  }
  /**
   * 失败时的修改加载状态状态函数
   * @param promise 
   * @returns 
   */
  const setError = (error: Error | null) => {
    setAsyncState({
      error,
      data: null,
      stat: 'error'
    })
  }
  /**
   * 项目列表加载过程中时修改加载状态状态函数
   * @param promise 
   * @returns 
   */
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('传入参数必须为Promise类型')
    }
    // 开始加载设置状态为loading
    setAsyncState((provState) => (
      {
        error: null,
        data: provState.data,
        stat: 'loading'
      }
    ))
    return promise.then(data => {
      // 请求完成设置状态为success
      setData(data)
      return data
    }).catch(error => {
      // 请求失败设置状态为error
      setError(error)
      return Promise.reject(error)
    })
  }

  return {
    isIdle: asyncState.stat === 'idle',
    isLoading: asyncState.stat === 'loading',
    isError: asyncState.stat === 'error',
    isSuccess: asyncState.stat === 'success',
    setData,
    setError,
    run,
    asyncState
  }
}