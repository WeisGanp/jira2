import { useMemo } from "react"
import { useUrlQueryParams } from "util/url"

/**
 * 搜索参数的响应式对象
 * @returns 响应式对象及对象修改函数
 */
export const useProjectSearchPrams = () => {
  const [param, setParam] = useUrlQueryParams(["name", "personId"])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}