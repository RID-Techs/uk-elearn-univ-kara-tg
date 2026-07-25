import stars from "../assets/stars.png";
import logo from "../assets/learns.png";
import { useEffect, useRef, useState } from "react";
export function WebsiteTour() {
    const [dateOfCreation, setDateOfCreation]  = useState("2024");
    useEffect(() => {
        const getYear = () => {
          const currentYear = new Date().getFullYear().toString();
          
          setDateOfCreation((prevDateOfCreation) => {
            if (!prevDateOfCreation.includes(currentYear)) {
              return `${prevDateOfCreation} - ${currentYear}`;
            }
            return prevDateOfCreation;
          });
        };
      
        getYear();
      }, []);

      const webSections = [
        {
          sectionTitle: "Access the platform and install the application",
          videoLink: "https://drive.google.com/file/d/1hL6HeeGPoPUVEdZgHu_yYA-jAfPv6BxJ/view?usp=drive_link",
          duration: "4:48"
        },
        {
          sectionTitle: "Learning space overview",
          videoLink: "https://drive.google.com/file/d/1huPdo1fU6YzOdoXwxfq3_GxqI8I3RAXC/view?usp=drive_link",
          duration: "3:17"
        },
        {
          sectionTitle: "Answer Hub overview",
          videoLink: "https://drive.google.com/file/d/1ysOket5SouEwjM5CruKduQk3a_oMEvZ5/view?usp=drive_link",
          duration: "2:42"
        },
        {
          sectionTitle: "E-Podcast overview",
          videoLink: "https://drive.google.com/file/d/1dgqXVhppOKYHDFqqV0JZFW-RkZExXquD/view?usp=drive_link",
          duration: "1:14"
        },
        {
          sectionTitle: "Test Center overview",
          videoLink: "https://drive.google.com/file/d/1hzTvphPIMBYmsjFDuFRJkzjOpAAjCU64/view?usp=drive_link",
          duration: "3:45"
        },
        {
          sectionTitle: "E-Quiz overview",
          videoLink: "https://drive.google.com/file/d/1ygorVTL3-hjZdlKs__31CadmqfCVCs6L/view?usp=drive_link",
          duration: "3:06"
        },
        {
          sectionTitle: "E-Collection of Papers overview",
          videoLink: "https://drive.google.com/file/d/1EQojoPJFlvJhDnxHmAef9UxFhRPz_dPD/view?usp=drive_link",
          duration: "2:54"
        },
        {
          sectionTitle: "E-Progress overview",
          videoLink: "https://drive.google.com/file/d/1rD97lpZ3AwCzTzwrfC3LI3tQv1f01gFx/view?usp=drive_link",
          duration: "5:15"
        },
        {
          sectionTitle: "Feedback / Survey overview",
          videoLink: "https://drive.google.com/file/d/195ROP1zdIZpFUnaL29hiPU1magg3MvVN/view?usp=drive_link",
          duration: "1:10"
        },
        {
          sectionTitle: "UK-Elearn Website tour overview",
          videoLink: "https://drive.google.com/file/d/1BXWtNDI5PZT5ovCYj5yjBAk5M0V4009I/view?usp=drive_link",
          duration: "0:57"
        },
      ]
      const moveToItemRef = useRef(null);
      useEffect(() => {
        if (moveToItemRef.current) {
          moveToItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }, [])
  return (
    <>
    <div className="container-fluid header-wraper-home">
            <div className="header-holder">
              <header>
                <img height={50} src={logo} alt="UK-Elearn" />
                <h1>UK-Elearn</h1>
              </header>
            </div>
    
            <div className="header-elements">
              <h3 id="member">
                Enjoy learning here <img className="member-stars" height={52} src={stars} alt="stars" />{" "}
              </h3>
            </div>
          </div>

          <div ref={moveToItemRef} className="video-title sign-up-and-in-holder">
              <h1>UK-Elearn Website tour</h1>
          </div>

    <section className="tuto-section">
      {
        webSections.map((section, index) => (
          <div key={index} className="video-holder">
            <div className="video-card-header">
              <a href={section.videoLink} rel="noopener noreferrer">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
              </svg>
            </span>
            <span>Play</span>
          </a>
            </div>
            <div className="video-card-body">
              <p>{section.sectionTitle}</p>
              <div className="video-duration">
                <p>Duration: {section.duration}</p>
              </div>
            </div>
          </div>
        ))
      }
    </section>

    <footer className="container-fluid welcome-footer">
                    <div className="footer-first-part">
          
                    <div className="header-holder">
                        <div className="header-footer">
                          <img height={32} src={logo} alt="UK-Elearn" />
                          <h3>UK-Elearn</h3>
                        </div>
                      </div>
          
                  </div>
          
                  <div className="footer-second-part">
                      <div className="privacy">
                      <div className="rights">
                        <p>&copy; {dateOfCreation} | All Rights Reserved</p>
                      </div>
          
                      <div className="author">
                        <p>Made with <span style={{ color: "red" }}>&hearts;</span> by UK-Elearn</p>
                      </div>
                      </div>
          
                      <div className="social-links">
                      <div className="whatsapp-content-2">
                        <a
                          href="https://chat.whatsapp.com/KEHsubuy8gKBogstCaBPzq"
                          target="_blank"
                        >
                          {" "}
                          <svg
                            id="whatsapp-icon"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                          >
                            <path d="M27.281 4.65c-2.994-3-6.975-4.65-11.219-4.65-8.738 0-15.85 7.112-15.85 15.856 0 2.794 0.731 5.525 2.119 7.925l-2.25 8.219 8.406-2.206c2.319 1.262 4.925 1.931 7.575 1.931h0.006c0 0 0 0 0 0 8.738 0 15.856-7.113 15.856-15.856 0-4.238-1.65-8.219-4.644-11.219zM16.069 29.050v0c-2.369 0-4.688-0.637-6.713-1.837l-0.481-0.288-4.987 1.306 1.331-4.863-0.313-0.5c-1.325-2.094-2.019-4.519-2.019-7.012 0-7.269 5.912-13.181 13.188-13.181 3.519 0 6.831 1.375 9.319 3.862 2.488 2.494 3.856 5.8 3.856 9.325-0.006 7.275-5.919 13.188-13.181 13.188zM23.294 19.175c-0.394-0.2-2.344-1.156-2.706-1.288s-0.625-0.2-0.894 0.2c-0.262 0.394-1.025 1.288-1.256 1.556-0.231 0.262-0.462 0.3-0.856 0.1s-1.675-0.619-3.188-1.969c-1.175-1.050-1.975-2.35-2.206-2.744s-0.025-0.613 0.175-0.806c0.181-0.175 0.394-0.463 0.594-0.694s0.262-0.394 0.394-0.662c0.131-0.262 0.069-0.494-0.031-0.694s-0.894-2.15-1.219-2.944c-0.319-0.775-0.65-0.669-0.894-0.681-0.231-0.012-0.494-0.012-0.756-0.012s-0.694 0.1-1.056 0.494c-0.363 0.394-1.387 1.356-1.387 3.306s1.419 3.831 1.619 4.1c0.2 0.262 2.794 4.269 6.769 5.981 0.944 0.406 1.681 0.65 2.256 0.837 0.95 0.3 1.813 0.256 2.494 0.156 0.762-0.113 2.344-0.956 2.675-1.881s0.331-1.719 0.231-1.881c-0.094-0.175-0.356-0.275-0.756-0.475z"></path>
                          </svg>{" "}
                          UK-Elearn Crew
                        </a>
                      </div>
          
                      <div className="average-content">
                        <a href="https://ma-moyenne-univ-tg.onrender.com/" target="_blank">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M19 2a3 3 0 0 1 3 3v14a3 3 0 0 1 -3 3h-14a3 3 0 0 1 -3 -3v-14a3 3 0 0 1 3 -3zm-3 6c0 -1.014 -1.336 -1.384 -1.857 -.514l-2.143 3.57l-2.143 -3.57c-.521 -.87 -1.857 -.5 -1.857 .514v8a1 1 0 0 0 1 1l.117 -.007a1 1 0 0 0 .883 -.993v-4.39l1.143 1.904l.074 .108a1 1 0 0 0 1.64 -.108l1.143 -1.904v4.39a1 1 0 0 0 2 0z" />
                          </svg>{" "}
                          Ma-moyenne
                        </a>
                      </div>
                      </div>
              
                      <div className="Phone-number">
                        <p>Contact : +228 79 83 62 19</p>
                      </div>
                    </div>
                    </footer>
    </>
  )
}