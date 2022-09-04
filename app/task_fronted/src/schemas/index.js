import * as Yup from 'yup'
export const DataValidation = Yup.object({
    title:Yup.string().required("Please Enter Title"),
    lat:Yup.string().required("Please Enter Latitude"),
    lng:Yup.string().required("Please Enter Longitude"),
});