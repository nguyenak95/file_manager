import { useState } from "react"

import "./App.css"

const API_URL = import.meta.env.API_URL || "http://localhost:8080"
const makeGetFolderContentUrl = (path: string) => {
  if (!path) {
    return `${API_URL}/fs?path=root`
  }
  return `${API_URL}/fs?path=${encodeURIComponent("root/" + path)}`
}

async function handleFetchResponse<T>(
  fetchCall: Promise<Response>
): Promise<T> {
  let result = null
  try {
    const response = await fetchCall
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    result = response.json()
  } catch (error) {
    console.log(error)
  }
  return result
}

const makeFetchCallWithCancel = (url: string, options?: RequestInit) => {
  const abortController = new AbortController()
  const fetchCall = fetch(url, { ...options, signal: abortController.signal })
  return { abortController, fetchCall }
}

const Folder = ({
  name,
  path,
  isExpanded = false,
}: {
  name: string
  path: string
  isExpanded?: boolean
}) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadFolderContent = async () => {
    if (isLoading) return
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    const result = await handleFetchResponse(fetchCall)
    setIsLoading(false)
  }

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
      <Folder name="root" path="" />
    </>
  )
}

export default App
