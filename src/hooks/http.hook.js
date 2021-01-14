import { useState, useCallback } from "react"
import { useSuccess } from './success.hook'
import { useError } from './error.hook'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useHttp = () => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })

    const [loading, setLoading] = useState(false)
    const successMessage = useSuccess()
    const errorMessage = useError()

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }

            const response = await fetch(url, { method, body, headers })
                .then(setLoading(true))
            const data = await response.json()
                .then(setLoading(false))

            if (!response.ok) {
                errorMessage('Something went wrong!')
            } else {
                successMessage('Fetched latest posts!')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [errorMessage, successMessage])

    const API_URL = `https://jsonplaceholder.typicode.com/`

    return { loading, request, API_URL }
}
