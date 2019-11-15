import React, {useState, useEffect} from 'react'
import {useFormik, withFormik, Form, Field} from 'formik'
// import {Container, Row, Col, FormGroup, Input, Label, Button} from 'reactstrap'
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        status && setUserList(userList => [...userList, status]);
    }, [status]);
    
    return (
        <div className="anotherForm">
            <Form>
                <Field name="name" type="text" placeholder="Your Name" />
                <Field name="email" type="text" placeholder="Email Address" />
                <Field name="password" type="password" placeholder="Password" />
                <Field name="password2" type="password" placeholder="Password" />
                <button type="submit">Submit</button>
            </Form>
        </div>
    )    
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, password2, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            password2: password2 || "",
            tos: tos || ""
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Please, Sir. What is your name?'),
        email: Yup.string().email().required('We promise not to spam you.'),
        password: Yup.string().min(8, 'Must be atleast 8 characters').required('No password?  You need that.'),
        password2: Yup.string().min(8, 'Must be atleast 8 characters').required('Something is up with your passwords. Try again!'),
        tos: Yup.bool().oneOf([true], 'Not so fast!')
    }),
    handleSubmit(values, { setStatus }) {
        // post data
        axios.post('https://reqres.in/api/users', values)
            .then(res => {
                setStatus(res.data)
            })
            .catch(err => console.log(`Error: ${err.response}`));
    }
})(UserForm)

export default UserForm;