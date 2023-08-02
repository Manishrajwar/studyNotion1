import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { contactusEndpoint } from "../../services/api";
import CountryCode from "../../data/countrycode.json"
import {makeUnauthenticatedPOSTRequest } from "../../services/serverHelper"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();


    
    const submitContactForm = async (data) => {
      setLoading(true);
      console.log("login data", data);
      try {
        setLoading(true);
        const resonse = await makeUnauthenticatedPOSTRequest(
          contactusEndpoint.CONTACT_US_API,
          data
        );
        console.log(`contacr response`, resonse);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-6 mb-10'>
            <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col gap-2 w-[50%]'>
                    <label htmlFor='firstname' className='text-left'>First Name</label>
                    <input   
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
                        {...register("firstname", {required:true})}
                         style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col gap-2 w-[50%]'>
                    <label htmlFor='lastname' className='text-left'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px]'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                        style={{
                          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='email' className='text-left'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className=' w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-white'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col gap-2'>

                <label htmlFor='phonenumber ' className='text-left'>Phone Number</label>

                <div className='flex flex-row gap-3'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown" 
                            className='text-white w-[13%] rounded-[0.5rem] bg-richblack-800 p-[12px] pr-2'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-white w-[85%] rounded-[0.5rem] bg-richblack-800 p-[12px]'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message' className='text-left'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='text-white w-full rounded-[0.5rem] bg-richblack-800 p-[12px] overflow-hidden resize-none'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            PLease enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 text-[16px] font-bold py-4 text-black'>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm





