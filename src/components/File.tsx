import { useContext, useState } from "react"
import { ModalContext } from "../context"
import { JSIcon } from "../icons"
import { handleFetchResponse, makeGetFolderContentUrl } from "../utils"

export type FileResponse = {
  id: string
  contents: string
}

export const File = ({ name, path }: { name: string; path: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { toggleModal, setModalContent } = useContext(ModalContext)

  const showFileContent = async () => {
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    const file = await handleFetchResponse<FileResponse>(fetchCall)
    setModalContent(file?.contents || "Not found file content")
    setIsLoading(false)
    toggleModal()
  }

  return (
    <div>
      <JSIcon />
      {isLoading ? (
        <i className="empty__text">Loading file content</i>
      ) : (
        <span
          data-testid={`file-${name}`}
          onClick={showFileContent}
          className="file__name"
        >
          {name}
        </span>
      )}
    </div>
  )
}
