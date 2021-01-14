import React, { useState } from 'react'
import { useGet } from '../../hooks/get.hook'
import Fuse from 'fuse.js'

import Styles from './Main.module.css'
import { Modal } from '../../molecules/Modal/Modal'

export const Main = () => {
    const [form, setForm] = useState('')
    const [open, setOpen] = useState(false)
    const [post, setPost] = useState({})
    const { data, loading } = useGet('posts')

    const fuse = new Fuse(data, {
        keys: ['title'],
    })

    const results = fuse.search(form, { limit: 3 })
    const dataFiltered = form ? results.map((result) => result.item) : Array.isArray(data) ? data : []

    const changeHandler = ({ currentTarget = {} }) => {
        const { value } = currentTarget
        setForm(value)
    }

    const openModal = (data) => {
        setOpen(!open)
        setPost(data)
    }

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <div className="loading"></div>
            </div>
        )
    }

    return (
        <div className={Styles.main}>
            <div className="container">
                <div className={Styles.search}>
                    <input
                        type="text"
                        className={Styles.input}
                        name="title"
                        onChange={changeHandler}
                        placeholder="Search..."
                        autoComplete="off"
                    />
                    <i className={`material-icons ${Styles.icon}`}>search</i>
                </div>
                <div className={Styles.block}>
                    {dataFiltered.map(({ id, title, body }) => {
                        return (
                            <div
                                className={Styles.item}
                                key={id}
                                onClick={() =>
                                    openModal({ title: title, body: body })
                                }
                            >
                                <h3 className={Styles.title}>
                                    {title.charAt(0).toUpperCase() +
                                        title.slice(1)}
                                </h3>
                                <p className={Styles.body}>
                                    {body.charAt(0).toUpperCase() +
                                        body.slice(1).slice(0, 99) +
                                        '...'}
                                </p>
                            </div>
                        )
                    })}
                </div>
                {open ? <Modal post={post} setOpen={setOpen} /> : null}
            </div>
        </div>
    )
}
