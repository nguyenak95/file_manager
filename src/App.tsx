import { useState } from "react"

import "./App.css"

const svgArrowPath = (
  <path d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001  c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213  C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606  C255,161.018,253.42,157.202,250.606,154.389z" />
)

const RightArrow = ({ size = 12 }: { size?: number }) => (
  <svg fill="#fff" height={size} width={size} viewBox="0 0 330 330">
    {svgArrowPath}
  </svg>
)
const DownArrow = ({ size = 12 }: { size?: number }) => (
  <svg
    fill="#fff"
    height={size}
    width={size}
    viewBox="0 0 330 330"
    transform="rotate(90)"
  >
    {svgArrowPath}
  </svg>
)
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

const Folder = ({ name, path }: { name: string; path: string }) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const loadFolderContent = async () => {
    if (isLoading) return
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    const result = await handleFetchResponse(fetchCall)
    setIsLoading(false)
  }
  const expandFolder = () => {
    setIsExpanded((s) => !s)
    if (!data) {
      loadFolderContent()
    }
  }

  return (
    <div>
      <div onClick={expandFolder}>
        {isExpanded ? <DownArrow /> : <RightArrow />}
        <span className="folder__name">{name}</span>
      </div>
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
