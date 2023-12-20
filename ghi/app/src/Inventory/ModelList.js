import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function ModelList() {
    const [models, setModels] = useState([]);
    const navigate = useNavigate();

    const getData = async () => {
        const response = await fetch('http://localhost:8100/api/models/');

        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const HandleOnclick = () => {
        navigate("/models/new")
    }

    return (
        <>
            <h1>Models</h1>
            <table className="table table-striped">
                <thead>
                    <tr className="table-success">
                        <th>Manufacturer</th>
                        <th>Name</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.href}>
                                <td>{model.manufacturer.name}</td>
                                <td>{model.name}</td>
                                <td><img src={model.picture_url} alt="" style={{ width: '200px', height: '150px' }} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={HandleOnclick} type="button" className="btn btn-primary" data-bs-toggle="button">
                Add A Model
            </button>
        </>
    );
}

export default ModelList
