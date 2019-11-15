import React, { useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import {Row, Col, Button, FormGroup, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';

const UserForm = ({values, errors, touched, status}) => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        status && setUserList(userList => [...userList, status]);
    }, [status]);

    return (
        <Row>
          <Col xs="12" sm="4">
            <h3>Show me the form</h3>
            <Form>
              <FormGroup>
                  <Label htmlFor="usernameInput">User Name</Label>
                  <Field id="usernameInput" name="username" type="text" placeholder="Username" className="form-control" />
                  {touched.username && errors.username ? <small id="" className="form-text text-danger">{errors.username}</small> : null}
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="nameInput">Your Name</Label>
                  <Field id="nameInput" name="name" type="text" placeholder="Your Name" className="form-control" />
                  {touched.name && errors.name ? <small id="" className="form-text text-danger">{errors.name}</small> : null}
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="emailInput">Email Address</Label>
                  <Field id="emailInput" name="email" type="text" placeholder="Your Email Address" className="form-control" />
                  {touched.email && errors.email ? <small id="" className="form-text text-danger">{errors.email}</small> : null}
              </FormGroup>
              <FormGroup>
                  <Label htmlFor="passwordInput">Password</Label>
                  <Field id="passwordInput" name="password" type="password" placeholder="Create a Password" className="form-control" />
                    {touched.password && errors.password ? <small id="" className="form-text text-danger">{errors.password}</small> : null}
                </FormGroup>
                <FormGroup>
                    <Label for="roleSelect">Role</Label>
                    <Field id="roleSelect" as="select" name="role" className="form-control">
                        <option value="0"></option>
                        <option value="Master">Master</option>
                        <option value="Padawan">Padawan</option>
                        <option value="Sentinel">Sentinel</option>
                        <option value="Temple Guard">Temple Guard</option>
                        <option value="Knight">Knight</option>
                        <option value="Consular">Consular</option>
                        <option value="Grand Master">Grand Master</option>
                    </Field>
                    {touched.role && errors.role ? <small id="" className="form-text text-danger">{errors.role}</small> : null}
                </FormGroup>
                <FormGroup>
                    <Label for="weaponSelect">Weapon of Choice</Label>
                    <Field id="weaponSelect" as="select" name="weapon" className="form-control">
                        <option value="0"></option>
                        <option value="Lightsaber">Lightsaber</option>
                        <option value="Blaster">Blaster</option>
                        <option value="Thermal Detonator">Thermal Detonator</option>
                        <option value="Bowcaster">Bowcaster</option>
                        <option value="Lightsaber Pike">Lightsaber Pike</option>
                    </Field>
                    {touched.weapon && errors.weapon ? <small id="" className="form-text text-danger">{errors.weapon}</small> : null}
                </FormGroup>
                <div className="form-check">
                  <Field id="tosInput" name="tos" type="checkbox" className="form-check-input" />
                  <Label htmlFor="tosInput" className="form-check-label">I agree to do whatever </Label>
                  {touched.tos && errors.tos ? <small id="" className="form-text text-danger">{errors.tos}</small> : null}
                </div>
                <Row className="justify-content-end">
                    <Button color="primary" type="submit">Submit</Button>
                </Row>
            </Form>
          </Col>
          <Col xs="12" sm="8">
            <h2>User List</h2>
            <ListGroup>
            {
              userList.map(u => (
                <ListGroupItem key={u.id}>
                  <ListGroupItemHeading>({u.role} {u.username}) - {u.name}</ListGroupItemHeading>
                  <ListGroupItemText>
                    Weapon: {u.weapon} <br />
                    Biometrics: {u.email}
                  </ListGroupItemText>
                </ListGroupItem>
              ))
            }
            </ListGroup>
              
            </Col>
        </Row>
    )
}

const UserFormik = withFormik({
    mapPropsToValues: values => {
      return {
        username: values.username || "",
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
        role: values.role || "",
        weapon: values.weapon || "",
        tos: values.tos || false
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Let us know your desired Username.').min(6, 'Your username needs to be more than 6 characters.'),
      name: Yup.string().required('Please, Sir. What is your name?'),
      email: Yup.string().email().required('We promise not to spam you.'),
      password: Yup.string().min(4, 'Must be atleast 8 characters').required('No password?  You need that.'),
      role: Yup.string().required('How good do you think you are?'),
      weapon: Yup.string().required('Better grab a weapon to defend yourself!'),
      tos: Yup.bool().oneOf([true], 'Not so fast!')
    }),
    handleSubmit(values, { resetForm, setStatus }) {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          setStatus(res.data);
        })
        .catch(err => console.log(`Error: ${err.response}`))
        .finally(resetForm())
    }
  })(UserForm);

export default UserFormik;