import React from "react"
import { useDebounce, useDocumnetTitle } from "util/index"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProject } from "util/project"
import { useUsers } from "util/user"
import { Project } from "./index.d"
import { useProjectSearchPrams } from "./util"

/**
 * 项目列表页面根标签
 * @returns
 */
export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchPrams()
  const debouncedValue = useDebounce(param, 250)
  const { isError, isLoading, asyncState } = useProject(debouncedValue)
  const users = useUsers()
  const getDataSource = (): Project[] => {
    return Array.isArray(asyncState.data)
      ? asyncState.data.map((d, i) => ({ ...d, key: i }))
      : []
  }

  useDocumnetTitle("项目列表", false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      {isError ? (
        <Typography.Text type={"danger"}>
          {asyncState.error?.message}
        </Typography.Text>
      ) : null}
      <List
        dataSource={getDataSource()}
        users={users}
        loading={isLoading}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
