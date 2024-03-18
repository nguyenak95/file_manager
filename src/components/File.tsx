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
    if (isLoading) return
    setIsLoading(true)
    const fetchCall = fetch(makeGetFolderContentUrl(path))
    const file = await handleFetchResponse<FileResponse>(fetchCall)
    setModalContent(file?.contents || "Not found file content")
    setIsLoading(false)
    toggleModal()
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
