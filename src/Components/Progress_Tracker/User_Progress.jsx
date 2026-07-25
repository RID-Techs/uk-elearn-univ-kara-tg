import { useEffect, useState } from "react";
import "./progress.css";
import logo from "../../assets/learns.png";
import warning from "../../assets/warning.png";
import stars from "../../assets/stars.png";
import { Courses_Sem_1 } from "./Courses/Sem_1_2/courses_sem_1";
import { Courses_Sem_3 } from "./Courses/Sem_3_4/courses_sem_3";
import { Courses_Sem_5 } from "./Courses/Sem_5_6/courses_sem_5";
import { Courses_Sem_6 } from "./Courses/Sem_5_6/courses_sem_6";
import { Courses_Sem_2 } from "./Courses/Sem_1_2/courses_sem_2";
import { Courses_Sem_4 } from "./Courses/Sem_3_4/courses_sem_4";

export const User_Progress = () => {

  const [sem_1_Progress, setSem_1_Progress] = useState(false);
  const [sem_2_Progress, setSem_2_Progress] = useState(false);
  const [sem_3_Progress, setSem_3_Progress] = useState(false);
  const [sem_4_Progress, setSem_4_Progress] = useState(false);
  const [sem_5_Progress, setSem_5_Progress] = useState(false);
  const [sem_6_Progress, setSem_6_Progress] = useState(false);

  const handleSem_1_Progress = (e) => {
    setSem_1_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_1");
    setSem_2_Progress(false);
    setSem_3_Progress(false);
    setSem_4_Progress(false);
    setSem_5_Progress(false);
    setSem_6_Progress(false);
  }
  const handleSem_2_Progress = (e) => {
    setSem_2_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_2");
    setSem_1_Progress(false);
    setSem_3_Progress(false);
    setSem_4_Progress(false);
    setSem_5_Progress(false);
    setSem_6_Progress(false);
  }
  const handleSem_3_Progress = (e) => {
    setSem_3_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_3");
    setSem_1_Progress(false);
    setSem_2_Progress(false);
    setSem_4_Progress(false);
    setSem_5_Progress(false);
    setSem_6_Progress(false);
  }
  const handleSem_4_Progress = (e) => {
    setSem_4_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_4");
    setSem_1_Progress(false);
    setSem_2_Progress(false);
    setSem_3_Progress(false);
    setSem_5_Progress(false);
    setSem_6_Progress(false);
  }
  const handleSem_5_Progress = (e) => {
    setSem_5_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_5");
    setSem_1_Progress(false);
    setSem_2_Progress(false);
    setSem_3_Progress(false);
    setSem_4_Progress(false);
    setSem_6_Progress(false);
  }
  const handleSem_6_Progress = (e) => {
    setSem_6_Progress(e.target.checked);
    localStorage.setItem("pr", "pr_s_6");
    setSem_1_Progress(false);
    setSem_2_Progress(false);
    setSem_3_Progress(false);
    setSem_4_Progress(false);
    setSem_5_Progress(false);
  }

  useEffect(() => {
    const getSemProgress = localStorage.getItem("pr");
    if(!getSemProgress) return;
    switch(getSemProgress) {
      case "pr_s_1":
        setSem_1_Progress(true);
        break;
      case "pr_s_2":
        setSem_2_Progress(true);
        break;
      case "pr_s_3":
        setSem_3_Progress(true);
        break;
      case "pr_s_4":
        setSem_4_Progress(true);
        break;
      case "pr_s_5":
        setSem_5_Progress(true);
        break;
      case "pr_s_6":
        setSem_6_Progress(true);
        break;
    }
  }, [])

  const noneOfTheSemestersSelected = !sem_1_Progress && !sem_2_Progress && !sem_3_Progress && !sem_4_Progress && !sem_5_Progress && !sem_6_Progress

    const [dateOfCreation, setDateOfCreation] = useState("2024");
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
  return (
    <>
      <div className="page-wrapper">
    <div className="container-fluid header-wraper-home" style={{zIndex: 1000}}>
                    <div className="header-holder">
                      <header>
                        <img height={50} src={logo} alt="UK-Elearn" />
                        <h1>UK-Elearn</h1>
                      </header>
                    </div>
            
                    <div className="header-elements">
                      <h3 id="member">
                        Track your progress <img className="member-stars" height={52} src={stars} alt="stars" />{" "}
                      </h3>
                    </div>
                  </div>

        <div className="container contribute-msg-holder">
          <div className="progress-msg-holder">
            <div className="progress-msg">
              <p><span id="eye-progress">Eye</span>,</p>
              <p><span id="embody-progress">embody</span>, and</p> 
              <p><span id="enjoy-progress">Enjoy</span></p>
              <p><span id="learning-progress"><em>Your Learning Progress</em></span></p>
            </div>
          </div>
        </div>

        <section className="stretch-section-content">
          <div className="container">
          <h2 id="choose-semester"><span>Choose your semester</span></h2>
          <div className="progress-by-semester-wrapper">
            <div className="progress-by-semester">
              <div className={sem_1_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-1-progress" checked={sem_1_Progress} onChange={handleSem_1_Progress}/>
                <label htmlFor="sem-1-progress">
                  {sem_1_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 1</span>
                </label>
              </div>
              <div className={sem_2_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-2-progress" checked={sem_2_Progress} onChange={handleSem_2_Progress}/>
                <label htmlFor="sem-2-progress">
                  {sem_2_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 2</span>
                </label>
              </div>
              <div className={sem_3_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-3-progress" checked={sem_3_Progress} onChange={handleSem_3_Progress}/>
                <label htmlFor="sem-3-progress">
                  {sem_3_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 3</span>
                </label>
              </div>
              <div className={sem_4_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-4-progress" checked={sem_4_Progress} onChange={handleSem_4_Progress}/>
                <label htmlFor="sem-4-progress">
                  {sem_4_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 4</span>
                </label>
              </div>
              <div className={sem_5_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-5-progress" checked={sem_5_Progress} onChange={handleSem_5_Progress}/>
                <label htmlFor="sem-5-progress">
                  {sem_5_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 5</span>
                </label>
              </div>
              <div className={sem_6_Progress ? "progress-inputs-group-checked" : "progress-inputs-group"}>
                <input type="checkbox" id="sem-6-progress" checked={sem_6_Progress} onChange={handleSem_6_Progress}/>
                <label htmlFor="sem-6-progress">
                  {sem_6_Progress ? (
                    <span className="checked-semester"></span>
                  ) : 
                    <span className="unchecked-semester"></span>
                  }
                  <span>Semester 6</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="courses-choice-holder">
            <div className="courses-choice">
              <div className="courses-to-choose">
                {sem_1_Progress && <Courses_Sem_1/>}
                {sem_3_Progress && <Courses_Sem_3/>} 
                {sem_5_Progress && <Courses_Sem_5/>}
                {sem_2_Progress && <Courses_Sem_2/>}
                {sem_4_Progress && <Courses_Sem_4/>}
                {sem_6_Progress && <Courses_Sem_6/>}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          { noneOfTheSemestersSelected && (
                  <div className="no-semester-selected-msg-wrapper">
                  <div className="no-semester-selected-msg">
                    <img src={warning} height={32} alt="Warning" />
                    <p>Please select a semester to track your progress in it.</p>
                  </div>
                  </div>
                )}
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