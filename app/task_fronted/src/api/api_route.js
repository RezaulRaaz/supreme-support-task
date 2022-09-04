const BaseUrl='https://supremeserver.siabd.xyz/api/';
const Api = {
    data_post_url:BaseUrl+'data/store',  //post route
    data_get_location_list_url:BaseUrl+'data_list', //get route
    data_get_single_location_url:BaseUrl+'single_location_data', //with id parameter ---get route
    data_update:BaseUrl+'data/update', //update route ---post route
    data_location_delete:BaseUrl+'data/delete', //delete route with id parameter ---get route
}

export default Api;