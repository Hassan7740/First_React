import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState('');
  const [errorList, seterrorList] = useState([])
  let navigate = useNavigate(); 
 
  function formVaildator(user) {
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(30).required(),
      last_name: Joi.string().alphanum().min(3).max(30).required(),
      age: Joi.number().min(16).max(100),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,5}/)

    })
    return schema.validate(user , {abortEarly : false});
  }


  const [user, setuser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  })

  function getUser(e) {
    e.preventDefault();
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);

  }

  async function submitRegister(e) {
    e.preventDefault();
    setisLoading(true);
    let validationResult = formVaildator(user);

    if (validationResult.error) {
      setisLoading(false);
       seterrorList(validationResult.error.details)
    }
    else {
      let { data } = await axios.post('https://routeegypt.herokuapp.com/signup', user);
      if (data.message === 'success') {
        setisLoading(false);
        navigate('/signin')
        
      } else {
        setisLoading(false);
        console.log(data);
        setError(data.message);
      }

    }
  }


  return (
    <div>
      <h1 className='my-3'>Register Now</h1>
      {errorList.map ((error , index) => <div id={index} className='alert alert-danger'>{error.message}</div> )}
      {error ? <div className='alert alert-danger'>{error}</div> : ""}
      <form onSubmit={submitRegister}>
        <label htmlFor="first_name" >first name :</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='first_name' id='first_name' />

        <label htmlFor="last_name" >last name :</label>
        <input onChange={getUser} type="text" className='form-control my-3' name='last_name' id='last_name' />

        <label htmlFor="age" >age :</label>
        <input onChange={getUser} type="number" className='form-control my-3' name='age' id='age' />

        <label htmlFor="email" >email :</label>
        <input onChange={getUser} type="email" className='form-control my-3' name='email' id='email' />

        <label htmlFor="password" >password :</label>
        <input onChange={getUser} type="password" className='form-control my-3' name='password' id='password' />

        <button className='btn btn-outline-info my-3 ms-auto'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'register'}</button>
      </form>
    </div>
  )
}
