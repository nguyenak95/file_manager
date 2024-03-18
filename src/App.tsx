import { useState } from "react"

import "./App.css"

const API_URL = import.meta.env.API_URL || "http"
const makeGetFolderContentUrl = (path: string) => {
  if (!path) {
    return `${API_URL}/fs?path=root`
  }
  return `${API_URL}/fs?path=${encodeURIComponent("root/" + path)}`
}

const Folder = ({
  name,
  path,
  isExpanded = false,
}: {
  name: string
  path?: string
  isExpanded?: boolean
}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadFolderContent = async () => {
    if (isLoading) return
    setIsLoading(true)
    const result = await fetch(makeGetFolderContentUrl(path))
      .then((rs) => rs.json())
      .then(setData)
    setIsLoading(false)
  }

  console.log(data)

  return (
    <div>
      <div onClick={loadFolderContent}>{name}</div>
      {isExpanded && <div>{data}</div>}
    </div>
  )
}
function App() {

  return (
    <>
      <Folder name="root" />
    </>
  )
}

export default App
