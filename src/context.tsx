import { createContext } from "react"

export const ModalContext = createContext<{
  isOpen: boolean
  content: string
  toggleModal: () => void
  setModalContent: (newContent: string) => void
}>({
  isOpen: false,
  content: "",
  toggleModal: () => null,
  setModalContent: () => null,
})
