/** @jsxImportSource @emotion/react */
import React from "react"
import { Form, Input } from "antd"
import { SearchPanelProps } from "./index.d"
import { UserSelect } from "components/user-select"

/**
 * 用户列表筛选及负责人下拉标签
 * @param props
 * @returns
 */
export const SearchPanel = (props: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={props.param.name}
          onChange={(e) =>
            props.setParam({
              ...props.param,
              name: e.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={props.param.personId}
          onChange={(value) =>
            props.setParam({
              ...props.param,
              personId: value,
            })
          }
          defaultOptionName={"负责人"}
          options={props.users}
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}
