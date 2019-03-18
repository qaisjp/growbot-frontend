import React from "react";

const Modal = props => {
  const { open, close, title, content, footer } = props;
  const modalClassAttribute = open ? "show" : "hide";

  return (
    <div style={{overflowY: "auto"}} className={"modal " + modalClassAttribute}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">

          <div className="modal-header">
            <button
              type="button"
              onClick={close}
              className="close"
            >
              &times;
            </button>
            <h4 className="modal-title">{title}</h4>
          </div>
          <div className="modal-body">
            {open && content}
          </div>
          <div className="modal-footer">
            {footer}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
