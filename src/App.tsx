import {useQuery} from 'react-query'

import './App.css';
import cx from "classnames";

function App() {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://jsonplaceholder.typicode.com/todos').then(res =>
            res.json()
        )
    )

    if (error) {
        return <div className="text-red-900">An error has occurred: </div> + (error as Error).message
    }

    return (
        <div>
            <h1>Todos</h1>
            {isLoading && <p className="text-blue-900">Loading...</p>}
            {Array.isArray(data) && data.map(({completed, id, title}) => (
                <div key={id} className="flex flex-row gap-4">
                    <input type="checkbox" defaultValue={completed}/>
                    <div className={cx("w-1/2 w-full text-left", {"line-through": completed})}>{title}</div>
                </div>
            ))}
        </div>
    )
}

export default App
