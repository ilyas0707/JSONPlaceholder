import React from 'react'
import Styles from './Header.module.css'

export const Header = () => {
    return (
        <header className={Styles.header}>
            <div className="container">
                <h1 className={Styles.heading}>
                    <a
                        className={Styles.link}
                        href="http://jsonplaceholder.typicode.com/"
                        target="_blank"
                        rel="noreferrer"
                    >{`{JSON} Placeholder`}</a>
                </h1>
            </div>
        </header>
    )
}
