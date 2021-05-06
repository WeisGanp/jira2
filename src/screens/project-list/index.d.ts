import { TableProps } from 'antd'

export interface Project {
  id: number
  name: string
  personId: number,
  pin: boolean
  organization: string
  created: string,
  key?: string | number
}

export interface ListProps {
  list: Project[]
  users: User[]
}

export interface TableListProps extends TableProps<Project> {
  users: User[]
}

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string,
  token: string
}

export interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  users: User[]
  setParam: (param: SearchPanelProps["param"]) => void
}
