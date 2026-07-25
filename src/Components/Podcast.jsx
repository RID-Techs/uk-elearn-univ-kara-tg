import logo from "../assets/learns.png";
import Homepage from "../assets/Homepage.png";
import podcast from "../assets/podcast.png";
import podcast_pic from "../assets/podcast_pic.png";
import { useEffect, useRef, useState } from "react";
import { Sem_5_Podcasts } from "./Podcasts/Sem_5/AllSem_5_Podcasts";
import { Sem_3_Podcasts } from "./Podcasts/Sem_3/All_Sem_3_Podcasts";
import { Unavailable } from "./Podcasts/Unavailable/Unavailable";
import { Sem_1_Podcasts } from "./Podcasts/Sem_1/All_Sem_1_Podcasts";
import { Sem_6_Podcasts } from "./Podcasts/Sem_6/All_Sem_6_Podcasts";
import { Sem_4_Podcasts } from "./Podcasts/Sem_4/All_Sem_4_Podcasts";
import { NavLink } from "react-router-dom";

export function Podcast () {

  const [PodcastSem_1, setPodcastSem_1] = useState(false);
  const [PodcastSem_2, setPodcastSem_2] = useState(false);
  const [PodcastSem_3, setPodcastSem_3] = useState(false);
  const [PodcastSem_4, setPodcastSem_4] = useState(false);
  const [PodcastSem_5, setPodcastSem_5] = useState(false);
  const [PodcastSem_6, setPodcastSem_6] = useState(false);

  const handlePodcastSemester_1 = (e) => {
    setPodcastSem_1(e.target.checked);
    setPodcastSem_2(false);
    setPodcastSem_3(false);
    setPodcastSem_4(false);
    setPodcastSem_5(false);
    setPodcastSem_6(false);
    localStorage.removeItem("podcast-Sem-2");
    localStorage.removeItem("podcast-Sem-3");
    localStorage.removeItem("podcast-Sem-4");
    localStorage.removeItem("podcast-Sem-5");
    localStorage.removeItem("podcast-Sem-6");
    localStorage.setItem("podcast-Sem-1", "true");
  }

  const handlePodcastSemester_2 = (e) => {
    setPodcastSem_2(e.target.checked);
    setPodcastSem_1(false);
    setPodcastSem_3(false);
    setPodcastSem_4(false);
    setPodcastSem_5(false);
    setPodcastSem_6(false);
    localStorage.removeItem("podcast-Sem-1");
    localStorage.removeItem("podcast-Sem-3");
    localStorage.removeItem("podcast-Sem-4");
    localStorage.removeItem("podcast-Sem-5");
    localStorage.removeItem("podcast-Sem-6");
    localStorage.setItem("podcast-Sem-2", "true");
  }
  const handlePodcastSemester_3 = (e) => {
    setPodcastSem_3(e.target.checked);
    setPodcastSem_1(false);
    setPodcastSem_2(false);
    setPodcastSem_4(false);
    setPodcastSem_5(false);
    setPodcastSem_6(false);
    localStorage.removeItem("podcast-Sem-1");
    localStorage.removeItem("podcast-Sem-2");
    localStorage.removeItem("podcast-Sem-4");
    localStorage.removeItem("podcast-Sem-5");
    localStorage.removeItem("podcast-Sem-6");
    localStorage.setItem("podcast-Sem-3", "true");
    
  }
  const handlePodcastSemester_4 = (e) => {
    setPodcastSem_4(e.target.checked);
    setPodcastSem_1(false);
    setPodcastSem_2(false);
    setPodcastSem_3(false);
    setPodcastSem_5(false);
    setPodcastSem_6(false);
    localStorage.removeItem("podcast-Sem-1");
    localStorage.removeItem("podcast-Sem-2");
    localStorage.removeItem("podcast-Sem-3");
    localStorage.removeItem("podcast-Sem-5");
    localStorage.removeItem("podcast-Sem-6");
    localStorage.setItem("podcast-Sem-4", "true");
  }
  const handlePodcastSemester_5 = (e) => {
    setPodcastSem_5(e.target.checked);
    setPodcastSem_1(false);
    setPodcastSem_2(false);
    setPodcastSem_3(false);
    setPodcastSem_4(false);
    setPodcastSem_6(false);
    localStorage.removeItem("podcast-Sem-1");
    localStorage.removeItem("podcast-Sem-2");
    localStorage.removeItem("podcast-Sem-3");
    localStorage.removeItem("podcast-Sem-4");
    localStorage.removeItem("podcast-Sem-6");
    localStorage.setItem("podcast-Sem-5", "true");
  }
  const handlePodcastSemester_6 = (e) => {
    setPodcastSem_6(e.target.checked);
    setPodcastSem_1(false);
    setPodcastSem_2(false);
    setPodcastSem_3(false);
    setPodcastSem_4(false);
    setPodcastSem_5(false);
    localStorage.removeItem("podcast-Sem-1");
    localStorage.removeItem("podcast-Sem-2");
    localStorage.removeItem("podcast-Sem-3");
    localStorage.removeItem("podcast-Sem-4");
    localStorage.removeItem("podcast-Sem-5");
    localStorage.setItem("podcast-Sem-6", "true");
  }

  const getPodcastSem1 = localStorage.getItem("podcast-Sem-1");
  const getPodcastSem2 = localStorage.getItem("podcast-Sem-2");
  const getPodcastSem3 = localStorage.getItem("podcast-Sem-3");
  const getPodcastSem4 = localStorage.getItem("podcast-Sem-4");
  const getPodcastSem5 = localStorage.getItem("podcast-Sem-5");
  const getPodcastSem6 = localStorage.getItem("podcast-Sem-6");

  const isPodcastSem1 = getPodcastSem1 === "true";
  const isPodcastSem2 = getPodcastSem2 === "true";
  const isPodcastSem3 = getPodcastSem3 === "true";
  const isPodcastSem4 = getPodcastSem4 === "true";
  const isPodcastSem5 = getPodcastSem5 === "true";
  const isPodcastSem6 = getPodcastSem6 === "true";

  const currentBox_1 = useRef(null);
  const currentBox_2 = useRef(null);
  const currentBox_3 = useRef(null);
  const currentBox_4 = useRef(null);
  const currentBox_5 = useRef(null);
  const currentBox_6 = useRef(null);

  useEffect(() => {
    if(isPodcastSem1) {
      setPodcastSem_1(true);
      if(currentBox_1.current){
        currentBox_1.current.style.color = "#F8FBFF";
        currentBox_1.current.style.backgroundColor = "#0A2239";
        currentBox_1.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }
    if(isPodcastSem2) {
      setPodcastSem_2(true);
      if(currentBox_2.current){
        currentBox_2.current.style.color = "#F8FBFF";
        currentBox_2.current.style.backgroundColor = "#0A2239";
        currentBox_2.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }
    if(isPodcastSem3) {
      setPodcastSem_3(true);
      if(currentBox_3.current){
        currentBox_3.current.style.color = "#F8FBFF";
        currentBox_3.current.style.backgroundColor = "#0A2239";
        currentBox_3.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }
    if(isPodcastSem4) {
      setPodcastSem_4(true);
      if(currentBox_4.current){
        currentBox_4.current.style.color = "#F8FBFF";
        currentBox_4.current.style.backgroundColor = "#0A2239";
        currentBox_4.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }
    if(isPodcastSem5) {
      setPodcastSem_5(true);
      if(currentBox_5.current){
        currentBox_5.current.style.color = "#F8FBFF";
        currentBox_5.current.style.backgroundColor = "#0A2239";
        currentBox_5.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }
    if(isPodcastSem6) {
      setPodcastSem_6(true);
      if(currentBox_6.current){
        currentBox_6.current.style.color = "#F8FBFF";
        currentBox_6.current.style.backgroundColor = "#0A2239";
        currentBox_6.current.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      }
    }

    const allLabels = document.querySelectorAll("label");
    allLabels.forEach((label) => {

      label.addEventListener("click", (e) => {
        const currentSemester = e.currentTarget;
        allLabels.forEach((subLabel) => {
          subLabel.style.color = "";
          subLabel.style.backgroundColor = ""
          subLabel.style.boxShadow = ""
        })
        currentSemester.style.color = "#F8FBFF";
        currentSemester.style.backgroundColor = "#0A2239";
        currentSemester.style.boxShadow = "-2px -2px 3px #FFCF80, 2px 2px 3px hsl(37, 100%, 35%)";
      })


      label.classList.add("labels-styles");
    })
  }, [isPodcastSem1, isPodcastSem2, isPodcastSem3, isPodcastSem4, isPodcastSem5, isPodcastSem6])
  
  const [dateOfCreation, setDateOfCreation]  = useState("2024")

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

  return  (
    <>
      <div className="page-wrapper">
            <div className="container-fluid header-wraper">
        <div className="header-holder">
          <header>
            <img height={50} src={logo} alt="UK-Elearn" />
            <h1>UK-Elearn</h1>
          </header>
        

        <div id="answers-header" className="header-elements">
          <ul>
            <NavLink to={"/Home"}>
              <li>
                {" "}
                <img height={22} src={Homepage} alt="Semester" /> Homepage{" "}
              </li>
            </NavLink>
          <NavLink className="active" to={"/Podcast"}>
              <li>
                {" "}
                <img height={22} src={podcast} alt="Podcast" /> E-Podcast{" "}
              </li>
            </NavLink>
          </ul>
        </div>
        </div>
      </div>
    
      <div className="container podcast-wrapper">
        <div className="podcast-message">
          <p>
          <span id="welcome-pod">Welcome to the <span id="important-item-wrapper"><span id="important-item">E-Podcast spot</span></span> !</span> <br /> Here, you are provided with amazing <span id="important-item-wrapper-2"><span id="important-item-2">face-to-face-like</span></span> explanations of courses, novels, plays, and poems. It{"'"}s designed to make you feel as if you were attending physical sessions.
          </p>
        </div>
        <div className="podcast-picture-wrapper">
            <img src={podcast_pic} alt="Podcast" />
        </div>
      </div>

      <section className="stretch-section-content">
        <div className="container mt-2">
        <div className="podcast-semester-wrapper">
          <h2 id="podcast-semester" > ✧ Choose my semester </h2>
        </div>


      <div className="podcast-semesters-options">
        <label ref={currentBox_1} htmlFor="podcast-sem-1">
          <input className="me-1" type="checkbox" id="podcast-sem-1" onChange={handlePodcastSemester_1} checked={PodcastSem_1} />
          <span> Semester 1 </span>
        </label>
        <label ref={currentBox_2} htmlFor="podcast-sem-2">
          <input className="me-1" type="checkbox" id="podcast-sem-2" onChange={handlePodcastSemester_2} checked={PodcastSem_2} />
          <span> Semester 2 </span>
        </label>
        <label ref={currentBox_3} htmlFor="podcast-sem-3">
          <input className="me-1" type="checkbox" id="podcast-sem-3" onChange={handlePodcastSemester_3} checked={PodcastSem_3} />
          <span> Semester 3 </span>
        </label>
        <label ref={currentBox_4} htmlFor="podcast-sem-4">
          <input className="me-1" type="checkbox" id="podcast-sem-4" onChange={handlePodcastSemester_4} checked={PodcastSem_4} />
          <span> Semester 4 </span>
        </label>
        <label ref={currentBox_5} htmlFor="podcast-sem-5">
          <input className="me-1" type="checkbox" id="podcast-sem-5" onChange={handlePodcastSemester_5} checked={PodcastSem_5} />
          <span> Semester 5 </span>
        </label>
        <label ref={currentBox_6} htmlFor="podcast-sem-6">
          <input className="me-1" type="checkbox" id="podcast-sem-6" onChange={handlePodcastSemester_6} checked={PodcastSem_6}/>
          <span> Semester 6 </span>
        </label>
      </div>
      </div>

    
    <div className="container mt-4">
          <>
      {isPodcastSem3 && <Sem_3_Podcasts/> }
      {isPodcastSem5 && <Sem_5_Podcasts/> }
      {isPodcastSem1 && <Sem_1_Podcasts/> }
      {isPodcastSem2 && <Unavailable/> }
      {isPodcastSem4 && <Sem_4_Podcasts/> }
      {isPodcastSem6 && <Sem_6_Podcasts />} 
      </>
    </div>
      </section>

      <footer className="container-fluid normal-footer">
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

    </div>
    </>
  )
}