import { useEffect, useRef, useState } from "react"
/**
 * 判断入参是否为false
 * @param value 
 * @returns boolean
 */
export const isFalsy = (value: unknown): boolean => (value === 0 ? false : !value)
/**
 * 判断传入参数是否为有效值（不为 '' | null | undefined）
 * @param value 
 * @returns 
 */
export const isVoid = (value: unknown) => value === '' || value === null || value === undefined

/**
 * 清除传入对象的空值属性
 * @param obj 
 * @returns 
 */
export const clearObject = (obj: { [prop: string]: unknown }) => {
  const object = { ...obj }
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key]
      if (isVoid(element)) {
        delete object[key]
      }
    }
  }
  return object
}

/**
 * 使传入的值只能在修改完成之后才能再被修改（节流方法）
 * @param value 
 * @param delay 
 * @returns 
 */
export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // 每次在value变化之后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    // 每次在上一个useEffect处理完之后再运行
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useDocumnetTitle = (title: string, keepUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current
  const keep = useRef(keepUnmount).current
  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    return () => {
      if (!keep) {
        document.title = oldTitle
      }
    }
  }, [keep, oldTitle])
}
