import * as Yup from 'yup';
export const ValidationForm = Yup.object().shape({
    name: Yup.string().min(4).required("Please Enter name"),
    email: Yup.string().email("Please Enter Valid Email"),
    phone: Yup.string().required("required").min(10, "too short").max(10, "too long"),
    fav_language: Yup.string().required("Please select a favourite language"),
    frameworks: Yup.array().min(1, 'Please select at least one frontend framework'),
    filterSelect: Yup.string().required("Please select a task")
});