import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Details() {
    let navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;
    const [Location, setLocation] = useState(data);
    const backToHome = () => {
        navigate("/", { replace: true });
    }
    const center = {lat:48.8584,lng:2.2945}
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
                    <div className='maps_area'>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Details