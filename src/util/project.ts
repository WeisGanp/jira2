import { useEffect, useRef } from 'react'
import { clearObject } from "util/index"
import { useAsync } from "util/use-async"
import { Project } from "screens/project-list/index.d"
import { useHttp } from "util/http"

/**
 * 搜索项改变或负责人变更时发起项目列表请求，并实时监控请求状态
 * @param param 请求参数
 * @returns 
 */
export const useProject = (param: Partial<Project>) => {
  const client = useRef(useHttp<Project[]>())
  const { run, ...result } = useAsync<Project[]>()
  const runRef = useRef(run)
  useEffect(() => {
    const getProject = client.current("projects", {
      data: clearObject(param),
    })
    runRef.current(getProject).then()
  }, [param])
  return result
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }
  return {
    mutate,
    ...asyncResult
  }
}
