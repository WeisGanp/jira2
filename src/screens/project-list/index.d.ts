import { TableProps } from 'antd'

export interface Project {
  id: string
  name: string
  personId: string
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
  id: string
  name: string
  email: string
  title: string
  organization: string,
  token: string
}

export interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }
  users: User[]
  setParam: (param: SearchPanelProps["param"]) => void
}
