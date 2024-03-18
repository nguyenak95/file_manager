import { useState } from "react"
import "./App.css"
import { Folder } from "./components/Folder"
import { ModalContext } from "./context"
import { Modal } from "./components/Modal"

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [content, setContent] = useState("")

  const toggleModal = () => setIsModalOpen((s) => !s)
  const setModalContent = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <ModalContext.Provider
      value={{ isOpen: isModalOpen, content, toggleModal, setModalContent }}
    >
      {isModalOpen && <Modal content={content} toggleModal={toggleModal} />}
      <Folder name="root" path="" />
    </ModalContext.Provider>
  )
}

export default App
