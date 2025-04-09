import React from 'react'
import { useForm } from 'react-hook-form';
import { axiosWithCredential } from '../api/axios';

const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    axiosWithCredential.post('/auth/login', data)
      .then((response) => {
        console.log(response.data);
        // Handle successful login here
      })
      .catch((error) => {
        console.error('There was an error!', error);
        // Handle error here
      });
  };
  console.log(errors);

  return (
    <div className='w-full h-screen flex items-center justify-center bg-[#f5f5f5]'>
      <div className="max-w-md relative flex flex-col p-4 rounded-md text-black bg-white">
          <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome back to <span className="text-[#7747ff]">App</span></div>
          <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="block relative"> 
          <label htmlFor="username" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Username</label>
          <input type="text" {...register('username')} id="username" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0" />
          
          </div>
          <div className="block relative"> 
          <label htmlFor="password" className="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
          <input type="text" {...register("password")} id="password" className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0" />
          
          </div>
          <div>
          <a className="text-sm text-[#7747ff]" href="#">Forgot your password?
          </a></div>
          <button type="submit" className="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">Submit</button>

      </form>
      <div className="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a className="text-sm text-[#7747ff]" href="#">Sign up for free!</a></div>
      </div>
    </div>
  )
}

export default LogIn