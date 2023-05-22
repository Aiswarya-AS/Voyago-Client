import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { guideProfile } from '../../../utilis/constants';
import axios from '../../../utilis/axios'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const GDetails = (props) => {
    const navigate = useNavigate()
    const {register,handleSubmit,reset,setValue,formState: { errors }} =useForm();
    useEffect(() => {
        
        setValue('firstname', props.data.firstname);
        setValue('lastname', props.data.lastname);
        setValue('email', props.data.email);
        setValue('phone', props.data.phone);
        setValue('place', props.data.place);
        setValue('pincode', props.data.pincode);
        setValue('state', props.data.state);
        setValue('country', props.data.country);
        setValue('pricing', props.data.pricing);
        setValue('languages_known', props.data.languages_known);
        setValue('description', props.data.description);
        // setValue('image', props.data.image[0]);
        // setValue('video', props.data.video[0]);
      }, [props.data]);
    
    const onSubmit=async (data)=>{
        console.log(data,'Evide athiddaaa kuttaaaa');
        const formData = new FormData();
        formData.append('firstname',data.firstname)
        formData.append('lastname',data.lastname)
        formData.append('email',data.email)
        formData.append('phone',data.phone)
        formData.append('place',data.place)
        formData.append('pincode',data.pincode)
        formData.append('state',data.state)
        formData.append('country',data.country)
        formData.append('pricing',data.pricing)
        formData.append('languages_known',data.languages_known)
        formData.append('description',data.description)
        formData.append('image',data.image[0])
        formData.append('video',data.video[0])
        console.log(data.video[0]);
        axios.post(`${guideProfile}/${props.data.id}`,formData,{
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res)=>{
            if (res.data.status === 'true'){
                props.guideDetails();
                console.log(res.data,'response athiddaa mwoneee');
                toast.success('Profile successfully')
            }
           
           
        })
    }
    
  return (
    <>
    <form enctype="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
    <div className='container'style={{width:"60rem"}}>
        <div className='row col-md-12'>
           <div className='col-md-6'>
            <h4 className='text-center mb-4'>Personal Details</h4>
        {/* <form className='col-md-12 mx-3'> */}
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
        <div class="row mb-4">
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example1">First name</label>
                <input type="text" {...register('firstname')} defaultValue={props.data.firstname} id="form6Example1" class="form-control" />
            </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example2">Last name</label>
                <input type="text" defaultValue={props.data.lastname} {...register('lastname')} id="form6Example2" class="form-control" />
            </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example1">Email Address</label>
                <input type="email" defaultValue={props.data.email}{...register('email')}  class="form-control" />
            </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example2">Phone</label>
                <input type="number" defaultValue={props.data.phone}{...register('phone')} class="form-control" />
            </div>
            </div>
        </div>


        <div class="row mb-4">
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example1">Place</label>
                <input type="text" defaultValue={props.data.place} {...register('place')} class="form-control" />
            </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example2">Pincode</label>
                <input type="text" defaultValue={props.data.pincode} {...register('pincode')} class="form-control" />
            </div>
            </div>
        </div>

        <div class="row mb-4">
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example1">State</label>
                <input type="text" defaultValue={props.data.state} {...register('state')} class="form-control" />
            </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example2">Country</label>
                <input type="text" defaultValue={props.data.country} {...register('country')} class="form-control" />
            </div>
            </div>
        </div>

        
    {/* </form> */}
           </div>

           <div className='col-md-6 mx-3' style={{width:"27rem"}}>
           <h4 className='text-center mb-4'>Additional  Details</h4>
           {/* <form className='col-md-12 mx-3'> */}
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
    
        <div class="form-outline mb-4">
            <label class="form-label" for="form6Example6">Pricing</label>
            <input type="number" defaultValue={props.data.pricing} {...register('pricing')} class="form-control" />
        </div>

        <div class="form-outline mb-4">
            <label class="form-label" for="form6Example6">Languages Known</label>
            <input type="text" defaultValue={props.data.languages_known} {...register('languages_known')} class="form-control" />
        </div>


        <div class="row mb-4">
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example1">Upload Profile Picture</label>
                <input type="file"  {...register('image')} class="form-control" />
            </div>
            </div>
            <div class="col">
            <div class="form-outline">
                <label class="form-label" for="form6Example2">Upload Video</label>
                <input type="file"{...register('video')} class="form-control" />
            </div>
            </div>
        </div>

        <div class="form-outline mb-4">
            <label class="form-label" for="form6Example7">Description</label>
            <textarea class="form-control" defaultValue={props.data.description} {...register('description')}id="form6Example7" rows="1"></textarea>
        </div>
        

        
    {/* </form> */}
       
           </div>
        </div>
        <div className='text-center mt-3' >
           <button className='btn btn-outline-primary' type='submit'> Save Changes</button>
        </div> 

    </div>
    </form>
    </>
  )
}

export default GDetails
