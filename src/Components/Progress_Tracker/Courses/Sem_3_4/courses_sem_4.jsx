import { useEffect, useRef, useState } from "react"
import "../track_course.css"
import { CircleProgress } from "../../circle_tracker";
import { pdfFiles_sem_4, Reminders_sem_4 } from "../../../../All_Couses_Docs/Sem_3_4/courses_docs_3_4";
import { Link } from "react-router-dom";
export const Courses_Sem_4 = () => {

  const getMemberStatus = localStorage.getItem("isLoggedIn");
  const isMember = getMemberStatus === "true";

    const [trackCourses_Sem_4, setTrackCourses_Sem_4] = useState(() => {
      const saved = localStorage.getItem("tr_cs_4");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
      { courseKey: "African_Civilisation", courses: [] },
      { courseKey: "African_Poetry", courses: [] },
      { courseKey: "American_Civilisation", courses: [] },
      { courseKey: "American_Poetry", courses: [] },
      { courseKey: "Contemporary_British_Civ", courses: [] },
      { courseKey: "Early_Am_Theater", courses: [] },
      { courseKey: "English_Poetry", courses: [] },
      { courseKey: "Advanced_Oral_Exp", courses: [] }
      ];
    });

  const [Sem_4_courses_group, setSem_4_courses_group] = useState(() => {
    const existingCoursesToTrack = JSON.parse(localStorage.getItem("s_4_c"));
    if(existingCoursesToTrack) {
      return existingCoursesToTrack;
    }
    return { courses_sem_4: [] }
  });

  const temporarySelectedCourses = JSON.parse(localStorage.getItem("s_4_c"));

  const [Sem_4_already_tracked_courses, setSem_4_already_tracked_courses] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("tr_cs_4"));
    if(saved) {
      return saved
    }
  });

      const [showProgress, setShowProgress] = useState(() => {
      const showProgressStatus = localStorage.getItem("sh_pr_4");
      if(showProgressStatus && showProgressStatus === "true"){
        return true;
      }
      return false;
    });
  
  useEffect(() => {
    let isMounted = true; 
    if(!isMounted) return;
      const courseButtonsHolder = document.querySelector(".courses-by-semester");
      if(!courseButtonsHolder) return;
      const courseButtons = courseButtonsHolder.querySelectorAll("button");
      if(!courseButtons) return;

      function courseValuesFunc(e) {
        if(!isMember) return;
        const getCourseValue = e.currentTarget.value.trim();
        const temporarySelectHolder = e.currentTarget.closest("button");
        const temporarySelect = temporarySelectHolder.querySelector(".temporary-select");
             
        temporarySelect.textContent = "⦿";
        
        if(Sem_4_courses_group && Sem_4_courses_group.courses_sem_4.length > 0) {
          const existingValue = Sem_4_courses_group.courses_sem_4.find((val) => val === getCourseValue);
          if(existingValue) {  
            if(temporarySelect.textContent !== "") temporarySelect.textContent = ""
            const excludeTheExistingValue = Sem_4_courses_group.courses_sem_4.filter((filtered) => 
            !filtered.includes(existingValue));
            setSem_4_courses_group({
              courses_sem_4: excludeTheExistingValue
            });
            return;
          }
        }
        setSem_4_courses_group(prev => ({
          courses_sem_4: [...prev.courses_sem_4, getCourseValue]
        }));
      }

      if(isMounted) {
        courseButtons.forEach((btn) => {
          btn.addEventListener("click", courseValuesFunc)
        })
      }

      
      return () => {
        isMounted = false;
        courseButtons.forEach((btn) => {
          btn.removeEventListener("click", courseValuesFunc)
        })
      }
    }, [Sem_4_courses_group, isMember, showProgress])

    const handleProgressSection = () => {
      localStorage.setItem("sh_pr_4", "false");
      setShowProgress(false);
    }

    const KeepUnitsTotrack = () => {
      if(Sem_4_courses_group.courses_sem_4.length === 0) {
        alert("Please select at least one Teaching Unit to track your progress.");
        return;
      }
      localStorage.setItem("sh_pr_4", "true");
      localStorage.setItem("s_4_c", JSON.stringify(Sem_4_courses_group));
      setShowProgress(true);
    }

    const trackCourseRef = useRef(null);
        useEffect(() => {
          if(showProgress && trackCourseRef.current) {
            trackCourseRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'center'
            });
          }
        }, [showProgress])

    useEffect(() => {
      const getProgressStatus = localStorage.getItem("sh_pr_4") || "false";
      if(!getProgressStatus) return;
      if(getProgressStatus === "true") {
        setShowProgress(true);
      }
      const getToBeTrackedCourses = JSON.parse(localStorage.getItem("s_4_c"));
      const getAlreadyTrackedCourses = JSON.parse(localStorage.getItem("tr_cs_4"));
      if(!getToBeTrackedCourses) return;
      if(!getAlreadyTrackedCourses) return;
      
      setSem_4_courses_group(getToBeTrackedCourses);
    }, []);

   const completedCourses = pdfFiles_sem_4.filter((cs) => {
         if(Sem_4_already_tracked_courses) {
           return Sem_4_already_tracked_courses[cs.course_index].courses.includes(cs.name)
         }
       });
    const unCompletedCourses = pdfFiles_sem_4.filter((cs) => {
         if(Sem_4_already_tracked_courses) {
           return !Sem_4_already_tracked_courses[cs.course_index].courses.includes(cs.name)
         }
       });
    
    const getCourseOfSem = (e) => {
    const targetedCourse = e.currentTarget.getAttribute("data-course");
    const targetedCourseKey = e.currentTarget.getAttribute("data-course-key");
    const targetedCourseIndex = e.currentTarget.getAttribute("data-course-index");
    const convertedTargetedCourseIndex = Number(targetedCourseIndex);
    
    if(trackCourses_Sem_4[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
      console.warn(`Unknown course key: ${targetedCourseKey}`);
      return;
    }

    if(trackCourses_Sem_4[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
      alert("this doc exists !");
      return;
    }

    setTrackCourses_Sem_4(prev =>
      prev.map((item, idx) => {
        if(idx === convertedTargetedCourseIndex) {
          return {...item, courses: [...item.courses, targetedCourse]}
        } else {
          return item
        }
      })
    );
    }

  useEffect(() => {
    if(isMember) {
    localStorage.setItem("tr_cs_4", JSON.stringify(trackCourses_Sem_4));
    setSem_4_already_tracked_courses(trackCourses_Sem_4);
    }
  }, [trackCourses_Sem_4, isMember]);

  return (
    <>
    <div className="modal" id="logInMember" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary-emphasis fw-bold">UK-Elearn Member</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Want to get access ? Alright, <strong>register</strong> to enjoy all the <strong>Resources</strong>, available exclusively to <strong>UK-Elearn members</strong>, and therefore assess your learning progress and continue improving.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <Link to={"/signin"}>
                <button type="button" className="btn btn-primary fw-bold fst-italic" data-bs-dismiss="modal">Sign in <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
          <path d="M3 12h13l-3 -3" />
          <path d="M13 15l3 -3" />
        </svg> </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    {
      showProgress ? (
        <>
          <div className="mt-4">
            <div ref={trackCourseRef} className="course-progress-btn-add">
          <button onClick={handleProgressSection} type="button">Add more courses ⤓</button>
        </div>
            <div className="tracked-courses-progress-wrapper">
        {Sem_4_courses_group.courses_sem_4.map((course, index) => (
            <div className="tracked-courses-progress-holder" key={index}>
              <div className="tracked-courses-progress">
              <div className="tracked-courses-progress-header">
                <h3>∻ {course.split("-")[1]}</h3>
              </div>
              <hr />

              <div className="tracked-courses-progress-body-wrapper">
                <div className="tracked-courses-progress-body-holder">
                {
              pdfFiles_sem_4.filter((cs) => cs.course_key === course.split("-")[0]).length > 0 && (
                  <>
                  <div className="tracked-courses-progress-body-completed-wrapper">
                  <h2 className="tracked-courses-progress-body-completed-title">
                                      <span>
                                        📍🧩 Documents you have already consulted 🤗🪴
                                      </span>
                                    </h2>
                  <p className="text-center">⤋ ⤋ ⤋</p>
                  <p className="tracked-courses-progress-body-completed-circle-tracker">
                      <span>
                      <CircleProgress percentage={Math.floor((completedCourses.filter((cs) =>
                      cs.course_key === course.split("-")[0]).length / pdfFiles_sem_4.filter((cs) => 
                      cs.course_key === course.split("-")[0]).length) * 100)} />
                    </span>                    
                  </p>
                <div className="tracked-courses-progress-body-completed-holder-content">
                                    <div className="tracked-courses-progress-body-completed-holder">
                                    {
                                      completedCourses.map((cs, index) => (
                                        cs.course_key === course.split("-")[0] ?
                                        (
                                          <div key={index} className="tracked-courses-progress-body-completed">
                                            <div className="tracked-courses-progress-body-completed-course-wrapper">
                                              <p className="tracked-courses-progress-body-completed-course">
                                                <span>{cs.name}</span>
                                              </p>
                                            </div>
                                          </div>
                                        ) : null
                                      ))
                                    }
                                  </div>
                                  </div>
              </div>
              {
                (completedCourses.filter((cs) =>
                      cs.course_key === course.split("-")[0]).length !== pdfFiles_sem_4.filter((cs) => 
                      cs.course_key === course.split("-")[0]).length) && (
              <div className="tracked-courses-progress-body-uncompleted-wrapper">
                  <h2 className="tracked-courses-progress-body-uncompleted-title">
                                      <span>🎋🫣 Documents not yet consulted 🤯♦️</span>
                                    </h2>
                  <p className="text-center">⤋ ⤋ ⤋</p>
                <div className="tracked-courses-progress-body-uncompleted-holder">
                  {
                    unCompletedCourses.map((cs, index) => (
                      cs.course_key === course.split("-")[0] ?
                      (
                        <div key={index} className="tracked-courses-progress-body-uncompleted">
                          <div className="tracked-courses-progress-body-uncompleted-course-wrapper">
                            <p className="tracked-courses-progress-body-uncompleted-course">
                              <span>
                                {cs.name}
                              </span>
                            </p>
                            <hr />
                            <div className="tracked-courses-progress-footer">
                              <a
                                                      onClick={getCourseOfSem}
                                                      href={cs.opendoc}
                                                      rel="noopener noreferrer"
                                                      data-course={cs.name}
                                                      data-course-key={cs.course_key}
                                                      data-course-index={cs.course_index}
                                                      target="_blank"
                                                    >
                                                      <span></span>
                                                      Open
                                                    </a>
                                                    <a
                                                      onClick={getCourseOfSem}
                                                      data-course={cs.name}
                                                      data-course-key={cs.course_key}
                                                      data-course-index={cs.course_index}
                                                      href={cs.url}
                                                      rel="noopener noreferrer"
                                                      download={`${cs.name}.pdf`}
                                                    >
                                                      <span></span>
                                                      <span className="both-screens">Download</span>
                                                    </a>
                            </div>
                          </div>
                        </div>
                      ) : null
                    ))
                  }
                </div>
              </div>
                      )
              }
                  </>
                  )
                }

                <div className="tracked-courses-progress-reminders-wrapper">
                        <div className="tracked-courses-progress-reminders-holder">
                          <div className="tracked-courses-progress-reminders-title-wrapper">
                        <div className="tracked-courses-progress-reminders-title-holder">
                          <h4 className="tracked-courses-progress-reminders-title">≽ 🎋 Reminders 🧩 ≼</h4>
                        </div>
                        <div className="tracked-courses-progress-reminders-arrows">
                        <p>↯↯</p>
                        </div>
                      </div>
                      
                          <div className="tracked-courses-progress-reminders">
                            {
                                Reminders_sem_4.filter((cs) => cs.courseKey === course.split("-")[0])[0].availableDocsIn.answerHub ? (
                                  <>
                                  <div className="tracked-courses-progress-reminders-msg-content-wrapper">
                                    <div className="tracked-courses-progress-reminders-msg-content-holder">
                                      <p>Check the related content in the Answer Hub.</p>
                                      <div className="tracked-courses-progress-reminders-msg-content-link">
                                        <a href="Get_Answers">UK-Elearn Answer Hub ⭜</a>
                                      </div>
                                    </div>
                                  </div>
                                    <div className="tracked-courses-progress-reminders-divider">
                                      <p>------</p>
                                    </div>
                                  </>
                                ) : null}
                                
                                {Reminders_sem_4.filter((cs) => cs.courseKey === course.split("-")[0])[0].availableDocsIn.test ? (
                                  <>
                                    <div className="tracked-courses-progress-reminders-msg-content-wrapper">
                                    <div className="tracked-courses-progress-reminders-msg-content-holder">
                                      <p>A test is available for this course.</p>
                                      <div className="tracked-courses-progress-reminders-msg-content-link">
                                      <a href="Test">Take a Test ⭜</a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="tracked-courses-progress-reminders-divider">
                                      <p>------</p>
                                  </div>
                                  </>
                                ) : null}
                                
                                {Reminders_sem_4.filter((cs) => cs.courseKey === course.split("-")[0])[0].availableDocsIn.podcast ? (
                                  <>
                                    <div className="tracked-courses-progress-reminders-msg-content-wrapper">
                                    <div className="tracked-courses-progress-reminders-msg-content-holder">
                                        <p>Listen to the course explanations in audio.</p>
                                        <div className="tracked-courses-progress-reminders-msg-content-link">
                                        <a href="Podcast">E-Podcast ⭜</a>
                                        </div>
                                    </div>
                                  </div>
                                  <div className="tracked-courses-progress-reminders-divider">
                                      <p>------</p>
                                  </div>
                                  </>
                                ) : null }
                                
                                {Reminders_sem_4.filter((cs) => cs.courseKey === course.split("-")[0])[0].availableDocsIn.examPapers ? (
                                  <div className="tracked-courses-progress-reminders-msg-content-wrapper">
                                    <div className="tracked-courses-progress-reminders-msg-content-holder">
                                        <p>Practice with past exam papers</p>
                                        <div className="tracked-courses-progress-reminders-msg-content-link">
                                        <a href="Exam-papers">E-Collection Of Papers ⭜</a>
                                        </div>
                                    </div>
                                  </div>
                                ) : null
                            }
                          </div>
    
                        </div>
                      </div>

                </div>
              </div>

              </div>
            </div>
        ))}
            </div>
          </div>
        </>
      ) : (
      <div className="mt-4">
      <h5 className="text-center">᪣ Select the Teaching Unit(s) you wish to keep track of.</h5>
    <div className="courses-by-semester">
      <button type="button" value={"African_Civilisation-African Civilisation"}>
        <span className="me-2">African Civilisation</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "African_Civilisation" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"African_Poetry-African Poetry"}>
        <span className="me-2">African Poetry</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "African_Poetry" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"American_Civilisation-American Civilisation"}>
        <span className="me-2">American Civilisation</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "American_Civilisation" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"American_Poetry-American Poetry"}>
        <span className="me-2">American Poetry</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "American_Poetry" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"Contemporary_British_Civ-Contemporary British Civilisation"}>
        <span className="me-2">Contemporary British Civilisation</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "Contemporary_British_Civ" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"Early_Am_Theater-Early American Theater"}>
        <span className="me-2">Early American Theater</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "Early_Am_Theater" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"English_Poetry-English Poetry"}>
        <span className="me-2">English Poetry</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "English_Poetry" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
      <button type="button" value={"Advanced_Oral_Exp-Techniques d'Expression Orale Avancée"}>
        <span className="me-2">Techniques d{"'"}Expression Orale Avancée</span>
        <span className="temporary-select">
          {
          temporarySelectedCourses && (
            temporarySelectedCourses.courses_sem_4.map((csKey) => (
               csKey.split("-")[0] === "Advanced_Oral_Exp" ? (
                 "⦿"
               ) : ""
             )))
          }
        </span>
      </button>
    </div>
    <div className="mt-4 validate-track-btn-holder">
      {
        isMember ? (
          <button onClick={KeepUnitsTotrack} id="validate-track-btn" type="button">⬩ Validate √</button>
        ) : (
          <button data-bs-toggle="modal" data-bs-target="#logInMember" id="validate-track-btn" type="button">⬩ Validate √</button>
        )
      }
    </div>
    </div>
      )
    }
    
    </>
  )
}