export const Modal = ({
  content,
  toggleModal,
}: {
  content: string
  toggleModal: () => void
}) => (
  <div className="dialog__backdrop">
    <div className="dialog__body">
      <div className="dialog__content">{content}</div>
      <button onClick={toggleModal}>Close</button>
    </div>
  </div>
)
