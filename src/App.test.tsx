import App from "./App"
import { fireEvent, render, screen, waitFor } from "./test-utils/test"

describe("App render", () => {
  it("the root folder is visible", async () => {
    render(<App />)
    expect(screen.getByText(/root/i)).toBeInTheDocument()

    const folderNameLabel = await screen.findByTestId(`folder-root`)
    fireEvent.click(folderNameLabel)

    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument()
    })
  })
  it("toggleModal", async () => {
    render(<App />)
    expect(screen.getByText(/root/i)).toBeInTheDocument()

    const folderNameLabel = await screen.findByTestId("folder-root")
    fireEvent.click(folderNameLabel)

    await waitFor(() => {
        expect(screen.getByTestId("spinner")).toBeInTheDocument()
        expect(screen.getByText(/directory-1a/i)).toBeInTheDocument()
    })
    const fileLabel = await screen.findByTestId("file-index.js")
    fireEvent.click(fileLabel)

    await waitFor(() => {
        expect(screen.getByTestId("modal")).toBeInTheDocument()
    })
  })
})
