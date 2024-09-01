import { useEffect, useState } from "react"

export const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        if (url) {
            const fetchData = async () => {
                setIsLoading(true)

                try {
                    const response = await fetch(url, { signal: controller.signal })

                    if (!response.ok) {
                        if (response.status === 404) throw new Error("404, Not found")
                        if (response.status === 500) throw new Error("500, Internal server error")
                        //Otro error en el servidor
                        throw new Error(response.status)
                    }

                    const json = await response.json()
                    setIsLoading(false)
                    setData(json)

                } catch (err) {
                    setError('No se pudo recibir la data')
                    setIsLoading(false)
                }

            }
            fetchData()
        }

        return () => {
            //Control para abortar el fetch al desmontar el componente
            controller.abort()
        }
    }, [url])

    return { data, isLoading, error }

}