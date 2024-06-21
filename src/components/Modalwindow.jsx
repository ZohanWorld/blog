import '../style/modal-window.scss'

function ModalWindow({ closeModal, handleAction }) {
  return (
    <div className="modal">
      <p className="modal__title">Are you sure to delete this article?</p>
      <div>
        <button type="button" onClick={closeModal} className="modal__btn">
          No
        </button>
        <button type="button" onClick={handleAction} className="modal__btn modal__btn--confirm">
          Yes
        </button>
      </div>
    </div>
  )
}

export default ModalWindow
