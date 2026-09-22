import { useRef, useState } from "react";
import "./paper.css";
import warning from "../../assets/warning.png";
import { useEffect } from "react";
import { Semester1Units } from "./Teaching_Units/Sem_1_2/Sem_1_Units";
import { Semester2Units } from "./Teaching_Units/Sem_1_2/Sem_2_Units";
import { Semester3Units } from "./Teaching_Units/Sem_3_4/Sem_3_Units";
import { Semester4Units } from "./Teaching_Units/Sem_3_4/Sem_4_Units";
import { Semester5Units } from "./Teaching_Units/Sem_5_6/Sem_5_Units";
import { Semester6Units } from "./Teaching_Units/Sem_5_6/Sem_6_Units";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const backBtn = <svg
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
</svg>

export function GetALlExamPapers() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [semester_1_Box, setSemester_1_Box] = useState(false);
  const [semester_2_Box, setSemester_2_Box] = useState(false);
  const [semester_3_Box, setSemester_3_Box] = useState(false);
  const [semester_4_Box, setSemester_4_Box] = useState(false);
  const [semester_5_Box, setSemester_5_Box] = useState(false);
  const [semester_6_Box, setSemester_6_Box] = useState(false);

  const handleSemester1CheckboxChange = async (event) => {
    setSemester_1_Box(event.target.checked);
    setSearchParams({ semester: "1" });
    localStorage.setItem("exp", "1");
    setSemester_2_Box(false);
    setSemester_3_Box(false);
    setSemester_4_Box(false);
    setSemester_5_Box(false);
    setSemester_6_Box(false);
  };

  const handleSemester2CheckboxChange = (event) => {
    setSemester_2_Box(event.target.checked);
    setSearchParams({ semester: "2" });
    localStorage.setItem("exp", "2");
    setSemester_1_Box(false);
    setSemester_3_Box(false);
    setSemester_4_Box(false);
    setSemester_5_Box(false);
    setSemester_6_Box(false);
  };

  const handleSemester3CheckboxChange = (event) => {
    setSemester_3_Box(event.target.checked);
    setSearchParams({ semester: "3" });
    localStorage.setItem("exp", "3");
    setSemester_1_Box(false);
    setSemester_2_Box(false);
    setSemester_4_Box(false);
    setSemester_5_Box(false);
    setSemester_6_Box(false);
  };

  const handleSemester4CheckboxChange = (event) => {
    setSemester_4_Box(event.target.checked);
    setSearchParams({ semester: "4" });
    localStorage.setItem("exp", "4");
    setSemester_1_Box(false);
    setSemester_2_Box(false);
    setSemester_3_Box(false);
    setSemester_5_Box(false);
    setSemester_6_Box(false);
  };

  const handleSemester5CheckboxChange = (event) => {
    setSemester_5_Box(event.target.checked);
    setSearchParams({ semester: "5" });
    localStorage.setItem("exp", "5");
    setSemester_1_Box(false);
    setSemester_2_Box(false);
    setSemester_3_Box(false);
    setSemester_4_Box(false);
    setSemester_6_Box(false);
  };

  const handleSemester6CheckboxChange = (event) => {
    setSemester_6_Box(event.target.checked);
    setSearchParams({ semester: "6" });
    localStorage.setItem("exp", "6");
    setSemester_1_Box(false);
    setSemester_2_Box(false);
    setSemester_3_Box(false);
    setSemester_4_Box(false);
    setSemester_5_Box(false);
  };

  const noneOfTheSemestersSelected = !semester_1_Box && !semester_2_Box && !semester_3_Box && !semester_4_Box && !semester_5_Box && !semester_6_Box;

  const [username, setUsername] = useState("");
      useEffect(() => {
        const user = localStorage.getItem("userFirstname") ?? "Guest Learner";
        if(user) {
          setUsername(user);
        }
      }, []);

    useEffect(() => {
      const exp = localStorage.getItem("exp");
      if (exp) {
        switch (exp) {
          case "1":
            setSemester_1_Box(true);
            setSearchParams({ semester: "1" });
            break;
          case "2":
            setSemester_2_Box(true);
            setSearchParams({ semester: "2" });
            break;
          case "3":
            setSemester_3_Box(true);
            setSearchParams({ semester: "3" });
            break;
          case "4":
            setSemester_4_Box(true);
            setSearchParams({ semester: "4" });
            break;
          case "5":
            setSemester_5_Box(true);
            setSearchParams({ semester: "5" });
            break;
          case "6":
            setSemester_6_Box(true);
            setSearchParams({ semester: "6" });
            break;
          default:
            break;
        }
      }
    }, [setSearchParams]);

    const moveToItemRef = useRef(null);
          useEffect(() => {
            if (moveToItemRef.current) {
              moveToItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          }, [])

    const backToHomePage = () => {
      navigate("/");
    }

  return (
    <>
    <div ref={moveToItemRef} className="exam-paper-welcome-msg contribute-msg-holder">
      <h4><em>Welcome to the <span id="collection-highlight">Collection of Exam papers</span> section, dear {username} <span className="highlight">༆</span></em></h4>
      <div className="contribute-msg-group ms-md-5 ms-xl-5">
        <p>Here you can find all the exam papers that have been contributed by our community. 🎋🤗</p>
        <p>If you want to contribute, please click right here ⤑ <Link to={"/Exam-papers/add"} id="contribute-link">Contribute</Link> </p>
      </div>
    </div>

    <div className="back-to-home-btn">
      <button onClick={backToHomePage} type="button">
        <span>{backBtn}</span> <span>Back</span>
      </button>
    </div>
    <div className="choose-exam-paper-semester-wrapper p-2">
      <h3 className="choose-exam-paper-semester-title">∻ <span>Choose a semester</span> 🖇</h3>
    </div>

    <div className="semester-boxes-wrapper">
      <div className="semester-boxes-holder">
        <div className="semesters-boxes">
          <div className="semester-checkbox-group">
            <label htmlFor="semester1-checkbox">
            <input type="checkbox" checked={semester_1_Box} onChange={handleSemester1CheckboxChange} className="semester-checkbox" id="semester1-checkbox" />
              <div className={semester_1_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"}>
                <span className={semester_1_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                <span>Semester 1</span>
              </div>
            </label>
          </div>
          <div className="semester-checkbox-group">
            <label htmlFor="semester2-checkbox">
            <input type="checkbox" checked={semester_2_Box} onChange={handleSemester2CheckboxChange} className="semester-checkbox" id="semester2-checkbox" />
              <div className={semester_2_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"} >
                <span className={semester_2_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                <span>Semester 2</span>
              </div>
            </label>
          </div>
          <div className="semester-checkbox-group">
            <label htmlFor="semester3-checkbox">
            <input type="checkbox" checked={semester_3_Box} onChange={handleSemester3CheckboxChange} className="semester-checkbox" id="semester3-checkbox" />
              <div className={semester_3_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"} >
                <span className={semester_3_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                <span>Semester 3</span>
              </div>
            </label>
          </div>
          <div className="semester-checkbox-group">
            <label htmlFor="semester4-checkbox">
            <input type="checkbox" checked={semester_4_Box} onChange={handleSemester4CheckboxChange} className="semester-checkbox" id="semester4-checkbox" />
              <div className={semester_4_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"} >
                <span className={semester_4_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                <span>Semester 4</span>
              </div>
            </label>
          </div>
          <div className="semester-checkbox-group">
            <label htmlFor="semester5-checkbox">
            <input type="checkbox" checked={semester_5_Box} onChange={handleSemester5CheckboxChange} className="semester-checkbox" id="semester5-checkbox" />
              <div className={semester_5_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"} >
                <span className={semester_5_Box ? "semester-checkbox-custom-checked" : "semester-checkbox-custom-unchecked"}></span>
                <span>Semester 5</span>
              </div>
            </label>
          </div>
          <div className="semester-checkbox-group">
            <label htmlFor="semester6-checkbox">
            <input type="checkbox" checked={semester_6_Box} onChange={handleSemester6CheckboxChange} className="semester-checkbox" id="semester6-checkbox" />
              <div className={semester_6_Box ? "semester-checkbox-custom-checked-wrapper" : "semester-checkbox-custom-unchecked-wrapper"} >
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
          <p>Please select a semester to view the exam papers.</p>
        </div>
        </div>
      )}

      {!noneOfTheSemestersSelected && (
      <div className="teaching-units-section">
        <div className="teaching-units-section-title-section">
          <h3 id="teaching-units-section-title" className="text-center">∻ <span>Teaching Units</span> 🖆 </h3>
        </div>

        <div className="teaching-units">
          {semester_1_Box && <Semester1Units />}
          {semester_2_Box && <Semester2Units />}
          {semester_3_Box && <Semester3Units />}
          {semester_4_Box && <Semester4Units />}
          {semester_5_Box && <Semester5Units />}
          {semester_6_Box && <Semester6Units />}
        </div>        
      </div>
      )}
    </>
  );
}