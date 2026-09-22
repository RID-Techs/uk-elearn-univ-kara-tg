import { useEffect, useState } from "react";
import "./quiz.css";
import logo from "../../assets/learns.png";
import stars from "../../assets/stars.png";
import warning from "../../assets/warning.png";
import { Sem_1_Quiz } from "./Quiz_Sems/Sem_1_2/Q_Sem_1";
import { Sem_3_Quiz } from "./Quiz_Sems/Sem_3_4/Q_Sem_3";
import { Sem_2_Quiz } from "./Quiz_Sems/Sem_1_2/Q_Sem_2";
import { Sem_4_Quiz } from "./Quiz_Sems/Sem_3_4/Q_Sem_4";
import { Sem_5_Quiz } from "./Quiz_Sems/Sem_5_6/Q_Sem_5";
import { Sem_6_Quiz } from "./Quiz_Sems/Sem_5_6/Q_Sem_6";

export function E_Quiz () {
  const [semester_1_Box, setSemester_1_Box] = useState(false);
    const [semester_2_Box, setSemester_2_Box] = useState(false);
    const [semester_3_Box, setSemester_3_Box] = useState(false);
    const [semester_4_Box, setSemester_4_Box] = useState(false);
    const [semester_5_Box, setSemester_5_Box] = useState(false);
    const [semester_6_Box, setSemester_6_Box] = useState(false);
  
    const handleSemester1CheckboxChange = async (event) => {
      setSemester_1_Box(event.target.checked);
      localStorage.setItem("eqz", "1");
      setSemester_2_Box(false);
      setSemester_3_Box(false);
      setSemester_4_Box(false);
      setSemester_5_Box(false);
      setSemester_6_Box(false);
    };
  
    const handleSemester2CheckboxChange = (event) => {
      setSemester_2_Box(event.target.checked);
      localStorage.setItem("eqz", "2");
      setSemester_1_Box(false);
      setSemester_3_Box(false);
      setSemester_4_Box(false);
      setSemester_5_Box(false);
      setSemester_6_Box(false);
    };
  
    const handleSemester3CheckboxChange = (event) => {
      setSemester_3_Box(event.target.checked);
      localStorage.setItem("eqz", "3");
      setSemester_1_Box(false);
      setSemester_2_Box(false);
      setSemester_4_Box(false);
      setSemester_5_Box(false);
      setSemester_6_Box(false);
    };
  
    const handleSemester4CheckboxChange = (event) => {
      setSemester_4_Box(event.target.checked);
      localStorage.setItem("eqz", "4");
      setSemester_1_Box(false);
      setSemester_2_Box(false);
      setSemester_3_Box(false);
      setSemester_5_Box(false);
      setSemester_6_Box(false);
    };
  
    const handleSemester5CheckboxChange = (event) => {
      setSemester_5_Box(event.target.checked);
      localStorage.setItem("eqz", "5");
      setSemester_1_Box(false);
      setSemester_2_Box(false);
      setSemester_3_Box(false);
      setSemester_4_Box(false);
      setSemester_6_Box(false);
    };
  
    const handleSemester6CheckboxChange = (event) => {
      setSemester_6_Box(event.target.checked);
      localStorage.setItem("eqz", "6");
      setSemester_1_Box(false);
      setSemester_2_Box(false);
      setSemester_3_Box(false);
      setSemester_4_Box(false);
      setSemester_5_Box(false);
    };
  
    const noneOfTheSemestersSelected = !semester_1_Box && !semester_2_Box && !semester_3_Box && !semester_4_Box && !semester_5_Box && !semester_6_Box;

    useEffect(() => {
          const eqz = localStorage.getItem("eqz");
          if (eqz) {
            switch (eqz) {
              case "1":
                setSemester_1_Box(true);
                break;
              case "2":
                setSemester_2_Box(true);
                break;
              case "3":
                setSemester_3_Box(true);
                break;
              case "4":
                setSemester_4_Box(true);
                break;
              case "5":
                setSemester_5_Box(true);
                break;
              case "6":
                setSemester_6_Box(true);
                break;
              default:
                break;
            }
          }
        }, []);

          const [dateOfCreation, setDateOfCreation] = useState("2024");
          useEffect(() => {
            // console.log("The WebMaster of this site is RID Techs");
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
                            E-Quiz <img className="member-stars" height={52} src={stars} alt="stars" />{" "}
                          </h3>
                        </div>
                      </div>

          <div className="container contribute-msg-holder">
          <div className="progress-msg-holder">
            <div className="quiz-msg">
              <p><span id="create-quiz">Create</span>, <span id="take-quiz">Take</span>, and <span id="learn-quiz">Learn</span> <span id="effortlessly">effortlessly</span> from <br /> <span id="quiz-title"><em>Course Related Quizzes</em></span></p>
            </div>
          </div>
        </div>

        <section className="stretch-section-content">
          <div className="choose-exam-paper-semester-wrapper p-2">
              <h3 className="choose-exam-paper-semester-title">∻ <span>Choose a semester</span> 🖇</h3>
            </div>
        
            <div className="semester-boxes-wrapper">
              <div className="semester-boxes-holder">
                <div className="semesters-boxes">
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester1-checkbox">
                    <input type="checkbox" checked={semester_1_Box} onChange={handleSemester1CheckboxChange} className="semester-checkbox" id="semester1-checkbox" />
                      <div className={semester_1_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"}>
                        <span className={semester_1_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 1</span>
                      </div>
                    </label>
                  </div>
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester2-checkbox">
                    <input type="checkbox" checked={semester_2_Box} onChange={handleSemester2CheckboxChange} className="semester-checkbox" id="semester2-checkbox" />
                      <div className={semester_2_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"} >
                        <span className={semester_2_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 2</span>
                      </div>
                    </label>
                  </div>
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester3-checkbox">
                    <input type="checkbox" checked={semester_3_Box} onChange={handleSemester3CheckboxChange} className="semester-checkbox" id="semester3-checkbox" />
                      <div className={semester_3_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"} >
                        <span className={semester_3_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 3</span>
                      </div>
                    </label>
                  </div>
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester4-checkbox">
                    <input type="checkbox" checked={semester_4_Box} onChange={handleSemester4CheckboxChange} className="semester-checkbox" id="semester4-checkbox" />
                      <div className={semester_4_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"} >
                        <span className={semester_4_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 4</span>
                      </div>
                    </label>
                  </div>
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester5-checkbox">
                    <input type="checkbox" checked={semester_5_Box} onChange={handleSemester5CheckboxChange} className="semester-checkbox" id="semester5-checkbox" />
                      <div className={semester_5_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"} >
                        <span className={semester_5_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 5</span>
                      </div>
                    </label>
                  </div>
                  <div className="semester-checkbox-group">
                    <label htmlFor="semester6-checkbox">
                    <input type="checkbox" checked={semester_6_Box} onChange={handleSemester6CheckboxChange} className="semester-checkbox" id="semester6-checkbox" />
                      <div className={semester_6_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-quiz-checkbox-custom-unchecked-wrapper"} >
                        <span className={semester_6_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                        <span>Semester 6</span>
                      </div>
                    </label>
                  </div>
        
                </div>
              </div>
            </div>
        
               { noneOfTheSemestersSelected && (
                <div className="no-semester-selected-msg-wrapper">
                <div className="no-semester-selected-msg">
                  <img src={warning} height={32} alt="Warning" />
                  <p>Please select a semester to view the courses where you can create a quiz.</p>
                </div>
                </div>
              )}

              {!noneOfTheSemestersSelected && (
                    <div className="teaching-units-section">
                      <div className="teaching-units-section-title-section">
                        <h3 id="teaching-units-section-title" className="text-center">∻ <span>Teaching Units</span> 🖆 </h3>
                      </div>
              
                      <div className="teaching-units">
                        {semester_1_Box && <Sem_1_Quiz />}
                        {semester_2_Box && <Sem_2_Quiz />}
                        {semester_3_Box && <Sem_3_Quiz />}
                        {semester_4_Box && <Sem_4_Quiz />}
                        {semester_5_Box && <Sem_5_Quiz />}
                        {semester_6_Box && <Sem_6_Quiz />}
                      </div>        
                    </div>
                    )}
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