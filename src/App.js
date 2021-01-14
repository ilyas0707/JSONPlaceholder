import React from 'react'
import Styles from './App.module.css'
import { Header } from './organisms/Header/Header'
import { Main } from './organisms/Main/Main'

function App() {
    return (
        <div className={Styles.app}>
			<Header />
            <Main />
        </div>
    )
}

export default App
