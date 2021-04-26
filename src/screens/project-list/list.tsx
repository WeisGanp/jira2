import { Table } from "antd"
import React from "react"
import dayjs from "dayjs"
import { TableListProps, Project } from "./index.d"
import { Link } from "react-router-dom"
/**
 * 用户列表表格标签
 * @param param0
 * @returns
 */
export const List = ({ users, ...props }: TableListProps) => {
  const columns = [
    {
      title: "名称",
      // dataIndex: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
      render(value: any, project: Project) {
        return <Link to={project.id + ""}>{project.name}</Link>
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render: (value: string, project: Project) => {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        )
      },
    },
    {
      title: "日期",
      render: (value: string, project: Project) => (
        <span>
          {project.created ? dayjs(project.created).format("YYYY-MM-DD") : "无"}
        </span>
      ),
    },
  ]
  return <Table pagination={false} columns={columns} {...props} />
}
