
function CustomYesNoModal({title, confirm}) {

    return ( <div className="modal modal-fullscreen" id="customCheckModal">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div className="modal-body d-flex">
          <button type="button" className="btn btn-success me-auto" data-bs-dismiss="modal"
                  onClick={confirm}>Oui</button>
          <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Non</button>
        </div>
      </div>    
    </div>
  </div> );
}

export default CustomYesNoModal;