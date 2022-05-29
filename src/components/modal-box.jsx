import './modal-box.css'

const ModalBox = ({header,body,footer,onCancel}) => {
  return (
      <div className="modal-bg">
          <div className="modal-container">
              <div className="cancel-btn">
                  <span onClick={onCancel}>x</span>
              </div>
              <div className="modal-header">
                {header}
                {/* <div className="modal-title">
                    <h3>Are you sure to continue?</h3>
                </div> */}
              </div>
              <div className="modal-body">
                  {body}
                  {/* You are about to master modal box? */}
              </div>
              <div className="modal-footer">
                  {footer}
                  {/* Its not the end of the world. */}
              </div>
          </div>
      </div>
  )
}

export default ModalBox