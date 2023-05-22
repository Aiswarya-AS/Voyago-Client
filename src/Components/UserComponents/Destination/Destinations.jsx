import React, { useState } from "react";
import styled from "styled-components";
import info1 from "../../../assets/info1.png";
import info2 from "../../../assets/info2.png";
import info3 from "../../../assets/info3.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Destinations() {
    const location=useLocation()
    console.log(location.state.data);
    const navigate=useNavigate()
    const [destination]=useState(location.state.data)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
  
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    // Get the items to display on the current page
    const displayedDestinations = destination.slice(startIndex, endIndex);
  
    // Handle page change
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    // Go to the previous page
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Go to the next page
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  return (
    <Section id="recommend">
      <div className="title">
        <h1 className="text-center" style={{paddingLeft:'3rem'}}>DESTINATIONS</h1>
      </div>
      <div className="packages">

      </div>
      <div className="destinations">
        {destination.map((destination,index) => {
          return (
            <a style={{textDecoration:'none',color:'black'}} onClick={()=>navigate(`/destination/${destination.id}`)}>
            <div className="destination" key={index}>
              <img src={`https://res.cloudinary.com/dmysmwucj/${destination.thumbnail}`} alt="" />
              <h3>{destination.country},{destination.state}</h3>
              <p>{destination.location}</p>
              <div className="info">
                <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <h4>{destination.cost}</h4>
              </div>
              <div className="distance">
                <span>1000 Kms</span>
                <span>{destination.duration}</span>
              </div>
            </div>
            </a>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        {Array.from(Array(Math.ceil(destination.length / itemsPerPage)).keys()).map((pageNumber) => (
          <button
            key={pageNumber + 1}
            onClick={() => handlePageChange(pageNumber + 1)}
            className={currentPage === pageNumber + 1 ? "active" : ""}
          >
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(destination.length / itemsPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </Section>
  );
}

const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;
