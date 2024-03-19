import { render, screen } from "../test-utils/test"
import { Modal } from "./Modal"

describe("Modal render", () => {
  it("the content is visible", async () => {
    const content = "modalcontent"
    render(<Modal content={content} toggleModal={vi.fn()} />)
    expect(screen.getByText(content)).toBeInTheDocument()
  })
})
