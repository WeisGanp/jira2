import React from "react"
// import { ProjectListScreen } from "./screens"
// import UserArray from "./unitTest/UserArray"
import UnauthenticatedApp from "unauthenticated-app"
import AuthenticatedApp from "authenticated-app"
import { useAuth } from "context/auth-context"
import { ErrorBoundary } from "util/error-houndary"
import { FullPageError } from "components/lib"
import "./App.css"

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {/* <ProjectListScreen></ProjectListScreen> */}
      {/* <UserArray></UserArray> */}
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
