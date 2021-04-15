import React from "react"
import { useAuth } from "context/auth-context"
import { Form, Input } from "antd"
import { LongButton } from "./index"
import { useAsync } from "util/use-async"
/**
 * 登录组件
 * @returns
 */
const LoginScreen = (props: { onError: (error: Error | null) => void }) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync()

  const handleSubmit = ({
    username,
    password,
  }: {
    username: string
    password: string
  }) => {
    run(
      login({
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
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export default LoginScreen
