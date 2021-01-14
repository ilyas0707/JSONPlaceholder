import { useCallback, useEffect, useState } from 'react'
import { useHttp } from './http.hook'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export const useGet = (url) => {
    toast.configure({
        position: 'top-center',
        autoClose: 3000,
        draggable: true
    })

    const { request, API_URL, loading } = useHttp()
    const [data, setData] = useState([])

    const getData = useCallback(() => {
        try {
            request(`${API_URL}${url}`, 'GET').then((result) => {
                setData(result)
                localStorage.setItem('data', JSON.stringify({ data: result }))
            })
        } catch (e) {}
    }, [request, API_URL, url])

    useEffect(() => {
        let mounted = true

        if (mounted) {
            getData()
        }

        setInterval(() => {
            localStorage.removeItem('data')
            getData()
        }, 5 * 60 * 1000)
        
        return () => (mounted = false)
    }, [getData])

    return { data, loading }
}
