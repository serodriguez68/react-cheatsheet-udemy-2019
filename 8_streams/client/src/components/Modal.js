import React from 'react';
import ReactDOM from 'react-dom';

const Modal = props => {
    // When we create a portal, we return whatever ReactDOM.createPortal returns.
    // The function takes 2 args:
    //   1) The jsx we want to render
    //   2) The element we want to render (1) into. Note that everything inside will be replaced
    // Note the classNames are specific to semantic ui
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                This is the content of the modal
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;