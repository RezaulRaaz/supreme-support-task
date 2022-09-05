import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { useFormik } from 'formik';
import { DataValidation } from '../schemas';
import DataList from './DataList';
import Axios from 'axios';
import Api from '../api/api_route';
import './../App.css';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
function Home() {
    const [Location, setLocation] = useState([]);
    //bootstrap modal show close
    const [query, setQuery] = useState([]);
    const [DataSave, setDataSave] = useState(false);


    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    // form data
    const initialValues = {
        title: '',
        address: '',
        suburb: '',
        state: '',
        zip: '',
        lat: '',
        lng: ''
    }
    //formik form handle
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: { initialValues },
        validationSchema: DataValidation,
        onSubmit: (values, action) => {
            setDataSave(true)
            const url = Api.data_post_url;
            Axios.post(url, values).then(res => {
                LocationData();
                setDataSave(false)
                handleClose();
                toast("Data Save Successfuly");
            });
            action.resetForm();
        },

    });


    //get location data from server
    const LocationData = () => {
        const url = Api.data_get_location_list_url;
        Axios.get(url).then(res => {
            setLocation(res.data.data)
        });
    }

    const DeleteLocation = (data) => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        const url = Api.data_location_delete + '/' + data.id;
                        Axios.get(url).then(res => {
                            toast("Data Deleted");
                            LocationData();
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: () => toast("Your Data Is Safe")
                }
            ]
        });
    }

    const searchKeys = [
        'title',
        'address',
        'suburb',
        'state',
        'zip',
        'lat',
        'lng']
    const search = (data) => {

        return data.filter(
            (item) =>
                searchKeys.some((key) =>
                    item[key].toLowerCase().includes(query)
                )
        )
    }

    useEffect(() => {
        LocationData();
    }, []);

    return (
        <div className='container my-5'>
            <div className='d-flex justify-content-between'>
                <div>
                    <Button variant="primary" onClick={handleShow}>
                        Add +
                    </Button>
                </div>
                <div className="form-group my-2">
                    <input type="text" name='search' onChange={e => setQuery(e.target.value)} className="form-control" placeholder='search' />
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group my-2">
                            <label htmlFor="title">Title</label>
                            <input type="text" name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} className="form-control" id='title' placeholder='Title' />
                            {errors.title && touched.title ? (<p className='text-danger'>{errors.title}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="address">Address</label>
                            <input type="text" name='address' value={values.address} onChange={handleChange} onBlur={handleBlur} className="form-control" id='address' placeholder="Address" />
                            {errors.address && touched.address ? (<p className='text-danger'>{errors.address}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="suburb">Suburb</label>
                            <input type="text" name='suburb' value={values.suburb} onChange={handleChange} onBlur={handleBlur} className="form-control" id='suburb' />
                            {errors.suburb && touched.suburb ? (<p className='text-danger'>{errors.suburb}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="state">State</label>
                            <input type="text" name='state' value={values.state} onChange={handleChange} onBlur={handleBlur} className="form-control" id='state' />
                            {errors.state && touched.state ? (<p className='text-danger'>{errors.state}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" name='zip' value={values.zip} onChange={handleChange} onBlur={handleBlur} className="form-control" id='zip' />
                            {errors.zip && touched.zip ? (<p className='text-danger'>{errors.zip}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="lat">Lat</label>
                            <input type="text" name='lat' value={values.lat} onChange={handleChange} onBlur={handleBlur} className="form-control" id='lat' />
                            {errors.lat && touched.lat ? (<p className='text-danger'>{errors.lat}</p>) : null}
                        </div>
                        <div className="form-group my-2">
                            <label htmlFor="lng">Lng</label>
                            <input type="text" name='lng' value={values.lng} onChange={handleChange} onBlur={handleBlur} className="form-control" id='lng' />
                            {errors.lng && touched.lng ? (<p className='text-danger'>{errors.lng}</p>) : null}
                        </div>
                        <Button type='submit' variant="primary" >{DataSave?'Saving':'Save'}</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            {/* Data Table start */}

            <div className='text-center'>
                {
                    Location.length > 0 ? (<DataList list={search(Location)} handleDelete={DeleteLocation} />) : <Spinner animation="grow" />
                }
            </div>
            {/* Data Table end */}
        </div>
    )
}

export default Home