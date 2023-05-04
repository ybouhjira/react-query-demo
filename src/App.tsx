import {useQuery} from 'react-query'

import './App.css';
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

function App() {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://jsonplaceholder.typicode.com/todos').then(res =>
            res.json()
        )
    )

    if (error) return <div className="text-red-900">An error has occurred: </div> + (error as Error).message

    return (
        <div className="App">
            <h1>Todos</h1>
            {isLoading && <p className="text-blue-900">Loading...</p>}
            {Array.isArray(data) && data.map((item: any) => (
                <div key={item.id} className="flex flex-row">
                    <p className="w-1/2">{item.title}</p>
                    <p className="w-1/2">{item.completed ? 'Completed' : 'Not completed'}</p>
                </div>
            ))}
        </div>
    )
}

export default App
