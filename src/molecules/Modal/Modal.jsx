import React, { useCallback, useEffect } from 'react'
import Styles from './Modal.module.css'

export const Modal = ({ post, setOpen }) => {
    const escHandler = useCallback((event) => {
        if(event.keyCode === 27) {
            setOpen(false)
        }
    }, [setOpen])

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false)
        return () => {
            document.removeEventListener("keydown", escHandler, false)
        }
    }, [escHandler])

    return (
        <div className={Styles.modal}>
            <div className={Styles.overlay} onClick={() => setOpen(false)}></div>
            <div className={Styles.post}>
                <h3 className={Styles.title}>
                    {post.title.charAt(0).toUpperCase() +
                        post.title.slice(1)}
                    <i className={`material-icons ${Styles.icon}`} onClick={() => setOpen(false)}>close</i>
                </h3>
                <p className={Styles.body}>
                    {post.body.charAt(0).toUpperCase() +
                        post.body.slice(1)}
                </p>
            </div>
        </div>
    )
}
