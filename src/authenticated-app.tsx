import React from "react"
import { ProjectListScreen } from "screens/project-list/index"
import { useAuth } from "context/auth-context"
import styled from "@emotion/styled"
import { Row } from "components/lib"
import { ReactComponent as SoftwareLogo } from "asstes/cola.svg"
import { Dropdown, Menu, Button } from "antd"
/**
 *用户登录后根页面组件
 *
 * @return {*}
 */
const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  const menu = (
    <Menu>
      <Menu.Item key={"logout"}>
        <Button type={"link"} onClick={logout}>
          登出
        </Button>
      </Menu.Item>
    </Menu>
  )
  return (
    <Container>
      <Header between={true} marginBottom={0.5}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"2rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={menu}>
            <Button type={"link"}>Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

export default AuthenticatedApp

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
