import React from 'react'


const Modal: React.FC<PropsType> = props => {
    return  <div className='modal'>
                <div className="modal__wrapper">
                    <div className='modal__body'>
                        <div className='modal__close' onClick={props.modaltoggle}></div>
                        <div className="modal__title">{props.title}</div>
                        <div className="modal__content">{props.children}</div>
                    </div>
                </div>
            </div>
}

export default Modal

type PropsType = {
    title: string,
    children: any,
    modaltoggle: () => void,
}