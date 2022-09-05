import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Api from '../api/api_route';
import Spinner from 'react-bootstrap/Spinner';


function Details() {
    let navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;
    const [Location] = useState(data);
    const [DistanceLocation, setDistanceLocation] = useState([]);
    const backToHome = () => {
        navigate("/", { replace: true });
    }


    //get 50km location data from server
    const loadDistaceData = () => {
        const url = Api.data_get_location_distance;
        const values = {
            'lat': Location.lat,
            'lng': Location.lng,
            'id': Location.id,
        }
         Axios.post(url, values).then((res) => {
            setDistanceLocation(res.data.data);
        });
    }

    useEffect(() => {
        loadDistaceData();
    }, []);

    return (
        <div className='container my-5'>
            <h3>Details Location</h3>
            <Button type='button' onClick={() => backToHome()} variant="primary" >Back</Button>
            <div className='row my-3'>
                <div className='col-lg-6'>
                    <h4>Title: {Location.title}</h4>
                    <h4>Address: {Location.address}</h4>
                    <h4>Suburb: {Location.suburb}</h4>
                    <h4>State: {Location.state}</h4>
                    <h4>Zip: {Location.zip}</h4>
                    <h4>Lat: {Location.lat}</h4>
                    <h4>Lng: {Location.lng}</h4>
                </div>
                <div className='col-lg-6'>
                    <h3>Nearby locations</h3>
                    <div className=''>
                        <ul className="list-group">
                            {DistanceLocation.length >0?(
                            DistanceLocation.map((item)=>(<li key={item.id} className="list-group-item  d-flex justify-content-between align-items-center">
                                <p>{item['location'].title}</p>
                                <span className="badge bg-primary badge-pill float-right">{item['km']} KM</span>
                                </li>))
                            ):<Spinner animation="grow" />}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details
