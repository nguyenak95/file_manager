import { fireEvent, render, screen } from "../test-utils/test"
import { File } from "./File"

describe("file render", () => {
  it("the file name is visible", async () => {
    const name = "fileName"
    render(<File path="index.js" name={name} />)
    expect(screen.getByText(/fileName/i)).toBeInTheDocument()
  })
  it("load file content success", async () => {
    const name = "fileName"
    render(<File path="index.js" name={name} />)
    expect(screen.getByText(/fileName/i)).toBeInTheDocument()

    const fileNameLabel = await screen.findByTestId(`file-${name}`)
    fireEvent.click(fileNameLabel)

    expect(screen.queryByText(/fileName/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Loading file content/i)).toBeInTheDocument()
  })
  it("load file content fail", async () => {
    const name = "fileName"
    render(<File path="failed.js" name={name} />)
    expect(screen.getByText(/fileName/i)).toBeInTheDocument()

    const fileNameLabel = await screen.findByTestId(`file-${name}`)
    fireEvent.click(fileNameLabel)

    expect(screen.queryByText(/fileName/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Loading file content/i)).toBeInTheDocument()
  })
  it("load deeply nested file", async () => {
    const name = "fileName"
    render(
      <File
        path="directory-1/directory-1a/directory-1aA/index.js"
        name={name}
      />
    )
    expect(screen.getByText(name)).toBeInTheDocument()

    const fileNameLabel = await screen.findByTestId(`file-${name}`)
    fireEvent.click(fileNameLabel)

    expect(screen.queryByText(/fileName/i)).not.toBeInTheDocument()
    expect(screen.getByText(/Loading file content/i)).toBeInTheDocument()
  })
})
