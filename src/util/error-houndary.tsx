import React, { PropsWithChildren, ReactElement } from "react"

type defaultError = Error | null
type fallbackRender = (props: { error: defaultError }) => ReactElement

/**
 * 异常边界处理标签
 */
export class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallbackRender: fallbackRender }>,
  { error: defaultError }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({ error })
    }
    return children
  }
}
