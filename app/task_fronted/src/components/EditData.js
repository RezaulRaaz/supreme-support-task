import React, { useState} from 'react'
import { useLocation,useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { DataValidation } from '../schemas';
import Api from '../api/api_route';
import Axios from 'axios';
import { toast } from 'react-toastify';


function EditData(props) {
    const [DataSave, setDataSave] = useState(false);
    let navigate = useNavigate();

    const location = useLocation();
    const data = location.state.data;
    const [Location, setLocation] = useState(data);

    const backToHome = ()=>{
        navigate("/", { replace: true });
    }

    return (
        <div className='container my-5'>
            <h3>Edit Data</h3>
            <Button type='button' onClick={()=>backToHome()} variant="primary" >Back</Button>
            <div className='row'>
                <div className='col-lg-6'>
                    {Location ? (<Formik
                        initialValues={Location}
                        validationSchema={DataValidation}
                        onSubmit={(values, actions) => {
                            setDataSave(true);
                            const url = Api.data_update;
                            Axios.post(url, values).then(res => {
                                setDataSave(false);
                                toast("Data Updated Successfuly");
                                navigate("/", { replace: true });
                            });
                            
                        }}
                    >
                        {props => (
                            <form onSubmit={props.handleSubmit}>
                                <div className="form-group my-2">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name='title' value={props.values.title} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='title' placeholder='Title' />
                                    {props.errors.title && props.touched.title ? (<p className='text-danger'>{props.errors.title}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="address">Address</label>
                                    <input type="text" name='address' value={props.values.address} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='address' placeholder="Address" />
                                    {props.errors.address && props.touched.address ? (<p className='text-danger'>{props.errors.address}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="suburb">Suburb</label>
                                    <input type="text" name='suburb' value={props.values.suburb} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='suburb' />
                                    {props.errors.suburb && props.touched.suburb ? (<p className='text-danger'>{props.errors.suburb}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="state">State</label>
                                    <input type="text" name='state' value={props.values.state} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='state' />
                                    {props.errors.state && props.touched.state ? (<p className='text-danger'>{props.errors.state}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="zip">Zip</label>
                                    <input type="text" name='zip' value={props.values.zip} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='zip' />
                                    {props.errors.zip && props.touched.zip ? (<p className='text-danger'>{props.errors.zip}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="lat">Lat</label>
                                    <input type="text" name='lat' value={props.values.lat} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='lat' />
                                    {props.errors.lat && props.touched.lat ? (<p className='text-danger'>{props.errors.lat}</p>) : null}
                                </div>
                                <div className="form-group my-2">
                                    <label htmlFor="lng">Lng</label>
                                    <input type="text" name='lng' value={props.values.lng} onChange={props.handleChange} onBlur={props.handleBlur} className="form-control" id='lng' />
                                    {props.errors.lng && props.touched.lng ? (<p className='text-danger'>{props.errors.lng}</p>) : null}
                                </div>
                                <Button type='submit' variant="warning" >{DataSave?'Updating...':'Update'}</Button>
                            </form>
                        )}
                    </Formik>) : <p>looding</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditData