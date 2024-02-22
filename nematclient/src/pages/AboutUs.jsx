import React from 'react'
import bannerImage from "../assets/HomePage/about-banner.png"
import mobileImage from "../assets/HomePage/about-banner-mobile.png"
import udaipur from "../assets/HomePage/Udaipur.png"
import mumbai from "../assets/HomePage/mumbai.png"
import himachal_Pradesh from "../assets/HomePage/Himachal-Pradesh.png"
import global from "../assets/HomePage/Global.png" 
 
const AboutUs = () => {
  return (
    <div>
       <div id="mainSection" className="aboutSection">
      <div className="heroSection">
        <div className="banner">
          <img className="desktop" src={bannerImage} alt="banner" />
          <img className="mobile" src={mobileImage} alt="banner" />
        </div>
        <div className="content d-flex flex-column align-items-center gap-2">
          <h1 className="text-capitalize">Discover the 170-year-old legacy of Nemat</h1>
          <p>Nemat Enterprises is a family-owned business with a rich heritage of crafting attars and fragrances. Our commitment to quality, tradition, and innovation has earned us global recognition.</p>
        </div>
      </div>

      <div className="history ">
        <div className="content">
          <div className="history-pictures flex ">
            {/* Path SVG elements */}
            <div className="path">
              <div className="desktop">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1303 406" fill="none">
                  <path d="M78.4994 156.5C78.4994 243.5 -15.5669 256.5 2.99873 338.5C25.8562 439.456 171.766 415.292 243 331.952C304.5 260 346.575 201.071 481.5 212.5C616.425 223.929 682.83 392.006 875 301.5C1030 228.5 1040.42 98.8486 1102 39.4995C1171 -27 1243.5 5.49968 1302 39.4997" stroke="#642F29" strokeWidth="0.634942" strokeDasharray="3.17 3.17" />
                </svg>
              </div>
              <div className="mobile">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "100%", width: "100%" }} viewBox="0 0 318 491" fill="none">
                  <path d="M296.33 457.763C282.005 448.063 271.915 444.982 254.83 442.263C232.533 438.715 219.204 442.675 197.33 448.263C179.903 452.715 171.169 458.443 154.33 464.763C136.806 471.341 127.363 476.247 109.33 481.263C93.2072 485.748 83.9924 491.311 67.3296 489.763C49.5612 488.114 38.3871 483.927 25.3296 471.763C10.1697 457.642 7.67075 443.622 3.82958 423.263C0.716198 406.762 -0.549842 396.475 3.82958 380.263C8.18792 364.13 14.9272 356.343 25.3296 343.263C36.6859 328.985 45.5125 323.072 59.8296 311.763C91.1142 287.054 113.378 279.998 148.83 261.763C189.384 240.904 254.829 214.264 254.829 214.264C254.829 214.264 294.454 195.764 302.33 181.763C310.205 167.763 312.829 156.264 315.83 137.763C318.83 119.263 317.591 98.2078 308.83 75.2634C298.7 48.7372 288.26 33.0469 264.33 17.7634C235.378 -0.727243 176 1.49995 176 1.49995C176 1.49995 131.17 4.2366 86.5 36C86.5 36 68 49 51.5 68" stroke="#353535" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
            {/* End Path SVG elements */}

            {/* History boxes */}
            <div className="box history-1 d-flex flex-column align-items-center col-6 col-md-6 col-xl-3 exploreCitySection" data-bs-target="#carouselHistory" data-bs-slide-to="0">
              <img src={udaipur} alt="image" />
              <h3>Udaipur</h3>
              <span>19th Century</span>
            </div>
            <div className="box history-2 d-flex flex-column align-items-center col-6 col-md-6 col-xl-3 exploreCitySection" data-bs-target="#carouselHistory" data-bs-slide-to="1">
              <img src={mumbai} alt="image" />
              <h3>Mumbai</h3>
              <span>1984</span>
            </div>
            <div className="box history-3 d-flex flex-column align-items-center col-6 col-md-6 col-xl-3 exploreCitySection" data-bs-target="#carouselHistory" data-bs-slide-to="2">
              <img src={himachal_Pradesh} alt="image" />
              <h3>Himachal Pradesh</h3>
              <span>2005</span>
            </div>
            <div className="box history-4 d-flex flex-column align-items-center col-6 col-md-6 col-xl-3 exploreCitySection" data-bs-target="#carouselHistory" data-bs-slide-to="3">
              <img src={global} alt="image" />
              <h3>Global</h3>
              <span>Now</span>
            </div>
            {/* End History boxes */}
          </div>

          {/* History Overlay */}
          <div className="overlay" id="historyOverlays" style={{ display: "none" }}>
            <div className="background"></div>
            <div className="content">
              <div id="carouselHistory" className="carouselHistorySlider carousel slide" data-bs-ride="carousel">
                {/* Carousel items */}
                <div className="carousel-inner">
                  {/* Carousel items */}
                  {/* You can add carousel items here */}
                </div>
                {/* Carousel controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselHistory" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselHistory" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          {/* End History Overlay */}
        </div>
      </div>

      {/* Add the remaining HTML content here */}

    </div>
    </div>
  )
}

export default AboutUs