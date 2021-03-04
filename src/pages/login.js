import React, { useState, useContext } from "react"
import { FirebaseContext } from '../components/Firebase'
import {Form, Input, Button, ErrorMessage} from "../components/common/"
import {navigate} from "gatsby"


import SEO from "../components/seo"


const Login = () => {

  const [formValues, setFormValues] = useState({email: '', password: ''})
  const {firebase} = useContext(FirebaseContext);
  const [errorMessage, setErrorMessage] = useState('')
  
  function handleSubmit(e){
    e.preventDefault();

    firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
      setErrorMessage(error.message);
    }).then(res => {
      navigate('/')
    });
  }

  function handleInputChange(e){
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }))
  }

  return(
    <section>
      <SEO title="Login" />
      <Form onSubmit={handleSubmit}>
        <Input required value={formValues.email} onChange={handleInputChange} name="email" placeholder="email" type="email"></Input>
        <Input required value={formValues.password} onChange={handleInputChange} name="password" placeholder="password" type="password"></Input>
        {!!errorMessage &&
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        }
        <Button type="submit" block >
          Login
        </Button>
      </Form>
    </section>
  );
}

export default Login
