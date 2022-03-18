import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [error, setError] = useState('');
  const [isLoading, setisLoading] = useState('');
  const [errorList, seterrorList] = useState([]);
  let navigate = useNavigate();
  function formVaildator(user) {
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/)
    })
    return schema.validate(user , {abortEarly : false});
  }


  const [user, setuser] = useState({
    email: "",
    password: ""
  })

  function getUser(e) {
    e.preventDefault();
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setuser(myUser);

  }

  async function submitSignIn(e) {
    e.preventDefault();
    setisLoading(true);
    let validationResult = formVaildator(user);

    

    if (validationResult.error) {
      setisLoading(false);
      seterrorList(validationResult.error.details)
    }
    else {
      let { data } = await axios.post('https://routeegypt.herokuapp.com/signin', user);
      if (data.message === 'success') {
        setisLoading(false);
        navigate('/home');
      } else {
        setisLoading(false);
        console.log(data);
        setError(data.message);
      }

    }
  }


  return (
    <div>
      <h1 className='my-3'>SignIn Now</h1>
      {errorList.map ((error , index) => <div id={index} className='alert alert-danger'>{error.message}</div> )}
      {error ? <div className='alert alert-danger'>{error}</div> : ""}
      <form onSubmit={submitSignIn}>
        
        <label htmlFor="email" >email :</label>
        <input onChange={getUser} type="email" className='form-control my-3' name='email' id='email' />

        <label htmlFor="password" >password :</label>
        <input onChange={getUser} type="password" className='form-control my-3' name='password' id='password' />

        <button className='btn btn-outline-info me-auto'>{isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Sign In'}</button>
      </form>

    </div>
  )
}
