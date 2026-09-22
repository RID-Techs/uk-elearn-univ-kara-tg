import { useEffect, useState } from "react";
import "./survey.css";
import supabase from "../../Config/DbConnect"
import { useNetworkStatus } from "../../Network-Status/networkHook";
import { AlertInfo } from "../Alert_Msg/Alert-Info";

export const Survey = () => {
  const isOnline = useNetworkStatus();
  const [showThanks, setShowThanks] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("User") ?? "E-member";
    if(user) {
      setUsername(user);
    }
    const body = document.querySelector("body");
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "auto";
    }
  }, [])

      const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
      const [submitting, setSubmitting] = useState(false);
      const [surveyValue_1, setSurveyValue_1] = useState("");
      const [disableSurvey_1_opt_1, setDisableSurvey_1_opt_1] = useState(false);
      const [disableSurvey_1_opt_2, setDisableSurvey_1_opt_2] = useState(false);
      const survey_1_option_1 = () => {
        setSurveyValue_1("WhatsApp");
        setDisableSurvey_1_opt_2(true);
      }
      const survey_1_option_2 = () => {
        setSurveyValue_1("Friends");
        setDisableSurvey_1_opt_1(true);
      }
      const [surveyValue_2, setSurveyValue_2] = useState("");
      const [disableSurvey_2_opt_1, setDisableSurvey_2_opt_1] = useState(false);
      const [disableSurvey_2_opt_2, setDisableSurvey_2_opt_2] = useState(false);
      const survey_2_option_1 = () => {
        setSurveyValue_2("Yes");
        setDisableSurvey_2_opt_2(true);
      }
      const survey_2_option_2 = () => {
        setSurveyValue_2("No");
        setDisableSurvey_2_opt_1(true);
      }
      const [surveyValue_3, setSurveyValue_3] = useState("");
      const survey_3_option = (e) => {
        setSurveyValue_3(e.target.value);
      }
      const [surveyValue_4, setSurveyValue_4] = useState("");
      const [disableSurvey_4_opt_1, setDisableSurvey_4_opt_1] = useState(false);
      const [disableSurvey_4_opt_2, setDisableSurvey_4_opt_2] = useState(false);
      const survey_4_option_1 = () => {
        setSurveyValue_4("Yes");
        setDisableSurvey_4_opt_2(true);
      }
      const survey_4_option_2 = () => {
        setSurveyValue_4("No");
        setDisableSurvey_4_opt_1(true);
      }
      const [surveyValue_5, setSurveyValue_5] = useState("");
      const [disableSurvey_5_opt_1, setDisableSurvey_5_opt_1] = useState(false);
      const [disableSurvey_5_opt_2, setDisableSurvey_5_opt_2] = useState(false);
      const survey_5_option_1 = () => {
        setSurveyValue_5("Yes");
        setDisableSurvey_5_opt_2(true);
      }
      const survey_5_option_2 = () => {
        setSurveyValue_5("No");
        setDisableSurvey_5_opt_1(true);
      }
      const [surveyValue_6, setSurveyValue_6] = useState("");
      const [disableSurvey_6_opt_1, setDisableSurvey_6_opt_1] = useState(false);
      const [disableSurvey_6_opt_2, setDisableSurvey_6_opt_2] = useState(false);
      const survey_6_option_1 = () => {
        setSurveyValue_6("Yes");
        setDisableSurvey_6_opt_2(true);
      }
      const survey_6_option_2 = () => {
        setSurveyValue_6("No");
        setDisableSurvey_6_opt_1(true);
      }
      const [surveyValue_7, setSurveyValue_7] = useState("");
      const [disableSurvey_7_opt_1, setDisableSurvey_7_opt_1] = useState(false);
      const [disableSurvey_7_opt_2, setDisableSurvey_7_opt_2] = useState(false);
      const survey_7_option_1 = () => {
        setSurveyValue_7("Easy");
        setDisableSurvey_7_opt_2(true);
      }
      const survey_7_option_2 = () => {
        setSurveyValue_7("Complicated");
        setDisableSurvey_7_opt_1(true);
      }
      const [surveyValue_8, setSurveyValue_8] = useState("");
      const [disableSurvey_8_opt_1, setDisableSurvey_8_opt_1] = useState(false);
      const [disableSurvey_8_opt_2, setDisableSurvey_8_opt_2] = useState(false);
      const survey_8_option_1 = () => {
        setSurveyValue_8("Yes");
        setDisableSurvey_8_opt_2(true);
      }
      const survey_8_option_2 = () => {
        setSurveyValue_8("No");
        setDisableSurvey_8_opt_1(true);
      }
      const [surveyValue_9, setSurveyValue_9] = useState("");
      const [disableSurvey_9_opt_1, setDisableSurvey_9_opt_1] = useState(false);
      const [disableSurvey_9_opt_2, setDisableSurvey_9_opt_2] = useState(false);
      const [disableSurvey_9_opt_3, setDisableSurvey_9_opt_3] = useState(false);
      const survey_9_option_1 = () => {
        setSurveyValue_9("Awesome");
        setDisableSurvey_9_opt_2(true);
        setDisableSurvey_9_opt_3(true);
      }
      const survey_9_option_2 = () => {
        setSurveyValue_9("Good");
        setDisableSurvey_9_opt_1(true);
        setDisableSurvey_9_opt_3(true);
      }
      const survey_9_option_3 = () => {
        setSurveyValue_9("Bad");
        setDisableSurvey_9_opt_1(true);
        setDisableSurvey_9_opt_2(true);
      }
      const [surveyValue_10, setSurveyValue_10] = useState("");
      const [disableSurvey_10_opt_1, setDisableSurvey_10_opt_1] = useState(false);
      const [disableSurvey_10_opt_2, setDisableSurvey_10_opt_2] = useState(false);
      const survey_10_option_1 = () => {
        setSurveyValue_10("English Only");
        setDisableSurvey_10_opt_2(true);
      }
      const survey_10_option_2 = () => {
        setSurveyValue_10("English & French");
        setDisableSurvey_10_opt_1(true);
      }
      const [surveyValue_11, setSurveyValue_11] = useState("");
      const survey_11_option = (e) => {
        setSurveyValue_11(e.target.value);
      }
      const [surveyValue_12, setSurveyValue_12] = useState("");
      const [disableSurvey_12_opt_1, setDisableSurvey_12_opt_1] = useState(false);
      const [disableSurvey_12_opt_2, setDisableSurvey_12_opt_2] = useState(false);
      const survey_12_option_1 = () => {
        setSurveyValue_12("Sure");
        setDisableSurvey_12_opt_2(true);
      }
      const survey_12_option_2 = () => {
        setSurveyValue_12("No");
        setDisableSurvey_12_opt_1(true);
      }
      const [surveyValue_13, setSurveyValue_13] = useState("");
      const [disableSurvey_13_opt_1, setDisableSurvey_13_opt_1] = useState(false);
      const [disableSurvey_13_opt_2, setDisableSurvey_13_opt_2] = useState(false);
      const survey_13_option_1 = () => {
        setSurveyValue_13("Yes");
        setDisableSurvey_13_opt_2(true);
      }
      const survey_13_option_2 = () => {
        setSurveyValue_13("No");
        setDisableSurvey_13_opt_1(true);
      }
      const [surveyValue_14, setSurveyValue_14] = useState("");
      const survey_14_option = (e) => {
        setSurveyValue_14(e.target.value);
      }
      const [surveyValue_15, setSurveyValue_15] = useState("");
      const survey_15_option = (e) => {
        setSurveyValue_15(e.target.value);
      }
      const [surveyValue_16, setSurveyValue_16] = useState("");
      const survey_16_option = (e) => {
        setSurveyValue_16(e.target.value);
      }    

  const [surveyQuestion_1, setSurveyQuestion_1] = useState(true);
  const [surveyQuestion_2, setSurveyQuestion_2] = useState(false);
  const [surveyQuestion_3, setSurveyQuestion_3] = useState(false);
  const [surveyQuestion_4, setSurveyQuestion_4] = useState(false);
  const [surveyQuestion_5, setSurveyQuestion_5] = useState(false);
  const [surveyQuestion_6, setSurveyQuestion_6] = useState(false);
  const [surveyQuestion_7, setSurveyQuestion_7] = useState(false);
  const [surveyQuestion_8, setSurveyQuestion_8] = useState(false);
  const [surveyQuestion_9, setSurveyQuestion_9] = useState(false);
  const [surveyQuestion_10, setSurveyQuestion_10] = useState(false);
  const [surveyQuestion_11, setSurveyQuestion_11] = useState(false);
  const [surveyQuestion_12, setSurveyQuestion_12] = useState(false);
  const [surveyQuestion_13, setSurveyQuestion_13] = useState(false);
  const [surveyQuestion_14, setSurveyQuestion_14] = useState(false);
  const [surveyQuestion_15, setSurveyQuestion_15] = useState(false);
  const [surveyQuestion_16, setSurveyQuestion_16] = useState(false);

  const handleSurveyQuestion_1 = () => {
    setSurveyQuestion_1(false);
    setSurveyQuestion_2(true);
  }
  const handleSurveyQuestion_2 = () => {
    setSurveyQuestion_2(false);
    setSurveyQuestion_3(true);
  }
  const handleSurveyQuestion_3 = () => {
    setSurveyQuestion_3(false);
    setSurveyQuestion_4(true);
  }
  const handleSurveyQuestion_4 = () => {
    setSurveyQuestion_4(false);
    setSurveyQuestion_5(true);
  }
  const handleSurveyQuestion_5 = () => {
    setSurveyQuestion_5(false);
    setSurveyQuestion_6(true);
  }
  const handleSurveyQuestion_6 = () => {
    setSurveyQuestion_6(false);
    setSurveyQuestion_7(true);
  }
  const handleSurveyQuestion_7 = () => {
    setSurveyQuestion_7(false);
    setSurveyQuestion_8(true);
  }
  const handleSurveyQuestion_8 = () => {
    setSurveyQuestion_8(false);
    setSurveyQuestion_9(true);
  }
  const handleSurveyQuestion_9 = () => {
    setSurveyQuestion_9(false);
    setSurveyQuestion_10(true);
  }
  const handleSurveyQuestion_10 = () => {
    setSurveyQuestion_10(false);
    setSurveyQuestion_11(true);
  }
  const handleSurveyQuestion_11 = () => {
    setSurveyQuestion_11(false);
    setSurveyQuestion_12(true);
  }
  const handleSurveyQuestion_12 = () => {
    setSurveyQuestion_12(false);
    setSurveyQuestion_13(true);
  }
  const handleSurveyQuestion_13 = () => {
    setSurveyQuestion_13(false);
    setSurveyQuestion_14(true);
  }
  const handleSurveyQuestion_14 = () => {
    setSurveyQuestion_14(false);
    setSurveyQuestion_15(true);
  }
  const handleSurveyQuestion_15 = () => {
    setSurveyQuestion_15(false);
    setSurveyQuestion_16(true);
  }


  const handleSurveyQuestion_2_Prev = () => {
    setSurveyQuestion_2(false);
    setSurveyQuestion_1(true);
  }
  const handleSurveyQuestion_3_Prev = () => {
    setSurveyQuestion_3(false);
    setSurveyQuestion_2(true);
  }
  const handleSurveyQuestion_4_Prev = () => {
    setSurveyQuestion_4(false);
    setSurveyQuestion_3(true);
  }
  const handleSurveyQuestion_5_Prev = () => {
    setSurveyQuestion_5(false);
    setSurveyQuestion_4(true);
  }
  const handleSurveyQuestion_6_Prev = () => {
    setSurveyQuestion_6(false);
    setSurveyQuestion_5(true);
  }
  const handleSurveyQuestion_7_Prev = () => {
    setSurveyQuestion_7(false);
    setSurveyQuestion_6(true);
  }
  const handleSurveyQuestion_8_Prev = () => {
    setSurveyQuestion_8(false);
    setSurveyQuestion_7(true);
  }
  const handleSurveyQuestion_9_Prev = () => {
    setSurveyQuestion_9(false);
    setSurveyQuestion_8(true);
  }
  const handleSurveyQuestion_10_Prev = () => {
    setSurveyQuestion_10(false);
    setSurveyQuestion_9(true);
  }
  const handleSurveyQuestion_11_Prev = () => {
    setSurveyQuestion_11(false);
    setSurveyQuestion_10(true);
  }
  const handleSurveyQuestion_12_Prev = () => {
    setSurveyQuestion_12(false);
    setSurveyQuestion_11(true);
  }
  const handleSurveyQuestion_13_Prev = () => {
    setSurveyQuestion_13(false);
    setSurveyQuestion_12(true);
  }
  const handleSurveyQuestion_14_Prev = () => {
    setSurveyQuestion_14(false);
    setSurveyQuestion_13(true);
  }
  const handleSurveyQuestion_15_Prev = () => {
    setSurveyQuestion_15(false);
    setSurveyQuestion_14(true);
  }
  const handleSurveyQuestion_16_Prev = () => {
    setSurveyQuestion_16(false);
    setSurveyQuestion_15(true);
  }

      const [offlineMsg, setOfflineMsg] = useState(false);
      const handleOfflineMsg = () => {
        setOfflineMsg(false);
      };

  const handleSurveyQuestion_16 = (e) => {
    e.preventDefault();
        
            if(!isOnline) {
              setOfflineMsg(true);
              return;
            }

    setSubmitting(true);
    setDisableSubmitBtn(true);

    if(surveyValue_1 === "" || surveyValue_2 === "" || surveyValue_3 === "" || surveyValue_4 === "" || surveyValue_5 === "" || surveyValue_6 === "" || surveyValue_7 === "" || surveyValue_8 === "" || surveyValue_9 === "" || surveyValue_10 === "" || surveyValue_11 === "" || surveyValue_12 === "" || surveyValue_13 === "" || surveyValue_14 === "" || surveyValue_15 === "" || surveyValue_16 === "") {
      alert("Please answer all survey questions before submitting.");
      setSubmitting(false);
      setDisableSubmitBtn(false);
      return;
    }

    const sendData = async () => {
      const { data, error } = await supabase
      .from('feedback')
      .insert({ Informed_via: surveyValue_1, e_importance: surveyValue_2, e_help_description: surveyValue_3, happy_register: surveyValue_4, increase_price: surveyValue_5, get_more_advantages: surveyValue_6, e_interaction: surveyValue_7, like_physical_sessions: surveyValue_8, teach_well: surveyValue_9, language_to_speak: surveyValue_10, suggestions: surveyValue_11, recommendable: surveyValue_12, approve_by_uni: surveyValue_13, impressions: surveyValue_14, user_name: surveyValue_15, user_firstname: surveyValue_16, pseudo: username })
      .select()

      if (error) {
        console.error("Error inserting data:", error.message);
        alert("An error occurred while submitting the survey. Please try again later.");
        setDisableSubmitBtn(false);
        return;
      }
      if (data) {
        setSubmitting(false);
        setSurveyQuestion_16(false);
        setShowThanks(true);
        localStorage.setItem("TookSurvey", "true");
      }
    }
    sendData();
  }

  const endSurvey = () => {
    const body = document.querySelector("body");
    body.style.overflow = "auto";
    localStorage.setItem("TookSurvey", "true");
    window.location.reload();
  }

  return(
    <>
    {
              offlineMsg && (
                <div className="alert-msg-container">
              <div className="alert-msg">
              <AlertInfo message="You are currently offline. Please connect to the internet to give your feedback. 🤗🌴" />
              <div className="alert-msg-footer">
                <button onClick={handleOfflineMsg} type="button">Close</button>
              </div>
              </div>
            </div>
              )
            }
    <main>
      <div className="survey-wrapper">
      <h1><span className="highlight">♨</span> Hey {username}, <br /> UK-Elearn is improving for you.</h1>
      {showThanks === false && <p id="survey-introductory-msg">Well, let{"'"}s go through a short and quick survey regarding UK-Elearn.</p> }
      <div className="survey-container">
        <form onSubmit={handleSurveyQuestion_16}>

          <div className="survey-questions-holder">

            {surveyQuestion_1 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Where did you first hear about UK-Elearn ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_1 === "WhatsApp" ? "survey-clicked-btn" : disableSurvey_1_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_1_option_1} type="button" disabled={disableSurvey_1_opt_1}>WhatsApp</button>
                  <button className={surveyValue_1 === "Friends" ? "survey-clicked-btn" : disableSurvey_1_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_1_option_2} type="button" disabled={disableSurvey_1_opt_2}>Friends</button>
                </div>
              </div>
              <div className="survey-footer">
                <button id="first-next-btn" type="button">Prev. ⇢</button>
                <button onClick={handleSurveyQuestion_1} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_2 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Has UK-Elearn actually helped you ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_2 === "Yes" ? "survey-clicked-btn" : disableSurvey_2_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_2_option_1} type="button" disabled={disableSurvey_2_opt_1}>Yes</button>
                  <button className={surveyValue_2 === "No" ? "survey-clicked-btn" : disableSurvey_2_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_2_option_2} type="button" disabled={disableSurvey_2_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_2_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_2} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_3 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> How has it helped you ? What has changed since the day you signed up for UK-Elearn ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-area">
                  <textarea value={surveyValue_3} onChange={survey_3_option} placeholder="Write something down here..."></textarea>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_3_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_3} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_4 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Do you think it was worth registering for UK-Elearn ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_4 === "Yes" ? "survey-clicked-btn" : disableSurvey_4_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_4_option_1} type="button" disabled={disableSurvey_4_opt_1}>Yes</button>
                  <button className={surveyValue_4 === "No" ? "survey-clicked-btn" : disableSurvey_4_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_4_option_2} type="button" disabled={disableSurvey_4_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_4_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_4} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_5 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Some people say the registration fee should have been a bit higher. Do you personally agree ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_5 === "Yes" ? "survey-clicked-btn" : disableSurvey_5_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_5_option_1} type="button" disabled={disableSurvey_5_opt_1}>Yes</button>
                  <button className={surveyValue_5 === "No" ? "survey-clicked-btn" : disableSurvey_5_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_5_option_2} type="button" disabled={disableSurvey_5_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_5_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_5} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_6 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Do you think you got more than what you paid for ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_6 === "Yes" ? "survey-clicked-btn" : disableSurvey_6_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_6_option_1} type="button" disabled={disableSurvey_6_opt_1}>Yes</button>
                  <button className={surveyValue_6 === "No" ? "survey-clicked-btn" : disableSurvey_6_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_6_option_2} type="button" disabled={disableSurvey_6_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_6_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_6} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_7 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> How would you rate your experience interacting with the UK-Elearn website ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_7 === "Easy" ? "survey-clicked-btn" : disableSurvey_7_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_7_option_1} type="button" disabled={disableSurvey_7_opt_1}>Easy</button>
                  <button className={surveyValue_7 === "Complicated" ? "survey-clicked-btn" : disableSurvey_7_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_7_option_2} type="button" disabled={disableSurvey_7_opt_2}>Complicated</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_7_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_7} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_8 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Do you find the in-person sessions of the UK-Elearn program beneficial ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_8 === "Yes" ? "survey-clicked-btn" : disableSurvey_8_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_8_option_1} type="button" disabled={disableSurvey_8_opt_1}>Yes</button>
                  <button className={surveyValue_8 === "No" ? "survey-clicked-btn" : disableSurvey_8_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_8_option_2} type="button" disabled={disableSurvey_8_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_8_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_8} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_9 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> How would you rate my approach during the in-person sessions ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_9 === "Awesome" ? "survey-clicked-btn" : disableSurvey_9_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_9_option_1} type="button" disabled={disableSurvey_9_opt_1}>Awesome</button>
                  <button className={surveyValue_9 === "Good" ? "survey-clicked-btn" : disableSurvey_9_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_9_option_2} type="button" disabled={disableSurvey_9_opt_2}>Good</button>
                  <button className={surveyValue_9 === "Bad" ? "survey-clicked-btn" : disableSurvey_9_opt_3 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_9_option_3} type="button" disabled={disableSurvey_9_opt_3}>Bad</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_9_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_9} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_10 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> During the in-person sessions, should I communicate exclusively in English, or use both English and French ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_10 === "English Only" ? "survey-clicked-btn" : disableSurvey_10_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_10_option_1} type="button" disabled={disableSurvey_10_opt_1}>Only English</button>
                  <button className={surveyValue_10 === "English & French" ? "survey-clicked-btn" : disableSurvey_10_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_10_option_2} type="button" disabled={disableSurvey_10_opt_2}>English & French</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_10_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_10} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_11 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Do you have any suggestions ? If so, please share ! Otherwise, just write <strong><em>{"'"}No suggestion{"'"}</em></strong>.</h4>
              </div>
              <div className="survey-body">
                <div className="survey-area">
                  <textarea value={surveyValue_11} onChange={survey_11_option} placeholder="Write something down here..."></textarea>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_11_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_11} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_12 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Would you recommend UK-Elearn to your friends ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_12 === "Sure" ? "survey-clicked-btn" : disableSurvey_12_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_12_option_1} type="button" disabled={disableSurvey_12_opt_1}>Sure</button>
                  <button className={surveyValue_12 === "No" ? "survey-clicked-btn" : disableSurvey_12_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_12_option_2} type="button" disabled={disableSurvey_12_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_12_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_12} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_13 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Do you think the university should incorporate UK-Elearn into their educational programs ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-options">
                  <button className={surveyValue_13 === "Yes" ? "survey-clicked-btn" : disableSurvey_13_opt_1 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_13_option_1} type="button" disabled={disableSurvey_13_opt_1}>Yes</button>
                  <button className={surveyValue_13 === "No" ? "survey-clicked-btn" : disableSurvey_13_opt_2 === true ? "survey-unclicked-btn" : "survey-normal-btn"} onClick={survey_13_option_2} type="button" disabled={disableSurvey_13_opt_2}>No</button>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_13_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_13} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_14 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> What is your overall impression of UK-Elearn ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-area">
                  <textarea value={surveyValue_14} onChange={survey_14_option} placeholder="Write something down here..."></textarea>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_14_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_14} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_15 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Your name, please ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-input">
                  <input value={surveyValue_15} onChange={survey_15_option} type="text" placeholder="Your name..."></input>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_15_Prev} type="button">⇠ Previous</button>
                <button onClick={handleSurveyQuestion_15} type="button">Next ⇢</button>
              </div>
            </div>}
            {surveyQuestion_16 && <div className="survey-group">
              <div className="survey-header">
                <h4><span className="highlight">⚶</span> Your firstname ?</h4>
              </div>
              <div className="survey-body">
                <div className="survey-input">
                  <input value={surveyValue_16} onChange={survey_16_option} type="text" placeholder="Your name..."></input>
                </div>
              </div>
              <div className="survey-footer">
                <button onClick={handleSurveyQuestion_16_Prev} type="button">⇠ Previous</button>
                {localStorage.getItem("TookSurvey") !== "true" && <button disabled={disableSubmitBtn} type="submit">{submitting ? "Submitting..." : "Submit Survey"}</button>}
              </div>
            </div>}

          </div>

        </form>
      </div>

      {showThanks && <div className="thanks-wrapper">
        <h5><em>Thank you for taking this survey, my dear {username} ! <span className="highlight">༆</span></em></h5>
        <p>😉 Enjoy now !</p>
        <button onClick={endSurvey} type="button">Close</button>
      </div>}

      </div>
    </main>
    </>
  )
}