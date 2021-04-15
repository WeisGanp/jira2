import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "./index"
import { useAsync } from "util/use-async"
/**
 * 注册组件
 * @returns
 */
const RegisterScreen = (props: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = ({
    username,
    password,
    cpassword,
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (password !== cpassword) {
      props.onError(new Error("请确认两次输入的密码相同"))
      return
    }
    run(
      register({
        username,
        password,
      })
    ).catch(props.onError)
  }
  return (
    <Form action="/" onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"userName"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default RegisterScreen
