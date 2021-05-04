import React, { Component } from "react"
import { Link, Navigate, Route, Routes } from "react-router-dom"
import { KanbanScreen } from "../kanban"
import { RenwuzuScreen } from "../renwuzu"

class Project extends Component {
  render() {
    return (
      <div>
        <h1>ProjectScreen</h1>
        <Link to={"kanban"}>看板</Link>
        <Link to={"renwuzu"}>任务组</Link>
        <Routes>
          <Route path={"kanban"} element={<KanbanScreen />}></Route>
          <Route path={"renwuzu"} element={<RenwuzuScreen />}></Route>
          <Navigate to={window.location.pathname + "/kanban"} />
        </Routes>
      </div>
    )
  }
}

export default Project
