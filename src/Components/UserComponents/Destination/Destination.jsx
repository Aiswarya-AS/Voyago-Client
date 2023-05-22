import React, { useEffect, useState } from 'react'
import './Destination.css'
import { useParams } from 'react-router-dom'
import axios from '../../../utilis/axios';
import { destinationDetailPost  } from '../../../utilis/constants';
import GuideList from '../Guide/GuideList'
// import GuideList from '../Guide/GuideList'
const Destination = () => {
    const parms=useParams()
    const [desList,setDesList] = useState('')
    

    useEffect(()=>{
        axios.get(`${destinationDetailPost}/${parms.id}`).then((res)=>{
            setDesList(res.data)
            
        })

    },[])
  return (
    <>
      {/* <div className='d-flex flex-row aligin-items center col-md-12'>
        <div className='col-md-6'>
            <p>image</p>
        </div>
        <div className='col-md-6'>
            description
        </div>
      </div> */}
      
      	<div className="container">
		<div className="card">
			<div className="container-fliud">
				<div className="wrapper row">
					<div className="preview col-md-6">
						
						<div class="preview-pic tab-content">
                            <div class="tab-pane active" id="pic-1"><img src={`https://res.cloudinary.com/dmysmwucj/${desList.thumbnail}`} /></div>
                    
						</div>
						{/* <ul class="preview-thumbnail nav nav-tabs">
                            <li class="active"><a data-target="#pic-1" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                            <li><a data-target="#pic-2" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                            <li><a data-target="#pic-3" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                            <li><a data-target="#pic-4" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
                            <li><a data-target="#pic-5" data-toggle="tab"><img src="http://placekitten.com/200/126" /></a></li>
						</ul> */}
						
					</div>
					<div class="details col-md-6">
						<h3 class="product-title">{desList.state},{desList.country}</h3>
						<div class="rating">
							{/* <div class="stars">
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star checked"></span>
								<span class="fa fa-star"></span>
								<span class="fa fa-star"></span>
							</div> */}
							<span class="review-no" >{desList.location}</span>
						</div>
						<p class="product-description mt-5">{desList.description}.</p>
						{/* <h4 class="price">current price: <span>$180</span></h4>
						<p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p> */}
			
						
					</div>
				</div>
			</div>
		</div>
	</div>
    <GuideList place={desList.country}/>
    </>
  )
}

export default Destination
