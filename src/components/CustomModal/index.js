import React from 'react';
import { IoMdClose } from "react-icons/io";
import Modal from "react-modal";
import "./customModal.scss"

function CustomModal({isOpen, setOpen, children, title, onAfterOpen, className, overlayClassName, contentClassName}) {
    return (
        <Modal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            className={className ? className :"customModal"}
            overlayClassName={overlayClassName ? overlayClassName : "customModal__overlay"}
        >
            <div className="customModal__header">
                <div className="customModal__header__close" onClick={() => setOpen(false)}><IoMdClose /></div>
                <div className="customModal__header__title">{title}</div>
            </div>
            <div className={`customModal__content ${contentClassName}`}>
                {children}
            </div>
        </Modal>
    );
}

export default CustomModal;