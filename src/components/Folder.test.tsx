import { fireEvent, render, screen, waitFor } from "../test-utils/test"
import { Folder } from "./Folder"

describe("Folder render", () => {
  it("the folder name is visible", async () => {
    const name = "folderName"
    render(<Folder path="index" name={name} />)
    expect(screen.getByText(/folderName/i)).toBeInTheDocument()
  })
  it("load root folder", async () => {
    const name = "root"
    render(<Folder path="" name={name} />)
    expect(screen.getByText(name)).toBeInTheDocument()

    const folderNameLabel = await screen.findByTestId(`folder-${name}`)
    fireEvent.click(folderNameLabel)

    await waitFor(() => {
        expect(screen.getByTestId("spinner")).toBeInTheDocument()
    })
  })
  it("load folder content success", async () => {
    const name = "folderName"
    render(<Folder path="directory-1" name={name} />)
    expect(screen.getByText(/folderName/i)).toBeInTheDocument()

    const folderNameLabel = await screen.findByTestId(`folder-${name}`)
    fireEvent.click(folderNameLabel)

    await waitFor(() => {
        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.getByText(/directory-1a/i)).toBeInTheDocument()
    })
  })
  it("load folder content failed", async () => {
    const name = "folderName"
    render(<Folder path="failed" name={name} />)

    const folderNameLabel = await screen.findByTestId(`folder-${name}`)
    fireEvent.click(folderNameLabel)

    await waitFor(() => {
        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.getByText(/Folder is empty/i)).toBeInTheDocument()
    })
  })
})
