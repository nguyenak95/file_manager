import { useState } from "react"
import { handleFetchResponse, makeGetFolderContentUrl } from "../utils"
import { FileFolder, FolderResponse } from "./Folder"
import { JSIcon } from "../icons"

export const File = ({ name, path }: { name: string; path: string }) => {
  const [data, setData] = useState<FileFolder[] | null>([])
  const [isLoading, setIsLoading] = useState(false)

  const loadFileContent = async () => {
    if (isLoading) return
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    await handleFetchResponse<FolderResponse>(fetchCall).then(
      // console.log
      (rs) => setData(rs ? rs.entries : null)
    )
    setIsLoading(false)
  }

  const showFileContent = () => {
    if (data !== null && data.length === 0) {
      loadFileContent()
    }
  }

  return (
    <div className="pointer">
      <div onClick={showFileContent}>
        <JSIcon />
        <span className="file__name">{name}</span>
      </div>
    </div>
  )
}
