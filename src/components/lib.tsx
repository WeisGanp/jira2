import styled from "@emotion/styled"
import { Spin, Typography } from "antd"
import { DevTools } from "jira-dev-tool"
interface RowProps {
  between?: boolean
  gap?: number | boolean
  marginBottom?: number
}

/**
 * Row标签
 * @param {*} gap number 设置 margin-right 值
 * @param {*} between boolean 设置 justify-content 值
 * @param {*} marginBottom number 设置 margin-bottom 值
 */
export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
/**
 * 页面刷新时全局loading标签
 * @returns
 */
export const FullPageLoading = () => (
  <FullPage>
    <Spin />
  </FullPage>
)

/**
 * 页面刷新异常时全局异常显示标签
 * @param param0
 * @returns
 */
export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
)
