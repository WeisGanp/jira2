import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams, } from 'react-router-dom'
import { clearObject } from 'util/index'

/**
 * 生成url上参数的响应式对象及修改函数
 * @param keys 参数的key数组
 * @returns 
 */
export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(
      () => keys.reduce((previousValue: { [currentValue in K]: string }, currentValue: K) => {
        return { ...previousValue, [currentValue]: searchParams.get(currentValue) || '' }
      }, {} as { [currentValue in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = clearObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}