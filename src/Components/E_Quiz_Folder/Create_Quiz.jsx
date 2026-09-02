
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/learns.png";
import stars from "../../assets/stars.png";
import create_quiz from "../../assets/create_quiz.png";
import { Link } from "react-router-dom";

export function Create_Quiz () {
  const unit = window.location.pathname.split("/").pop().split("-")[0];
  const semester = window.location.pathname.split("/").pop().split("-")[1].replaceAll("%20", " ");
  const decodedUnit = unit.replaceAll("%20", " ").replaceAll("%C3%A7", "ç").replaceAll("%C3%A9", "é").replaceAll("%C3%89", "É").replaceAll("%C3%A2", "â").replaceAll("%C3%A8", "è").replaceAll("%C3%AA", "ê").replaceAll("%C3%AE", "î").replaceAll("%C3%B4", "ô").replaceAll("%C3%B9", "ù").replaceAll("%C3%BB", "û").replaceAll("%C3%AE", "î").replaceAll("%C3%BB", "û").replaceAll("%C3%A0", "à").replaceAll("%27", "'");

    const [username, setUsername] = useState("");

    const getMemberStatus = localStorage.getItem("isSignedIn");
    const isMember = getMemberStatus === "true";

    const notYetRegistered = useRef("Not Registered");
    const [RegisterBefore, setRegisterBefore] = useState(false);

    useEffect(() => {
      const user = localStorage.getItem("User") ?? "E-member";
      if(user) {
        setUsername(user);
      }
      // console.log("The WebMaster of this site is RID Techs");
    }, [])

    const [mainQuizCreateBtn, setMainQuizCreateBtn] = useState(true);
    const questionCounter = useRef(0);
    const quizContentRef = useRef(null);

    const handleQuizCreation = () => {
      if(!isMember && notYetRegistered.current === "Not Registered") {
          setRegisterBefore(true);
      }
      
      questionCounter.current++;
      const y = questionCounter.current;
      setMainQuizCreateBtn(false);
      if (quizContentRef.current) {
        const listItem = document.createElement("li");
        listItem.className = "quiz-content-item-question";
        listItem.id = `quiz-question-${y}`;
        const questionId = listItem.id;
        const p_question = document.createElement("p");
        p_question.className = "question-paragraph";
        const questionSectionDivider = document.createElement("p");
        questionSectionDivider.className = "question-section-divider";
        questionSectionDivider.textContent = "༆ ༆ ༆ ༆";
        const typeInYourQuestion = document.createElement("textarea");
        typeInYourQuestion.className = "type-in-your-question";
        typeInYourQuestion.id = `type-in-your-question-${y}`;
        typeInYourQuestion.placeholder = "Type in your question here...";
        const provideAnswers = document.createElement("ul");
        provideAnswers.className = "provide-answers";
        for (let i = 1; i <= 4; i++) {
          const holdQuestionAndCheckBox = document.createElement("div");
          holdQuestionAndCheckBox.className = "hold-question-and-checkbox";
          const rightAnswerHolder = document.createElement("div");
          rightAnswerHolder.className = "right-answer-holder";
          const rightAnswer = document.createElement("input");
        rightAnswer.type = "checkbox";
        rightAnswer.className = "right-answer-checkbox";
        rightAnswer.id = `right-answer-checkbox-${y}-${i}`;
        const rightAnswerLabel = document.createElement("label");
        rightAnswerLabel.htmlFor = `right-answer-checkbox-${y}-${i}`;
        const rightAnswerIconInactive = document.createElement("span");
        rightAnswerIconInactive.className = "right-answer-icon-inactive";
        const rightAnswerIconActive = document.createElement("span");
        rightAnswerIconActive.className = "right-answer-icon";
        const answerItem = document.createElement("li");
        answerItem.className = "answer-item";
        const answerInput = document.createElement("textarea");
        answerInput.className = "answer-input";
        answerInput.spellcheck = false;
        answerInput.placeholder = `Answer ${i}`;
        answerInput.id = `answer-${y}-${i}`;
        rightAnswerLabel.appendChild(rightAnswerIconInactive);
        rightAnswerLabel.appendChild(rightAnswerIconActive);
        rightAnswerHolder.appendChild(rightAnswerLabel);
          rightAnswerHolder.appendChild(rightAnswer);
          holdQuestionAndCheckBox.appendChild(answerInput);
          holdQuestionAndCheckBox.appendChild(rightAnswerHolder);
          answerItem.appendChild(holdQuestionAndCheckBox);
          provideAnswers.appendChild(answerItem);
        }
        listItem.appendChild(p_question);
        listItem.appendChild(typeInYourQuestion);
        listItem.appendChild(provideAnswers);
        listItem.appendChild(questionSectionDivider);
      quizContentRef.current.appendChild(listItem);
      const targetElement = document.querySelector(`#${questionId}`);
      const quizCreationMessage = document.querySelector("#quiz-creation-message");
      const headerElement = document.querySelector(`.header-wraper-home`);
      const headerHeight = headerElement.offsetHeight;
      if(targetElement && (targetElement.getAttribute("id") === "quiz-question-1")) {
        const elementY = quizCreationMessage.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: elementY, behavior: "smooth" });
      } else {
        const elementY = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: elementY, behavior: "smooth" });
      }
      }
    }
    
    function toggleRightAnswer(event) {
      const checkbox = event.target;
      const icon = checkbox.closest(".right-answer-holder");
      const iconParent = checkbox.closest(".quiz-content-item-question");
      const answerItem = checkbox.closest(".answer-item");
      const answerInput = answerItem.querySelector(".answer-input");

      if(!icon) return;
      const iconSpan_1 = icon.querySelector(".right-answer-icon-inactive");
      const iconSpan_2 = icon.querySelector(".right-answer-icon");
      const allAnswerCheckBoxes = iconParent.querySelectorAll(".right-answer-checkbox");

      if(answerInput.value.trim() === "") {
        alert("Please, Provide an answer first !");
        checkbox.checked = false;
        allAnswerCheckBoxes.forEach((box) => {
          box.disabled = false;
      })
        iconSpan_1.style.display = "inline-block";
        iconSpan_2.style.display = "none";
        return;
      }
      
      if (checkbox.checked) {        
        allAnswerCheckBoxes.forEach((box) => {
        box.disabled = true;
        checkbox.disabled = false;
      })
        iconSpan_1.style.display = "none";
        iconSpan_2.style.display = "inline-block";
      } else {
        allAnswerCheckBoxes.forEach((box) => {
          box.disabled = false;
      })
        iconSpan_1.style.display = "inline-block";
        iconSpan_2.style.display = "none";
      }
    }

  function handleAnswerInput(event) {
    if (event.target.classList.contains("type-in-your-question")) {
    return;
  }

  const input = event.target;
  const answerItem = input.closest(".answer-item");
  const checkbox = answerItem.querySelector(".right-answer-checkbox");
  const icon = answerItem.querySelector(".right-answer-holder");
  const iconSpan_1 = icon.querySelector(".right-answer-icon-inactive");
  const iconSpan_2 = icon.querySelector(".right-answer-icon");

  if (input.value.trim() === "" && checkbox.checked) {
    checkbox.checked = false;
    iconSpan_1.style.display = "inline-block";
    iconSpan_2.style.display = "none";
    const iconParent = input.closest(".quiz-content-item-question");
    const allAnswerCheckBoxes = iconParent.querySelectorAll(".right-answer-checkbox");
    allAnswerCheckBoxes.forEach((box) => (box.disabled = false));
  }
}

    useEffect(() => {
      const quizContent = quizContentRef.current;
      if (!quizContent) return;

      const handleChange = (event) => {
        if (event.target.classList.contains("right-answer-checkbox")) {
          toggleRightAnswer(event);
        }
      };
      
      quizContent.addEventListener("change", handleChange);
      quizContent.addEventListener("input", handleAnswerInput);
      
      return () => {
        quizContent.removeEventListener("change", handleChange);
        quizContent.removeEventListener("input", handleAnswerInput);
      }
    }, []);

    const handleDeleteLastQuestion = () => {
  if (quizContentRef.current) {
    const allQuestions = quizContentRef.current.querySelectorAll(".quiz-content-item-question");
    if (allQuestions.length > 0) {
      const lastQuestion = allQuestions[allQuestions.length - 1];
      questionCounter.current--;
      lastQuestion.classList.add("delete-animate");
      setTimeout(() => {
        lastQuestion.remove();
        if (questionCounter.current === 0) {
          setMainQuizCreateBtn(true);
          const quizCreationMessage = document.querySelector("#quiz-creation-message");
          const headerElement = document.querySelector(`.header-wraper-home`);
          const headerHeight = headerElement.offsetHeight;
            const elementY = quizCreationMessage.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
            window.scrollTo({ top: elementY, behavior: "smooth" });
        }
      }, 500);
    }
  }
};

    useEffect(() => {
      const quizContent = quizContentRef.current;
      function beforePrintHandler() {
        const allQuestions = quizContent.querySelectorAll(".quiz-content-item-question");
        allQuestions.forEach((question) => {
          const textarea = question.querySelector(".type-in-your-question");
          const paragraph = question.querySelector(".question-paragraph");
          if (textarea && paragraph) {
              if (textarea.value !== "") {
                paragraph.textContent = textarea.value;
                paragraph.style.display = "block";
                textarea.style.display = "none";
              } else {
                paragraph.textContent = "";
                paragraph.style.display = "none";
                textarea.style.display = "block";
              }
          }
        });
      }
      function afterPrintHandler() {
        const allQuestions = quizContent.querySelectorAll(".quiz-content-item-question");
        const allRightAnswers = quizContent.querySelectorAll(".right-answer-checkbox");
        allQuestions.forEach((question) => {
          const textarea = question.querySelector(".type-in-your-question");
          const paragraph = question.querySelector(".question-paragraph");
          if (textarea && paragraph) {
              if (paragraph.textContent !== "") {
                textarea.value = paragraph.textContent;
                paragraph.style.display = "none";
                textarea.style.display = "";
              } else {
                paragraph.textContent = "";
                paragraph.style.display = "none";
                textarea.style.display = "block";
              }
          }
        });

        allRightAnswers.forEach((answer) => {
        const icon = answer.closest(".right-answer-holder");
        const iconSpan_1 = icon.querySelector(".right-answer-icon-inactive");
        const iconSpan_2 = icon.querySelector(".right-answer-icon");
        const answerCheckStateAttr = answer.getAttribute("data-check-state");
        if(answerCheckStateAttr === "true") {
          iconSpan_1.style.display = "none";
          iconSpan_2.style.display = "inline-block";
        }
        answer.removeAttribute("data-check-state");
      })
      }
      if (quizContent) {
        window.addEventListener("beforeprint", beforePrintHandler);
        window.addEventListener("afterprint", afterPrintHandler);
      }
      return () => {
        if (quizContent) {
          window.removeEventListener("beforeprint", beforePrintHandler);
          window.removeEventListener("afterprint", afterPrintHandler);
        }
      };
    }, []);

const handlePrintWithAnswers = () => {
  const quizContent = quizContentRef.current;
  if (quizContent) {
    const allQuestions = quizContent.querySelectorAll(".quiz-content-item-question");
    for (const question of allQuestions) {
      const textarea = question.querySelector(".type-in-your-question");
      if (textarea && textarea.value.trim() === "") {
        alert("Please fill in all questions before printing the quiz.");
        return;
      }
    }
  }
  window.print();
};

const handlePrintWithoutAnswers = () => {
  const quizContent = quizContentRef.current;
  if (quizContent) {
    const allQuestions = quizContent.querySelectorAll(".quiz-content-item-question");
    const allRightAnswers = quizContent.querySelectorAll(".right-answer-checkbox");
    for (const question of allQuestions) {
      const textarea = question.querySelector(".type-in-your-question");

      allRightAnswers.forEach((answer) => {
        const icon = answer.closest(".right-answer-holder");
        const iconSpan_1 = icon.querySelector(".right-answer-icon-inactive");
        const iconSpan_2 = icon.querySelector(".right-answer-icon");
        answer.setAttribute("data-check-state", answer.checked);
        if(answer.checked) {
          iconSpan_1.style.display = "inline-block";
          iconSpan_2.style.display = "none";
        }
      })
      
      if (textarea && textarea.value.trim() === "") {
        alert("Please fill in all questions before printing the quiz.");
        return;
      }
    }
  }
  window.print();
};

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
    <div className="modal" id="logInMember" tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-primary-emphasis fw-bold">E-learning Member</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <p>Want to get access ? Alright, <strong>register</strong> to enjoy all the <strong>Resources</strong>, available exclusively to <strong>E-learning members</strong>, and therefore assess your learning progress and continue improving.</p>
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
      <div className="page-wrapper">
        <div className="quiz-generated-msg-wrapper">
          <div className="quiz-generated-msg-holder">
            <p className="quiz-generated-msg">Generated by <a href="https://e-learning-learning-space-front.onrender.com/">E-learning</a> </p>
          </div>
        </div>
          <div className="container-fluid header-wraper-home" style={{zIndex: 1000}}>
                            <div className="header-holder">
                              <header>
                                <img height={50} src={logo} alt="E-learning" />
                                <h1>E-learning</h1>
                              </header>
                            </div>
                    
                            <div className="header-elements">
                              <h3 id="member">
                                E-Quiz <img className="member-stars" height={52} src={stars} alt="stars" />{" "}
                              </h3>
                            </div>
                          </div>

              <div id="quiz-creation-message" className="container contribute-msg-holder">
              <div className="progress-msg-holder">
                <div className="quiz-msg quiz-no-print-header">
                  <p>Dear <span id="user-name">{username}</span> 🤗🧩, <br /> {mainQuizCreateBtn ? "You are about to create" : "You are now creating"} a quiz for the course : <span className="quiz-unit-title">{decodedUnit}</span>🌴.</p>
                </div>
                <div className="quiz-print-header">
                  <h3><span id="quiz-title">Quiz 🧮📑🧩</span></h3>
                  <p>Level : {semester} </p>
                  <p>Course : <span className="print-quiz-unit-title">{decodedUnit}</span> 🌴.</p>
                </div>
              </div>
            </div>

            {
              mainQuizCreateBtn && (
                <div className="container quiz-create-wrapper">
              <div className="quiz-create-holder">
            <div onClick={handleQuizCreation} className="quiz-create">
                <div className="quiz-create-img">
                  <img height={40} src={create_quiz} alt="create a quiz" />
                </div>
                <div>
                  <button type="button" id="quiz-create-btn">Create</button>
                </div>
            </div>
        </div>
    </div>
              )
            }

              <section className="container quiz-content-section-wrapper stretch-section-content">
               <div className="quiz-content-section-holder">
                <div className="quiz-content-section">
                  <ol ref={quizContentRef} className="quiz-content"></ol>
                  {!mainQuizCreateBtn && (
                  <>
                    <div className="container add-another-question-btn-holder">
                    
                    <div className="delete-last-question-btn-holder">
                    <button id="delete-last-question-btn" type="button" onClick={handleDeleteLastQuestion}>
                      <span>
                        <svg
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
  <path d="M4 7h16" />
  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  <path d="M10 12l4 4m0 -4l-4 4" />
</svg>
                      </span>
                    </button>
                    </div>
                    <div className="add-another-question-btn">

                    {
                      RegisterBefore ? (
                      <button data-bs-toggle="modal" data-bs-target="#logInMember" type="button" id="add-another-question-btn">
                        <span>
                          <svg
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
  <path d="M19 8h-14" />
  <path d="M5 12h9" />
  <path d="M11 16h-6" />
  <path d="M15 16h6" />
  <path d="M18 13v6" />
</svg>
                        </span>
                        <span>Add Another Question</span>
                      </button>

                      ) : (
                        <button onClick={handleQuizCreation} type="button" id="add-another-question-btn">
                        <span>
                          <svg
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
  <path d="M19 8h-14" />
  <path d="M5 12h9" />
  <path d="M11 16h-6" />
  <path d="M15 16h6" />
  <path d="M18 13v6" />
</svg>
                        </span>
                        <span>Add Another Question</span>
                      </button>
                      )
                    }

                    </div>
                  </div>
                  <div className="container download-quiz-wrapper">
                    <div className="download-quiz-holder">
                        {
                          RegisterBefore ? (
                            <div className="download-quiz-btn">
                            <button data-bs-toggle="modal" data-bs-target="#logInMember" type="button" id="download-quiz-btn-with-answers">Download Quiz with Answers ⭜</button>
                            <button data-bs-toggle="modal" data-bs-target="#logInMember" type="button" id="download-quiz-btn-without-answers">Download Quiz without Answers ⭜</button>
                            </div>
                          ) : (
                            <div className="download-quiz-btn">
                            <button onClick={handlePrintWithAnswers} type="button" id="download-quiz-btn-with-answers">Download Quiz with Answers ⭜</button>
                            <button onClick={handlePrintWithoutAnswers} type="button" id="download-quiz-btn-without-answers">Download Quiz without Answers ⭜</button>
                            </div>
                          )
                        }
                    </div>
                  </div>
                  </>

                  )}
               </div>
               </div>
            </section>

            <footer className="container-fluid normal-footer">
                                <div className="footer-first-part">
                        
                                  <div className="header-holder">
                                    <div className="header-footer">
                                      <img height={32} src={logo} alt="E-learning" />
                                      <h3>E-learning</h3>
                                    </div>
                                  </div>
                        
                                </div>
                        
                                <div className="footer-second-part">
                                  <div className="privacy">
                                    <div className="rights">
                                      <p>&copy; {dateOfCreation} | All Rights Reserved</p>
                                    </div>
                        
                                    <div className="author">
                                      <p>Made with <span style={{ color: "red" }}>&hearts;</span> by E-learning</p>
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
                                        E-learning Crew
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