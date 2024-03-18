import { useState } from "react"
import { DownArrow, RightArrow } from "../icons"
import { handleFetchResponse, makeGetFolderContentUrl } from "../utils"
import { File } from "./File"
import { Spinner } from "./Spinner"

export type FileFolder = { name: string; type: "file" | "directory" }
export type FolderResponse = {
  id: string
  entries: FileFolder[]
}

export const Folder = ({ name, path }: { name: string; path: string }) => {
  const [data, setData] = useState<FileFolder[] | null>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const loadFolderContent = async () => {
    if (isLoading) return
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    await handleFetchResponse<FolderResponse>(fetchCall).then((rs) =>
      setData(rs && rs.entries.length > 0 ? rs.entries : null)
    )
    setIsLoading(false)
  }

  const expandFolder = () => {
    setIsExpanded((s) => !s)
    if (data !== null && data.length === 0) {
      loadFolderContent()
    }
  }

  return (
    <div className="pointer">
      <div onClick={expandFolder}>
        {isExpanded ? <DownArrow /> : <RightArrow />}
        <span className="folder__name">{name}</span>
      </div>
      {isExpanded && (
        <div className="ml-2">
          {!data && <i className="empty__text">Folder is empty</i>}
          {isLoading && <Spinner />}
          {data &&
            data.map((fileFolder) =>
              fileFolder.type === "directory" ? (
                <Folder
                  key={fileFolder.name}
                  name={fileFolder.name}
                  path={`${path ? path + "/" : ""}${fileFolder.name}`}
                />
              ) : (
                <File
                  key={fileFolder.name}
                  name={fileFolder.name}
                  path={`${path ? path + "/" : ""}${fileFolder.name}`}
                />
              )
            )}
        </div>
      )}
    </div>
  )
}
