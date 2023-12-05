import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name: Yup.string().trim().min(2).max(25).required("plz enter your name"),
    password: Yup.string().trim().min(5).required('plz enter your password'),
})