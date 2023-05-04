import {useEffect, useState} from "react";

function useRequest(url: string) {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch(url);
        setLoading(false);
        setData(await response.json());
        return response;
    }

    useEffect(() => {
        fetchData().catch((err) => setError(err))
    }, [fetchData])

    return {data, error, loading};
}