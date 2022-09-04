import React from 'react'
import { Link } from 'react-router-dom'
function DataList({ list,handleDelete}) {
    return (
        <>
            <table className="table">
                <thead className="thead-dark bg-dark text-white">
                    <tr className='text-center'>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Address</th>
                        <th scope="col">Zip</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((value) => (
                            <tr className='text-center' key={value.id}>
                                <th scope="row">{value.id}</th>
                                <td>{value.title}</td>
                                <td>{value.address}</td>
                                <td>{value.zip}</td>
                                <td>
                                    <Link to='/edit' state={{data:value}} className='badge bg-primary badge-primary'>Edit</Link> &nbsp;
                                    <Link to='/details' state={{data:value}} className='badge bg-success badge-success'>Details</Link> &nbsp;
                                    <a onClick={()=>handleDelete(value)} className='badge bg-danger badge-danger'>x</a>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default DataList