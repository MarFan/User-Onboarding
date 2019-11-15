import React from 'react'
import {withFormik, Form, Field} from 'formik';
import * as yup from 'yup';

const UserForm = props => {
    return (
        <div>
            <h3>The Form</h3>
            <Form>
                <Field type="text" name="name" placeholder="Your Name" />
            </Form>
        </div>
    )
}

const anotherForm = withFormik({
    mapPropsToValues: (values) => {
      return {
        name: values.name || ''
      }
    },
    validationsSchema: yup.object().shape({
      name: yup.string().required('Species is required!')
    }),
    handleSubmit: (values) => {
      console.log(values)
    }
  })(UserForm)

// const FormikUserForm = withFormik({
//     mapPropsToValues({name}) {
//         return {
//             name: name || ""
//         }
//     },
//     validationSchema: Yup.object().shape({
//         name: Yup.string().required()
//     })
// })(UserForm)

export default UserForm;