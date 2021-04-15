import React, { PropsWithChildren, ReactElement } from "react"

type fallbackRender = (props: { error: Error | null }) => ReactElement

export class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallbackRender: fallbackRender }>,
  { error: Error | null }
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
