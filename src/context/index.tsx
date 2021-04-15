import React from "react"
import { AuthProvider } from "./auth-context"
import { QueryClient, QueryClientProvider } from "react-query"

/**
 * Context根标签，在这里会整合所有的Context标签
 * @param 传入被包裹的子标签
 * @returns 整合所有Context的Context根标签
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
