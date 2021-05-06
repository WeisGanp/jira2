/** @jsxImportSource @emotion/react */
import React from "react"
import { Form, Input, Select } from "antd"
import { SearchPanelProps } from "./index.d"

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
        <Select
          defaultValue={props.param.personId}
          onChange={(value) =>
            props.setParam({
              ...props.param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {props.users.map((user) => (
            <Select.Option key={user.name} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
