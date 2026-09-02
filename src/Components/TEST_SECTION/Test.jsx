import logo from "../../assets/learns.png";
import Homepage from "../../assets/Homepage.png";
import Answers from "../../assets/answers.png";
import TestOne from "../../assets/testOne.png";
import E_Quiz_Dea from "../../assets/E_quiz_Dea.png";
import E_Quiz_Gen from "../../assets/E_quiz_Gen.png";
import star from "../../assets/stars_2.png";
import Testpic from "../../assets/test.png";
import { useState, useEffect } from "react";
import { Sem_1_Grammar } from "./SEM_1_TEST/GrammarSem1";
import { Phonetics } from "./SEM_1_TEST/Phonetics";
import { TestSem_2 } from "./SEM_2/sem_2";
import { TestSem_4 } from "./SEM_4/Sem_4";
import { TestSem_6 } from "./SEM_6/Sem_6";
import { American_Test } from "./SEM_1_TEST/American_Test";
import { British_Test } from "./SEM_1_TEST/British_Test";
import { Century_18thNovel_Test } from "./SEM_3_TEST/Century_18thNovelTest";
import { Morphology_Test } from "./SEM_3_TEST/Morpho_Test";
import { S3_American_Novel_Test } from "./SEM_3_TEST/American_S3_Test";
import { English_19th_Novel_Test } from "./SEM_5_TEST/English_19th_Century";
import { Lit_And_Environment } from "./SEM_5_TEST/EnvironLit";
import { Link, NavLink } from "react-router-dom";
export function Test() {
  const [testSem, setTestSem] = useState("");

  const getMemberStatus = localStorage.getItem("isSignedIn");
  const isMember = getMemberStatus === "true";

  const handleTestSem = (e) => {
    setTestSem(e.target.value);
  }

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

  useEffect(() => {
    const allInps = document.querySelectorAll("label");
    allInps.forEach((inp) =>{
      inp.addEventListener("click", () => {

        allInps.forEach((inps) => {
          const ChangStyle = inps.parentElement
          ChangStyle.classList.remove("test-radios");
        })

        const ChangStyle = inp.parentElement
        ChangStyle.classList.add("test-radios");
      })
    })
  }, []);

  const [GramTest, setGramTest] = useState(false);
  const [PhonTest, setPhonTest] = useState(false);
  const [AmericanTest, setAmericanTest] = useState(false);
  const [BritishTest, setBritishTest] = useState(false);
  const [Century_18thNovel, setCentury_18thNovel] = useState(false);
  const [MorphologyTest, setMorphologyTest] = useState(false);
  const [AmericanNovelTest, setAmericanNovelTest] = useState(false);
  const [Century_19thNovel, setCentury_19thNovel] = useState(false);
  const [Lit_EnvironmentTest, setLit_EnvironmentTest] = useState(false);

  const HideSubjects_1 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setGramTest(true);
    setPhonTest(false);
    setAmericanTest(false);
    setBritishTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_2 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setPhonTest(true);
    setGramTest(false);
    setAmericanTest(false);
    setBritishTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_3 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setAmericanTest(true);
    setPhonTest(false);
    setGramTest(false);
    setBritishTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_4 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setBritishTest(true);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_5 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setCentury_18thNovel(true);
    setBritishTest(false);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_6 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setMorphologyTest(true);
    setBritishTest(false);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setCentury_18thNovel(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_7 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setAmericanNovelTest(true);
    setBritishTest(false);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setCentury_19thNovel(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_8 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setCentury_19thNovel(true);
    setBritishTest(false);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setLit_EnvironmentTest(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }
  const HideSubjects_9 = () => {
    const Subjects = document.querySelector(".test-subjects");
    const TestInterface = document.querySelector(".test-appear-container");
    Subjects.style.display = "none";
    setLit_EnvironmentTest(true);
    setBritishTest(false);
    setAmericanTest(false);
    setPhonTest(false);
    setGramTest(false);
    setCentury_18thNovel(false);
    setMorphologyTest(false);
    setAmericanNovelTest(false);
    setCentury_19thNovel(false);
    window.scrollTo(0, 0);
    TestInterface.style.display = "block";
  }

  const BackBtn = () => {
    const TestInterface = document.querySelector(".test-appear-container");
    const Subjects = document.querySelector(".test-subjects");
    TestInterface.style.display = "none";
    Subjects.style.display = "";
  }

  return (
    <>
      <div className="page-wrapper">

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

      <div className="container-fluid test-wraper">
        <div className="test-holder">
          <header className="test-header">
            <img height={50} src={logo} alt="UK-Elearn" />
            <h1>UK-Elearn</h1>
          </header>

          <div id="answers-header" className="header-elements me-xl-4 me-lg-4 me-md-4">
            <ul>
              <NavLink to={"/Home"}>
                <li>
                  {" "}
                  <img
                    height={22}
                    src={Homepage}
                    alt="Semester"
                  /> Homepage{" "}
                </li>
              </NavLink>
              <NavLink to={"/Get_Answers"}>
                <li>
                  {" "}
                  <img height={22} src={Answers} alt="Answers" /> Answer Hub{" "}
                </li>
              </NavLink>
              <NavLink className="active" to={"/Test"}>
                <li>
                  {" "}
                  <img height={22} src={TestOne} alt="Answers" /> Test{" "}
                </li>
              </NavLink>
              <NavLink to={"/E-Quiz"}>
                <li>
                  {" "}
                  <img height={22} src={E_Quiz_Dea} alt="Answers" /> E-Quiz{" "}
                </li>
              </NavLink>
              <NavLink to={"/E-Quiz-Gen"}>
                <li>
                  {" "}
                  <img height={22} src={E_Quiz_Gen} alt="Answers" /> E-Quiz Général{" "}
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>

    <div className="container mt-4">
        <div className="test-message-header">
        <div className="take-test">
          <div className="take-test-worthy-words">
                <p className="test-span">Take a test</p> <br />
                <p className="test-span-2">Rate yourself</p> <br />
                <p className="test-span-3">Get Better</p>
          </div>
          <img height={100} src={Testpic} alt="Test" />
        </div>
        </div>
    </div>

<section className="stretch-section-content">
      <div className="container mt-4">
      <div className="test-semester">
        <h2> ✧ Choose my semester</h2>
      </div>

      <div className="pick-semester mt-3">
        <div className="test-semesters-radio">
          <div className="test-radio">
            <label htmlFor="test-sem-1">Semester 1
            <input 
            value="Semester 1"
            checked={testSem === "Semester 1"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-1"/>
            </label>
          </div>
          <div className="test-radio">
            <label htmlFor="test-sem-2">Semester 2
            <input
            value="Semester 2"
            checked={testSem === "Semester 2"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-2"/>
            </label>
          </div>
          <div className="test-radio">
            <label htmlFor="test-sem-3">Semester 3
            <input 
            value="Semester 3"
            checked={testSem === "Semester 3"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-3"/>
            </label>
          </div>
          <div className="test-radio">
            <label htmlFor="test-sem-4">Semester 4
            <input 
            value="Semester 4"
            checked={testSem === "Semester 4"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-4"/>
            </label>
          </div>
          <div className="test-radio">
            <label htmlFor="test-sem-5">Semester 5
            <input 
            value="Semester 5"
            checked={testSem === "Semester 5"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-5"/>
            </label>
          </div>
          <div className="test-radio">
            <label htmlFor="test-sem-6">Semester 6
            <input  
            value="Semester 6"
            checked={testSem === "Semester 6"}
            onChange={handleTestSem}
            className="ms-1" type="radio" id="test-sem-6"/>
            </label>
          </div>
        </div>
      </div>

    </div>

    <div className="container mt-4">
      {testSem === "Semester 1" ? 
      
        <div className="test-subjects">
          <div className="test-subject-item">
            <p className="subject-header">Grammar <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
              {
                isMember ? (
                  <button onClick={HideSubjects_1}  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">Phonetics & Phonology <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_2} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">American Civilisation <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_3} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">British Civilisation <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                isMember ? (
              <button onClick={HideSubjects_4} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>
          
        </div>
      
      : null}
    </div>

    <div className="container mt-4">
      {testSem === "Semester 3" ? 
      
        <div className="test-subjects">
          <div className="test-subject-item">
            <p className="subject-header">18<sup>th</sup> Century English Novel <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_5}  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">Morphology & Syntax <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_6} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">American Novel <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_7} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>
        </div>
      : null}
    </div>

    <div className="container mt-4">
      {testSem === "Semester 5" ? 
      
        <div className="test-subjects">
          <div className="test-subject-item">
            <p className="subject-header">19<sup>th</sup> Century English Novel <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_8}  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>

          <div className="test-subject-item">
            <p className="subject-header">Literature & Environement <img height={32} src={star} alt="star" /> </p>
            <hr className="test-divder" />
               {
                 isMember ? (
                  <button onClick={HideSubjects_9} className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>

                ) : (
                  <button data-bs-toggle="modal" data-bs-target="#logInMember"  className="test-btn" type="button">Take a test <img height={22} src={Testpic} alt="star" /> </button>
                )
              }
          </div>
        </div>
      : null}
    </div>

    <div className="container mt-4">
      {testSem === "Semester 2" ? <TestSem_2 /> : null}
    </div>
    <div className="container mt-4">
      {testSem === "Semester 4" ? <TestSem_4 /> : null}
    </div>
    <div className="container mt-4">
      {testSem === "Semester 6" ? <TestSem_6 /> : null}
    </div>
</section>


    <div className="test-appear-container">
      <div className="test-appear">
        <button type="button" onClick={BackBtn} id="back-btn"> <svg
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
  <path d="M13 14l-4 -4l4 -4" />
  <path d="M8 14l-4 -4l4 -4" />
  <path d="M9 10h7a4 4 0 1 1 0 8h-1" />
</svg> Back</button>
{GramTest && <Sem_1_Grammar />}
{PhonTest && <Phonetics />}
{AmericanTest && <American_Test />}
{BritishTest && <British_Test /> }
{Century_18thNovel && <Century_18thNovel_Test /> }
{MorphologyTest && <Morphology_Test /> }
{AmericanNovelTest && <S3_American_Novel_Test /> }
{Lit_EnvironmentTest && <Lit_And_Environment /> }
{Century_19thNovel && <English_19th_Novel_Test /> }
      </div>
    </div>

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
  );
}
