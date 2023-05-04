import {useEffect, useState} from 'react'
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        setLoading(false);
        setData(await response.json());
        return response;
    }

    useEffect(() => {
        fetchData().catch((err) => setError(err))
    }, [])

    return (
        <div className="App">
            <h1>Todos</h1>
            {loading && <p className="text-blue-900">Loading...</p>}
            {error && <p className="text-red-900">{JSON.stringify(error)}</p>}
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
