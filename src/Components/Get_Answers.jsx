// Images logo, Homepage, Answers, user and warning are from https://icons8.com/
import logo from "../assets/learns.png";
import Homepage from "../assets/Homepage.png";
import Answers from "../assets/answers.png";
import TestOne from "../assets/testOne.png";
import podcast from "../assets/podcast.png";
import progress from "../assets/progress.png";
import user from "../assets/user.png";
import open from "../assets/course.png";
import download from "../assets/download.png";
import warning from "../assets/warning.png";
import feedback_pic from "../assets/feedback.png";

// Image Faq from https://www.freepik.com/
import Faq from "../assets/Faq.png";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isItemInCache } from "../Network-Status/itemCache";
import { useNetworkStatus } from "../Network-Status/networkHook";
import { AlertInfo } from "./Alert_Msg/Alert-Info";
export function Get_Answers() {
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const [userFirstname] = useState(() => localStorage.getItem('userFirstname') || "Guest Learner");
  const getMemberStatus = localStorage.getItem("isLoggedIn");
  const isMember = getMemberStatus === "true";

  const [checked_sem_1, setChecked_Sem_1] = useState(false);
  const [checked_sem_3, setChecked_Sem_3] = useState(false);
  const [checked_sem_5, setChecked_Sem_5] = useState(false);
  const [checked_sem_2, setChecked_Sem_2] = useState(false);
  const [checked_sem_4, setChecked_Sem_4] = useState(false);
  const [checked_sem_6, setChecked_Sem_6] = useState(false);

  const [openAnswer, setOpenAnswer] = useState(false);
  console.log(openAnswer);

    const [offlineMsg, setOfflineMsg] = useState(false);
    const handleOfflineMsg = () => {
      setOfflineMsg(false);
    };

    const [showInCacheBtn, setShowInCacheBtn] = useState({
      sem1: false,
      sem3: false,
      sem4: false,
      sem5: false,
      sem6: false
    });

   useEffect(() => {
      async function verifyCache(fileUrl) {
          
          try {
          const cacheName = 'local-media-cache';
          const cache = await caches.open(cacheName);
          const cachedRequests = await cache.keys();
          
          // Optimisation : Créer un tableau simple des URLs en cache pour chercher vite
          // On obtient ["http://localhost:4173/Docs/...", ...]
          const cachedUrls = cachedRequests.map(req => decodeURIComponent(req.url));

          const isInCache = cachedUrls.some(url => url.includes(fileUrl));
          
         if(isInCache) {
          if(fileUrl.includes('Semester_1')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem1: true }));
            return;
          }
          if(fileUrl.includes('Semester_3')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem3: true }));
            return;
          }
          if(fileUrl.includes('Semester_5')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem5: true }));
            return;
          }
          if(fileUrl.includes('Semester_4')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem4: true }));
            return;
          }
          if(fileUrl.includes('Semester_6')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem6: true }));
            return;
          }
         }
         return false;
  
        } catch (error) {
          console.error("Erreur lecture cache:", error);
        }
        
        }
        
        if(checked_sem_1) verifyCache('/Docs/Semester_1/Semester_1_Detailled_document.pdf');
        if(checked_sem_3) verifyCache('/Docs/Semester_3/Semester_3_Detailled_document.pdf');
        if(checked_sem_5) verifyCache('/Docs/Semester_5/Semester_5_Detailled_document.pdf');
        if(checked_sem_4) verifyCache('/Docs/Semester_4/Semester_4_Detailled_document.pdf');
        if(checked_sem_6) verifyCache('/Docs/Semester_6/Semester_6_Detailled_document.pdf');
    }, [checked_sem_1, checked_sem_2, checked_sem_3, checked_sem_4, checked_sem_5, checked_sem_6]);

    const openDocInNewTab = async (e) => {
      e.preventDefault();
      const currentItem = e.currentTarget;
      const fileUrl = currentItem.getAttribute("href");
        const findItemInTheCache = await isItemInCache(fileUrl);
    
        if(!isOnline && !findItemInTheCache) {
          setOfflineMsg(true);
          return;
        }
        window.open(fileUrl, "_blank");
        return;
    }
      const [downloadTxt, setDownloadTxt] = useState("Download");
      const getExplainedDoc = async (e) => {
        e.preventDefault();
        setDownloadTxt("Preparing...");
        const currentItem = e.currentTarget;
        const fileUrl = currentItem.getAttribute("href");
        const findItemInTheCache = await isItemInCache(fileUrl);
    
        if(!isOnline && !findItemInTheCache) {
          setOfflineMsg(true);
          setDownloadTxt("Download");
          return;
        }

        const dataDocName = currentItem.getAttribute("data-doc-name");
        const getItemTarget = currentItem.getAttribute("target");
    
        if(getItemTarget === "_blank") {
          window.open(fileUrl, "_blank");
          return;
        } else {
          try {
            const response = await fetch(fileUrl);
    
            if (response.ok) {
                // The Service Worker has successfully intercepted and CACHED the file.
              setDownloadTxt("Download");
            if(fileUrl.includes('Semester_1')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem1: true }));
          }
          if(fileUrl.includes('Semester_3')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem3: true }));
          }
          if(fileUrl.includes('Semester_5')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem5: true }));
          }
          if(fileUrl.includes('Semester_4')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem4: true }));
          }
          if(fileUrl.includes('Semester_6')) {
            setShowInCacheBtn(prevState => ({ ...prevState, sem6: true }));
          }
                // 3. Trigger the actual browser download using the response data.
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
    
                // Create a temporary link element to prompt the download dialog
                const tempLink = document.createElement('a');
                tempLink.href = url;
                tempLink.setAttribute('download', `${dataDocName}.pdf`);
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
    
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
          setDownloadTxt("Download");
            console.error("Fetch failed (offline or server error):", error);
            // Handle offline state here (show your "connect first" message)
            alert("Unable to download or access file. Please check connection."); 
        }
        }
  
        }
  
  useEffect(() => {
    const all = document.querySelectorAll(".semester-choice ul li")

    const Inps = document.querySelectorAll("input")

    if(checked_sem_1 || checked_sem_2 || checked_sem_3 || checked_sem_4 || checked_sem_5 || checked_sem_6){
      Inps.forEach((inp) => {
  
        if(inp.checked){
          const styleToParent = inp.parentElement
          styleToParent.style.color = "#F8FBFF";
          styleToParent.style.backgroundImage =
            "linear-gradient(to right, #105ee5, #0F56D2)";
          styleToParent.style.borderTop = "2px solid #0F56D2";
          styleToParent.style.borderBottom = "2px dotted #FFCF80";
          styleToParent.style.boxShadow =
            "inset 3px 0px 0px #FFCF80, -3px 0px 0px #0F56D2, inset -3px 0px 0px #FFCF80, 3px 0px 0px #0F56D2";
        } 
      })

    } else {
      Inps.forEach((inp) => {
          const styleToParent_2 = inp.parentElement
          styleToParent_2.style.color = "";
        styleToParent_2.style.backgroundImage = "";
        styleToParent_2.style.borderTop = "";
        styleToParent_2.style.borderBottom = "";
        styleToParent_2.style.boxShadow = "";
      })
    }

    const handleClick = (event) => {
      const target = event.currentTarget
      if(target) {
        all.forEach((el) => {
        el.style.color = "";
          el.style.backgroundImage = "";
          el.style.borderTop = "";
          el.style.borderBottom = "";
          el.style.boxShadow = "";
      })
      target.style.color = "#F8FBFF";
        target.style.backgroundImage =
          "linear-gradient(to right, #105ee5, #0F56D2)";
        target.style.borderTop = "2px solid #0F56D2";
        target.style.borderBottom = "2px dotted #FFCF80";
        target.style.boxShadow =
          "inset 3px 0px 0px #FFCF80, -3px 0px 0px #0F56D2, inset -3px 0px 0px #FFCF80, 3px 0px 0px #0F56D2";
      }
    }

    all.forEach((el) => {
      el.addEventListener("click", handleClick)
    })

    return () => {
      all.forEach((el) => {
        el.removeEventListener("click", handleClick)
      })
    }

  }, [checked_sem_1, checked_sem_2, checked_sem_3, checked_sem_4, checked_sem_5, checked_sem_6])

  const True_Sem_1_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_3");
    localStorage.removeItem("Answer_Sem_5");
    localStorage.removeItem("Answer_Sem_2");
    localStorage.removeItem("Answer_Sem_4");
    localStorage.removeItem("Answer_Sem_6");
    setChecked_Sem_1(e.target.checked);
    setChecked_Sem_3(false)
    setChecked_Sem_5(false)
    setChecked_Sem_2(false)
    setChecked_Sem_4(false);
    setChecked_Sem_6(false);
    localStorage.setItem("Answer_Sem_1", true);
  };
  const True_Sem_3_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_1");
    localStorage.removeItem("Answer_Sem_5");
    localStorage.removeItem("Answer_Sem_2");
    localStorage.removeItem("Answer_Sem_4");
    localStorage.removeItem("Answer_Sem_6");
    setChecked_Sem_3(e.target.checked);
    setChecked_Sem_1(false)
    setChecked_Sem_5(false)
    setChecked_Sem_2(false)
    setChecked_Sem_4(false);
    setChecked_Sem_6(false);
    localStorage.setItem("Answer_Sem_3", true);
  };
  const True_Sem_5_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_3");
    localStorage.removeItem("Answer_Sem_1");
    localStorage.removeItem("Answer_Sem_2");
    localStorage.removeItem("Answer_Sem_4");
    localStorage.removeItem("Answer_Sem_6");
    setChecked_Sem_5(e.target.checked);
    setChecked_Sem_3(false)
    setChecked_Sem_1(false)
    setChecked_Sem_2(false)
    setChecked_Sem_4(false);
    setChecked_Sem_6(false);
    localStorage.setItem("Answer_Sem_5", true);
  };

  const True_Sem_2_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_1");
    localStorage.removeItem("Answer_Sem_3");
    localStorage.removeItem("Answer_Sem_5");
    localStorage.removeItem("Answer_Sem_4");
    localStorage.removeItem("Answer_Sem_6");
    setChecked_Sem_2(e.target.checked);
    setChecked_Sem_1(false);
    setChecked_Sem_3(false);
    setChecked_Sem_5(false);
    setChecked_Sem_4(false);
    setChecked_Sem_6(false);
    localStorage.setItem("Answer_Sem_2", true);
  };

  const True_Sem_4_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_1");
    localStorage.removeItem("Answer_Sem_3");
    localStorage.removeItem("Answer_Sem_5");
    localStorage.removeItem("Answer_Sem_2");
    localStorage.removeItem("Answer_Sem_6");
    setChecked_Sem_4(e.target.checked);
    setChecked_Sem_1(false);
    setChecked_Sem_3(false);
    setChecked_Sem_5(false);
    setChecked_Sem_2(false);
    setChecked_Sem_6(false);
    localStorage.setItem("Answer_Sem_4", true);
  };
  const True_Sem_6_Checked = (e) => {
    localStorage.removeItem("Answer_Sem_1");
    localStorage.removeItem("Answer_Sem_3");
    localStorage.removeItem("Answer_Sem_5");
    localStorage.removeItem("Answer_Sem_2");
    localStorage.removeItem("Answer_Sem_4");
    setChecked_Sem_6(e.target.checked);
    setChecked_Sem_1(false);
    setChecked_Sem_3(false);
    setChecked_Sem_5(false);
    setChecked_Sem_2(false);
    setChecked_Sem_4(false);
    localStorage.setItem("Answer_Sem_6", true);
  };

  useEffect(() => {
    const getSem_1 = localStorage.getItem("Answer_Sem_1");
    const getSem_3 = localStorage.getItem("Answer_Sem_3");
    const getSem_5 = localStorage.getItem("Answer_Sem_5");
    const getSem_2 = localStorage.getItem("Answer_Sem_2");
    const getSem_4 = localStorage.getItem("Answer_Sem_4");
    const getSem_6 = localStorage.getItem("Answer_Sem_6");

    if (getSem_1) {
      setChecked_Sem_1(true);
    }
    if (getSem_3) {
      setChecked_Sem_3(true);
    }
    if (getSem_5) {
      setChecked_Sem_5(true);
    }
    if (getSem_2) {
      setChecked_Sem_2(true);
    }
    if (getSem_4) {
      setChecked_Sem_4(true);
    }
    if (getSem_6) {
      setChecked_Sem_6(true);
    }
  }, []);

  useEffect(() => {
    if(checked_sem_1 || checked_sem_3 || checked_sem_5 || checked_sem_2 || checked_sem_4 || checked_sem_6){
      const All_RevealAnswers = document.querySelectorAll(".reveal-answer")

      const handleClick = (event) => {
        const newTextContent = event.target.textContent.trim();
          setOpenAnswer((prevState) => {
          console.log(prevState, "implemented by RID-Techs");
          const newState = newTextContent === "Click to see the answer";
          event.target.textContent = newState ? "Close" : "Click to see the answer";
          return newState;
        })
      }

      All_RevealAnswers.forEach(Open_Answer => {
        Open_Answer.addEventListener("click", handleClick)
      })

      return () => {
        All_RevealAnswers.forEach(Open_Answer => {
          Open_Answer.removeEventListener("click", handleClick)
        })
      }
    }
  }, [checked_sem_1, checked_sem_3, checked_sem_5, checked_sem_2, checked_sem_4, checked_sem_6])

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

  async function openCachedPDF(url) {
    await navigator.serviceWorker.ready;
  
    const cache = await caches.open('local-media-cache');
    const cachedResponse = await cache.match(url);
  
    if (!cachedResponse) {
      console.error("PDF not found in cache:", url);
      return;
    }
  
    // ✅ Just navigate with the original URL
    navigate("/pdfreader", { state: { url }, replace: false });
  }

  return (
    <>
    {
          offlineMsg && (
            <div className="alert-msg-container">
          <div className="alert-msg">
          <AlertInfo message="You are currently offline. Please connect to the internet to download this file. 🤗🌴" />
          <div className="alert-msg-footer">
            <button onClick={handleOfflineMsg} type="button">Close</button>
          </div>
          </div>
        </div>
          )
        }
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
            <NavLink className="active" to={"/Get_Answers"}>
              <li>
                {" "}
                <img height={22} src={Answers} alt="Answers" /> Answer Hub{" "}
              </li>
            </NavLink>
             <NavLink className="" to={"/Test"}>
              <li>
                {" "}
                <img height={22} src={TestOne} alt="Answers" /> Test{" "}
              </li>
            </NavLink>
            <NavLink className="" to={"/Podcast"}>
              <li>
                {" "}
                <img height={22} src={podcast} alt="Podcast" /> E-Podcast{" "}
              </li>
            </NavLink>
            <NavLink className="" to={"/Learning_progress"}>
              <li>
                {" "}
                <img height={22} src={progress} alt="Podcast" /> Essentials{" "}
              </li>
            </NavLink>
          <NavLink className="" to={"/Survey"}>
              <li>
                {" "}
                <img height={22} src={feedback_pic} alt="Answers" /> Survey{" "}
              </li>
            </NavLink>
            
          </ul>
        </div>
        </div>
      </div>


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

      <div className="container welcome_2">
        <div className="welcome-text mt-4">
          <h2 id="welcome-message">
            {" "}
            <span id="my-semester-span">~</span> Dear {userFirstname}{" "}
            <img src={user} alt="user" /> ~{" "}
          </h2>
          <p id="Enjoy">
            Here, you have{" "}
            <strong>
              <em>
                all the answers to the Frequently Asked Questions with regard to
                each course.
              </em>
            </strong>
          </p>
          <p id="welcome-foot">Enjoy reading the answers while, of course, integrating them with your own ideas. It could be an advantage for you.</p>
        </div>

        <div className="ms-lg-3">
          <img height={250} width={250} src={Faq} alt="Faq" />
        </div>
      </div>

      <div className="container mt-4">
        <hr className="divider" />
      </div>
      <div className="container mt-5">
        <h1 id="my-semester">
          {" "}
          <span id="my-semester-span">~</span>{" "}
          <span id="my-semester-text">Choose my semester</span>
        </h1>
      </div>

      <div className="container semester-choice mt-4">
        <ul>
          <label htmlFor="semester_1">
          <li>
              Semester 1{" "}
              <input
                checked={checked_sem_1}
                onChange={True_Sem_1_Checked}
                type="checkbox"
                id="semester_1"
              />
            </li>
          </label>
          <label htmlFor="semester_2">
            <li>
              Semester 2{" "}
              <input
                checked={checked_sem_2}
                onChange={True_Sem_2_Checked}
                type="checkbox"
                id="semester_2"
              />
            </li>
          </label>
          <label htmlFor="semester_3">
          <li>
              Semester 3{" "}
              <input
                checked={checked_sem_3}
                onChange={True_Sem_3_Checked}
                type="checkbox"
                id="semester_3"
              />
            </li>
          </label>
          <label htmlFor="semester_4">
            <li>
              Semester 4{" "}
              <input
                checked={checked_sem_4}
                onChange={True_Sem_4_Checked}
                type="checkbox"
                id="semester_4"
              />
            </li>
          </label>
          <label htmlFor="semester_5">
         <li>
              Semester 5{" "}
              <input
                checked={checked_sem_5}
                onChange={True_Sem_5_Checked}
                type="checkbox"
                id="semester_5"
              />
            </li>
         </label>
          <label htmlFor="semester_6">
            <li>
              Semester 6{" "}
              <input
                checked={checked_sem_6}
                onChange={True_Sem_6_Checked}
                type="checkbox"
                id="semester_6"
              />
            </li>
          </label>
        </ul>
        <p>
          <span id="semester-note">Please note</span> : You have to choose your
          semester before seeing the{" "}
          <span id="semester-note-2">Answers to Questions</span> related to your courses !
        </p>
      </div>

      <div className="container mt-4">
        <h1 id="my-current-courses">
          {" "}
          <span id="my-semester-span">~</span>{" "}
          <span id="my-semester-text">Answers to Questions</span>
        </h1>
      </div>

      <div className="container mt-5">
        { checked_sem_1 === false && checked_sem_3 === false && checked_sem_5 === false && checked_sem_2 === false && checked_sem_4 === false && checked_sem_6 === false ? (
          <p id="no-course">
            {" "}
            <img
              className="me-2"
              height={32}
              src={warning}
              alt="warning"
            />{" "}
            There is no answer at the moment ! Please choose your semester first.
          </p>
        ) : null}
      </div>

      <div className="container">

        {checked_sem_1 && (<div className="col">
          <div className="faq-holder">
                <h5 className="doc-header">
                🏅🖌🌿 Click on either <span className="underline"><em>{`"`}Open{`"`}</em></span> or <span className="underline"><em>{`"`}Download{`"`}</em></span> to get a well-explained document that will help you understand all the topics related to Semester 1 courses.
                </h5>
                <div className="spacers">---------------</div>
                {
                  isMember ? (
                    showInCacheBtn.sem1 ? (
                      <div className="Detailled-docs">
                <a onClick={() => openCachedPDF("/Docs/Semester_1/Semester_1_Detailled_document.pdf")} data-doc-name="Semester 1 Detailled document" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                </div>
                    ) : (
                       <div className="Detailled-docs">
                <a onClick={openDocInNewTab} href="https://drive.google.com/file/d/1t9pv_-A_9TS8FAdDjWdmnwqQISK4fDvB/view?usp=drive_link" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                <a onClick={getExplainedDoc} href="/Docs/Semester_1/Semester_1_Detailled_document.pdf" data-doc-name="Semester 1 Detailled document" rel="noopener noreferrer"> <img height={22} src={download} alt="doc" /> {downloadTxt}</a>
                </div>
                    )
                  ) : (
                    <div className="Detailled-docs">
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={open} alt="doc" /> Open</a>
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={download} alt="doc" /> Download</a>
                </div>
                  )
                }
              </div>
            </div>)}

        {checked_sem_3 && (<div className="col">
          <div className="faq-holder">
                <h5 className="doc-header">
                🏅🖌🌿 Click on either <span className="underline"><em>{`"`}Open{`"`}</em></span> or <span className="underline"><em>{`"`}Download{`"`}</em></span> to get a well-explained document that will help you understand all the topics related to Semester 3 courses.
                </h5>
                <div className="spacers">---------------</div>

                {
                  isMember ? (
                    showInCacheBtn.sem3 ? (
                      <div className="Detailled-docs">
                <a onClick={() => openCachedPDF("/Docs/Semester_3/Semester_3_Detailled_document.pdf")} data-doc-name="Semester 3 Detailled document" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                </div>
                    ) : (
                      <div className="Detailled-docs">
                <a onClick={openDocInNewTab} href="https://drive.google.com/file/d/1kszTY85pFpXeJQfdSg5ayC_D_8U8rG0y/view?usp=drive_link" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                <a onClick={getExplainedDoc} href="/Docs/Semester_3/Semester_3_Detailled_document.pdf" data-doc-name="Semester 3 Detailled document" rel="noopener noreferrer"> <img height={22} src={download} alt="doc" /> {downloadTxt}</a>
                </div>
                    )
                  ) : (
                    <div className="Detailled-docs">
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={open} alt="doc" /> Open</a>
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={download} alt="doc" /> Download</a>
                </div>
                  )
                }


              </div>
            </div>)}

        {checked_sem_5 && (<div className="col">
          <div className="faq-holder">
                <h5 className="doc-header">
                🏅🖌🌿 Click on either <span className="underline"><em>{`"`}Open{`"`}</em></span> or <span className="underline"><em>{`"`}Download{`"`}</em></span> to get a well-explained document that will help you understand all the topics related to Semester 5 courses.
                </h5>
                <div className="spacers">---------------</div>

                {
                  isMember ? (
                    showInCacheBtn.sem5 ? (
                  <div className="Detailled-docs">
                <a onClick={() => openCachedPDF("/Docs/Semester_5/Semester_5_Detailled_document.pdf")} data-doc-name="Semester 5 Detailled document" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                </div>
                    ) : (
                      <div className="Detailled-docs">
                <a onClick={openDocInNewTab} href="https://drive.google.com/file/d/1TrQibA-a3GFAuX--95tBdFfp4cVFEC31/view?usp=drive_link" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                <a onClick={getExplainedDoc} href="/Docs/Semester_5/Semester_5_Detailled_document.pdf" data-doc-name="Semester 5 Detailled document" rel="noopener noreferrer"> <img height={22} src={download} alt="doc" /> {downloadTxt}</a>
                </div>
                    )
                  ) : (
                    <div className="Detailled-docs">
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={open} alt="doc" /> Open</a>
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={download} alt="doc" /> Download</a>
                </div>
                  )
                }
              </div>
            </div>)}

        {checked_sem_2 && (
          <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-4">
            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Compare and contrast African oral literature and
                  written literature ?
                </h5>
                {
                  isMember ? (
                    <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <strong>🌿 Similarities :</strong>
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Cultural Expression :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written literature are forms of cultural
                      expression, reflecting the values, beliefs, and traditions
                      of African societies.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Storytelling :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written traditions involve storytelling as a
                      fundamental method of conveying information, history, and
                      moral lessons.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Aesthetic Qualities :</em>
                        </strong>
                      </span>{" "}
                      Both forms can be highly artistic, using language, rhythm,
                      and imagery to create aesthetic experiences for the
                      audience or reader.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Preservation of Culture :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written traditions serve to preserve and
                      transmit cultural heritage from one generation to another.
                    </p>

                    <strong>🌿 Differences :</strong>
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Medium of Transmission :</em>
                        </strong>
                      </span>{" "}
                      Oral literature is transmitted verbally, often through
                      performance, while written literature is conveyed through
                      written texts.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Flexibility :</em>
                        </strong>
                      </span>{" "}
                      Oral literature is more flexible and subject to change
                      with each performance, allowing for variations and
                      adaptations. Written literature tends to be fixed once it
                      is written.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Audience Participation :</em>
                        </strong>
                      </span>{" "}
                      Oral literature often involves direct audience
                      participation, with listeners responding to the performer.
                      Written literature is typically consumed individually,
                      without the same level of immediate interaction.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Accessibility :</em>
                        </strong>
                      </span>{" "}
                      Oral literature may be more accessible to a wider
                      audience, especially in societies with lower literacy
                      rates, while written literature requires literacy.
                    </p>
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : How Orature influences Written Literature ?
                </h5>

                {
                  isMember ? (
                    <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Preservation of Oral Traditions :</em>
                        </strong>
                      </span>{" "}
                      Many African writers draw on oral traditions in their written works to preserve and promote the richness of their cultural heritage. They incorporate folklore, myths, proverbs, and oral narratives into their written stories.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Linguistic Influence :</em>
                        </strong>
                      </span>{" "}
                      Orature contributes to the linguistic diversity and richness of written literature. Writers often integrate oral linguistic elements, such as idioms and speech patterns, into their written works.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Storytelling Techniques :</em>
                        </strong>
                      </span>{" "}
                      African writers often adopt storytelling techniques from orature, such as non-linear narrative structures, rhythmic language, and the use of multiple voices or perspectives in their written works.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Cultural Identity :</em>
                        </strong>
                      </span>{" "}
                      Orature helps writers explore and assert their cultural identity. By incorporating oral traditions into written literature, authors bridge the gap between the two forms and affirm the importance of their cultural roots.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Social Commentary :</em>
                        </strong>
                      </span>{" "}
                      Orature often serves as a medium for social and political commentary. When integrated into written literature, it allows writers to address contemporary issues while drawing on the deep well of cultural wisdom present in oral traditions.
                    </p>

                    <p>
                    <strong><em>In summary</em></strong>, African oral literature and written literature share common themes and serve as complementary expressions of cultural identity. Orature continues to influence written literature by providing a rich source of material, linguistic elements, and storytelling techniques.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

          </div>
        )}

        {checked_sem_4 && (
          <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-4">
            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Compare and contrast African oral literature and
                  written literature ?
                </h5>
                
                {
                  isMember ? (
                    <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <strong>🌿 Similarities :</strong>
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Cultural Expression :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written literature are forms of cultural
                      expression, reflecting the values, beliefs, and traditions
                      of African societies.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Storytelling :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written traditions involve storytelling as a
                      fundamental method of conveying information, history, and
                      moral lessons.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Aesthetic Qualities :</em>
                        </strong>
                      </span>{" "}
                      Both forms can be highly artistic, using language, rhythm,
                      and imagery to create aesthetic experiences for the
                      audience or reader.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Preservation of Culture :</em>
                        </strong>
                      </span>{" "}
                      Both oral and written traditions serve to preserve and
                      transmit cultural heritage from one generation to another.
                    </p>

                    <strong>🌿 Differences :</strong>
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Medium of Transmission :</em>
                        </strong>
                      </span>{" "}
                      Oral literature is transmitted verbally, often through
                      performance, while written literature is conveyed through
                      written texts.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Flexibility :</em>
                        </strong>
                      </span>{" "}
                      Oral literature is more flexible and subject to change
                      with each performance, allowing for variations and
                      adaptations. Written literature tends to be fixed once it
                      is written.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Audience Participation :</em>
                        </strong>
                      </span>{" "}
                      Oral literature often involves direct audience
                      participation, with listeners responding to the performer.
                      Written literature is typically consumed individually,
                      without the same level of immediate interaction.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Accessibility :</em>
                        </strong>
                      </span>{" "}
                      Oral literature may be more accessible to a wider
                      audience, especially in societies with lower literacy
                      rates, while written literature requires literacy.
                    </p>
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : How Orature influences Written Literature ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    
                    <p className="mt-2">
                      <span className="underline">
                        <strong>
                          <em>- Preservation of Oral Traditions :</em>
                        </strong>
                      </span>{" "}
                      Many African writers draw on oral traditions in their written works to preserve and promote the richness of their cultural heritage. They incorporate folklore, myths, proverbs, and oral narratives into their written stories.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Linguistic Influence :</em>
                        </strong>
                      </span>{" "}
                      Orature contributes to the linguistic diversity and richness of written literature. Writers often integrate oral linguistic elements, such as idioms and speech patterns, into their written works.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Storytelling Techniques :</em>
                        </strong>
                      </span>{" "}
                      African writers often adopt storytelling techniques from orature, such as non-linear narrative structures, rhythmic language, and the use of multiple voices or perspectives in their written works.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Cultural Identity :</em>
                        </strong>
                      </span>{" "}
                      Orature helps writers explore and assert their cultural identity. By incorporating oral traditions into written literature, authors bridge the gap between the two forms and affirm the importance of their cultural roots.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Social Commentary :</em>
                        </strong>
                      </span>{" "}
                      Orature often serves as a medium for social and political commentary. When integrated into written literature, it allows writers to address contemporary issues while drawing on the deep well of cultural wisdom present in oral traditions.
                    </p>

                    <p>
                    <strong><em>In summary</em></strong>, African oral literature and written literature share common themes and serve as complementary expressions of cultural identity. Orature continues to influence written literature by providing a rich source of material, linguistic elements, and storytelling techniques.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : What are the characteristics of puritan poetry ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Puritan poetry in the context of American poetry is characterized by several distinctive features that reflect the beliefs and values of the Puritans who colonized America in the 17th and 18th centuries. Some key characteristics of Puritan poetry include :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Religiosity :</em>
                        </strong>
                      </span>{" "}
                      Puritan poetry often reflects a profound religious devotion and a strong sense of duty towards God. The Puritans viewed poetry as a means to glorify God and convey moral teachings.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Simplicity and Clarity :</em>
                        </strong>
                      </span>{" "}
                      Puritan poets valued simplicity and clarity in expressing their ideas. They avoided pompous language and preferred direct, accessible language.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Focus on Religious and Moral Themes :</em>
                        </strong>
                      </span>{" "}
                      Puritan poetry focuses on themes such as salvation, redemption, sin, morality, and the afterlife. These poets sought to morally instruct their readers through their writings.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Use of Allegories and Metaphors :</em>
                        </strong>
                      </span>{" "}
                      Puritan poets often employed allegories and metaphors to effectively convey their messages. These rhetorical devices were used to illustrate religious and moral concepts.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Emphasis on Everyday Life and Spiritual Struggle :</em>
                        </strong>
                      </span>{" "}
                      While Puritan poetry centered on religious themes, it also addressed aspects of Puritan everyday life, as well as their spiritual and emotional struggles on the path to salvation.
                    </p>

                    <p>
                    <strong><em>In summary</em></strong>, Puritan poetry in the context of American literature is deeply religious, moralistic, simple in style, and focuses on themes such as redemption, sin, and spiritual life. These characteristics make it unique within the American poetic tradition.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss Integration in the British Context.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 <strong>Integration</strong> is a multifaceted process that involves mutual acceptance and adaptation between immigrants and the host society. In the context of British civilization, successful integration has been facilitated through various measures, policies, and initiatives designed to support immigrants in becoming active and accepted members of the community. Key steps that have eased immigrant integration in Britain include :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- 1. Legislative Frameworks :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong>a. Race Relations Acts</strong> <br />
                      The Race Relations Acts provided a legal basis for combating discrimination and promoting equality : <br />
                      <strong>*Race Relations Act 1965*:</strong> Outlawed discrimination in public places based on race, color, or ethnic origins. <br />
                      <strong>*Race Relations Act 1968*:</strong> Extended anti-discrimination laws to employment, housing, and public services. <br />
                      <strong>*Race Relations Act 1976*:</strong> Introduced the concept of indirect discrimination and established the Commission for Racial Equality to promote racial harmony. <br />

                      <strong>b. British Nationality Acts</strong> <br />
                      These acts helped define who could become British citizens, fostering a sense of belonging : <br />
                      <strong>*British Nationality Act 1948*:</strong> Created the status of Citizens of the United Kingdom and Colonies (CUKC), encouraging Commonwealth migration. <br />
                      <strong>*British Nationality Act 1981*:</strong> Reclassified British nationality into five categories, clarifying rights and responsibilities for different groups.

                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- 2. Education and Language Support :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong>a. English Language Courses</strong> <br />
                      Proficiency in the English language is crucial for effective integration : <br />
                      <strong>*ESOL (English for Speakers of Other Languages)*:</strong> Programs provide language training for immigrants to enhance communication skills, improve job prospects, and facilitate social interactions. <br />

                      <strong>b. Multicultural Education</strong> <br />
                      Schools play a vital role in promoting understanding and acceptance of different cultures : <br />
                      <strong>*Inclusive Curriculum*:</strong> Teaching about various cultures, histories, and contributions of different ethnic groups helps build mutual respect. <br />
                      <strong>*Support for Bilingual Students*:</strong>  Offering additional support for students whose first language is not English ensures they can thrive academically. <br /> 
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- 3. Employment Opportunities and Economic Integration :</em>
                        </strong>
                      </span>{" "} <br />
                      Access to employment is essential for economic self-sufficiency and social integration : <br />
                      <strong>*Work Permit Schemes*:</strong> Simplifying the process for immigrants to obtain work permits encourages lawful employment. <br />
                      <strong>*Recognition of Qualifications*:</strong> Ensuring that foreign qualifications are recognized or providing pathways for certification helps immigrants utilize their skills.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- 4. Community and Social Integration :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong>a. Community Organizations and Support Networks 
                      </strong> <br />
                      Community organizations offer vital support and resources : <br />

                      <strong>*Cultural Associations*:</strong> These organizations provide a sense of community, cultural preservation, and mutual aid. <br />
                      <strong>*Integration Programs*:</strong> Initiatives that bring together different community groups foster social cohesion and understanding. <br />

                      <strong>b. Housing Policies :</strong> <br />
                      Access to adequate housing is a critical aspect of integration : <br />
                      <strong>*Equal Access to Housing*:</strong> Ensuring non-discriminatory access to housing markets and public housing helps prevent segregation. <br />
                      <strong>*Supportive Housing Initiatives*:</strong> Programs that assist immigrants in finding housing contribute to their stability and integration.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- 5. Health and Social Services :</em>
                        </strong>
                      </span>{" "} <br />
                      Providing equitable access to health and social services is crucial : <br />
                      <strong>*Healthcare Access*:</strong> Ensuring immigrants can access healthcare services without discrimination improves their well-being and integration prospects. <br />
                      <strong>*Social Services Support*:</strong> Offering support for social services, such as child care and counseling, helps families adjust to their new environment.
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- 6. Political Participation and Civic Engagement :</em>
                        </strong>
                      </span>{" "} <br />
                      Encouraging immigrants to participate in the political process and civic life strengthens their sense of belonging : <br />
                      <strong>*Voting Rights*:</strong> Extending voting rights to immigrants in local elections increases their involvement in community decision-making. <br />
                      <strong>*Civic Education*:</strong> Educating immigrants about their rights and responsibilities helps them engage more effectively in society.
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- 7. Anti-Discrimination Policies and Advocacy :</em>
                        </strong>
                      </span>{" "} <br />
                      Combating racism and discrimination is fundamental for a welcoming environment : <br />
                      <strong>*Anti-Discrimination Campaigns*:</strong> Public awareness campaigns challenge prejudices and promote inclusivity. <br />
                      <strong>*Advocacy Groups*:</strong> Organizations that advocate for immigrants{`'`} rights work to ensure their fair treatment and representation.
                    </p>

                    <p>
                    <strong>Conclusion</strong> <br />
                    Integration in Britain has been facilitated through comprehensive legislative frameworks, education and language support, employment opportunities, community initiatives, access to health and social services, political participation, and strong anti-discrimination policies. These measures have created an environment where immigrants can actively participate in and contribute to society, fostering mutual acceptance and respect. As a result, Britain has become a successful multicultural country characterized by its rich diversity and vibrant cultural landscape.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : What are the landmarks which show the effectiveness of British integration ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Here{"'"}s a comprehensive list of landmarks demonstrating the effectiveness of British integration :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Citizenship Tests and Ceremonies :</em>
                        </strong>
                      </span>{" "} <br />
                      Introduced by the Immigration, Nationality and Asylum Act 2002, citizenship tests and ceremonies became a pivotal part of the integration process. The first citizenship ceremony was held in 2004, and these ceremonies have since become compulsory. During the ceremonies, applicants swear allegiance to the Queen and commit to respecting British values. This formal process underscores the importance placed on integrating new citizens into British society .
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Legislation and Policy Changes :</em>
                        </strong>
                      </span>{" "} <br />
                      The British Nationality Act of 1981 and its subsequent amendments, such as the Nationality, Immigration and Asylum Act 2002 and the Immigration, Asylum and Nationality Act 2006, illustrate continuous efforts to refine and adapt immigration and integration policies. These legislative changes aimed to reclassify citizenship categories, modify the principle of ius soli, and ensure that nationality could be passed on by either parent . <br />
                      The 1968 Race Relations Act expanded the scope of anti-discrimination laws, covering employment and housing, and reinforced the institutional framework for addressing racial issues .
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Multicultural Policies: </em>
                        </strong>
                      </span>{" "} <br />
                      1969 onwards: The development and institutionalization of multiculturalist policies aimed at easing tensions within and between communities by granting them the right to express their cultural differences both privately and publicly. Examples include : <br />
                      * Sikh bus drivers gaining the right to wear traditional beards and turbans at work. <br />
                      * The inclusion of ethnic histories in British school curricula. <br />
                      * Providing access to official documents in multiple languages. <br />
                      * Allowing Muslim women to wear full veils in public spaces. <br />
                      * Creating separate swimming pools and specific school schedules for certain ethnic communities .
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Educational and Social Initiatives :</em>
                        </strong>
                      </span>{" "} <br />
                      Specific measures to accommodate diverse communities, such as separate swimming pools for men and women in neighborhoods with a high rate of Muslim immigrants, and schools with adapted rhythms for Pakistani families, reflect practical steps taken to integrate diverse communities into British society .
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Stephen Lawrence Case and McPherson Report :</em>
                        </strong>
                      </span>{" "} <br />
                      1993: The murder of Stephen Lawrence, a black teenager, highlighted issues of racial discrimination and institutional racism in the UK. The subsequent McPherson Report in 1999 brought significant attention to these issues and led to reforms in policing and public services to address racial disadvantage and promote equality .
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Political Debates and Initiatives :</em>
                        </strong>
                      </span>{" "} <br />
                      2006-2008: Key political speeches by leaders like Tony Blair, Gordon Brown, and David Cameron addressed the themes of multiculturalism and integration. These speeches acknowledged the progress made in anti-discrimination legislation and the importance of fostering a sense of shared values while respecting cultural diversity. They also proposed initiatives like a {`"`}British Day{`"`} and a {`"`}Museum of Britishness{`"`} to celebrate and reinforce British identity .
                    </p>
                    
                    <p>
                    These landmarks collectively illustrate a multifaceted approach to integration in Britain, blending legal, cultural, and social strategies to foster a cohesive society.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss the British Nationality.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 <strong>British Nationality</strong> has evolved significantly over time, influenced by the principles of <strong>ius soli (right of the soil)</strong> and <strong>ius sanguinis (right of blood)</strong>, alongside various legislative changes. Here{`'`}s an overview of how these principles have shaped British nationality and the key legislative milestones :

                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Ius Soli and Ius Sanguinis :</em>
                        </strong>
                      </span>{" "} <br />
                      *Ius Soli (Right of the Soil)*: This principle grants nationality to individuals born within a country{`'`}s territory, regardless of their parents{`'`} nationality. Historically, British nationality law was heavily influenced by ius soli. <br />
                      *Ius Sanguinis (Right of Blood)*: This principle confers nationality based on descent, meaning a child inherits the nationality of their parents regardless of where they are born. This principle has also played a role in British nationality law, particularly in the context of children born to British parents outside the UK.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- British Nationality Act of 1948 :</em>
                        </strong>
                      </span>{" "} <br />
                      The *British Nationality Act of 1948* was a landmark piece of legislation that redefined British nationality post-World War II. Key aspects include : <br />
                      *Establishment of Citizenship of the United Kingdom and Colonies (CUKC)*: This act created the status of CUKC, which was held by individuals born in the UK or its colonies, as well as those naturalized or registered as CUKCs. <br />
                      *Incorporation of Ius Soli and Ius Sanguinis*: The act maintained elements of both principles, granting citizenship to those born in the UK or its colonies (ius soli) and those born to a British father outside the UK (ius sanguinis). <br />
                      *Commonwealth Citizenship*: The act recognized citizens of Commonwealth countries as British subjects, fostering a sense of shared nationality among former colonies.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- British Nationality Act of 1981 :</em>
                        </strong>
                      </span>{" "} <br />
                      The *British Nationality Act of 1981* significantly reformed British nationality law, introducing a more complex and categorized system of citizenship. Key changes include : <br />
                      <strong>*Reclassification into Five Categories*:</strong> <br />
                      - *British Citizenship*: Granted primarily to those born in the UK to a parent who is a British citizen or settled in the UK, as well as to certain individuals by descent or registration. <br />
                      - *British Dependent Territories Citizenship (BDTC)*: Applied to those connected with the UK{`'`}s remaining overseas territories (renamed British Overseas Territories Citizenship in 2002). <br />
                      - *British Overseas Citizenship (BOC)*: Given to certain former CUKCs who did not qualify for British Citizenship or BDTC. <br />
                      - *British Subject*: Applied to individuals who were British subjects before 1949 and did not acquire any other nationality or citizenship after 1949. <br />
                      - *British Protected Persons*: A status for individuals connected with territories under British protection but not part of the UK or its colonies. <br />
                      <strong>*Modification of Ius Sanguinis*:</strong> <br />
                      - The 1981 act placed greater emphasis on ius sanguinis, particularly for British Citizenship by descent. Children born outside the UK to a British citizen parent could acquire British citizenship by descent, but this was typically limited to one generation born abroad. <br />
                      - The act also introduced stricter conditions for passing on British citizenship by descent, such as requiring the parent to have lived in the UK for a certain period before the child{`'`}s birth. <br />
                      <strong>*Limitation of Ius Soli*:</strong> <br />
                      - The act restricted the automatic acquisition of British citizenship by birth in the UK. Only those born in the UK to a British citizen or a parent settled in the UK could acquire citizenship by birth.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Summary</em>
                        </strong>
                      </span>{" "} <br />
                      *Pre-1948*: British nationality was largely based on ius soli, granting citizenship to those born within the British Empire, and to a lesser extent, ius sanguinis. <br /> *1948 - 1981*: The British Nationality Act of 1948 introduced the CUKC and maintained a blend of ius soli and ius sanguinis, while fostering Commonwealth citizenship. <br /> *Post-1981*: The British Nationality Act of 1981 reclassified British nationality into five categories, emphasized ius sanguinis for passing on citizenship by descent, and restricted ius soli to children born in the UK to British citizens or settled parents.
                    </p>

                    <p>
                    These changes reflect the evolving nature of British nationality law, influenced by historical, political, and social factors, and the need to address the complexities of a globalized world.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss the British welfare state.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 The British welfare state refers to a system of social policies and programs aimed at providing financial and social support to citizens, particularly during times of need or vulnerability. Developed in the aftermath of World War II, the welfare state embodies principles of social solidarity, collective responsibility, and the provision of basic rights and services to all citizens. Here{"'"}s a discussion of the British welfare state with clear examples :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- National Health Service (NHS) :</em>
                        </strong>
                      </span>{" "} <br />
                      * The NHS, established in 1948, is one of the most iconic symbols of the British welfare state. <br />
                    * It provides healthcare services that are free at the point of use to residents of the UK, funded through general taxation. <br />
                    * Examples include primary care services (GPs), hospital treatment, emergency care, and specialist services such as mental health and maternity care.
                    </p>

                    <div>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Social Security Benefits :</em>
                        </strong>
                      </span>{" "} <br />
                      * The welfare state provides a safety net through various social security benefits to support individuals and families in times of financial hardship. <br />
                      **19th and 20th Centuries**: Industrialization, urbanization, and cultural movements like the Victorian era contributed to the development of a shared British identity across England, Scotland, Wales, and Ireland. <br />
                      * Examples include : <br />
          <div className="ms-4">
          **Universal Credit** : A means-tested benefit that provides financial support to people on low incomes or who are out of work. <br />
          **State Pension** : A regular payment to individuals who have reached the state pension age, ensuring financial security in retirement. <br />
          **Disability Living Allowance (DLA)** : Financial assistance for people with disabilities to cover the extra costs of living with a disability.
          </div>
                    </div>

                    <div className="mt-3">
                      <span className="underline">
                        <strong>
                          <em>- Education :</em>
                        </strong>
                      </span>{" "} <br />
                      The welfare state ensures access to education as a fundamental right, regardless of socio-economic background. <br />
                      Examples include : <br />
                      <p className="ms-3">
                      **State Schools** : Free education provided by state-funded schools, including primary, secondary, and further education. <br />
                      **Student Loans and Grants** : Financial support for higher education, including tuition fee loans, maintenance loans, and grants to cover living expenses.
                      </p>
                    </div>

                    <div>
                      <span className="underline">
                        <strong>
                          <em>- Social Housing :</em>
                        </strong>
                      </span>{" "} <br />
                      The provision of affordable housing is a key aspect of the welfare state, ensuring access to safe and secure accommodation for all citizens. <br />
                      Examples include : <br />
                      <p className="ms-3">
                      **Council Housing** : Social housing provided by local authorities at below-market rents for people in need of affordable housing. <br />
                      **Housing Benefit** : Financial assistance to help low-income households afford private rented accommodation or meet housing costs.
                      </p>
                    </div>

                    <div>
                      <span className="underline">
                        <strong>
                          <em>- Employment Support :</em>
                        </strong>
                      </span>{" "} <br />
                      The welfare state offers support to unemployed individuals and helps facilitate access to employment opportunities. <br />
                      Examples include : <br />
                      <p className="ms-3">
                      **Jobseeker{"'"}s Allowance (JSA)** : Financial support for people actively seeking work. <br />
                      **Employment Support Allowance (ESA)** : Financial assistance for individuals unable to work due to illness or disability.
                      </p>
                    </div>

                    <div>
                      <span className="underline">
                        <strong>
                          <em>- Childcare and Family Support :</em>
                        </strong>
                      </span>{" "} <br />
                      The welfare state provides support to families and children to ensure their well-being and development. <br />
                      Examples include : <br />
                      <p className="ms-3">
                      **Child Benefit** : Regular payments to support families with the cost of raising children. <br />
                      **Free Early Education** : Government-funded childcare and early education for young children, typically provided through nurseries, pre-schools, and childminders.
                      </p>
                    </div>

                    <p>
                    These examples illustrate the breadth and depth of the British welfare state, which seeks to address a wide range of social needs and promote equality of opportunity for all citizens. The welfare state plays a crucial role in fostering social cohesion, reducing poverty and inequality, and promoting the well-being of individuals and communities across the UK.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : What are the differences and similarities between American Revolutionary poetry and Harlem Renaissance ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Both American Revolutionary poetry and the Harlem Renaissance are significant movements in American literary history, but they emerged in different historical contexts and addressed distinct themes and concerns. Here{"'"}s an overview of their differences and similarities :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- American Revolutionary Poetry :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underline">
                        <strong>
                          <em>- Context :</em>
                        </strong>
                      </span> <br />
                      **Time Period**: American Revolutionary poetry emerged during the late 18th century, primarily around the time of the American Revolutionary War (1775-1783).<br />
                      **Political Context**: This poetry reflected the revolutionary spirit and ideals of the American colonies seeking independence from British rule. It often expressed patriotic sentiments, calls for freedom, and critiques of British oppression. <br />
                    </p>
  
                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Themes and Concerns :</em>
                        </strong>
                      </span>{" "} <br />
                      **Patriotism and National Identity**: American Revolutionary poetry celebrated the idea of a new American nation and expressed pride in American identity. <br />
                      **Freedom and Liberty**: Poets of this era often emphasized the importance of individual rights, freedom from tyranny, and the pursuit of liberty.<br />
                      **Nature and Landscapes**: Many poems reflected the natural beauty of the American landscape and its potential for growth and freedom.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Key Figures and Works :</em>
                        </strong>
                      </span>{" "} <br />
                      **Phillis Wheatley**: An enslaved African American poet who wrote poems advocating for freedom and equality, such as {`"`}To His Excellency General Washington.{`"`} <br />
                      **Francis Hopkinson**: A signer of the Declaration of Independence who wrote patriotic poems and songs, including {`"`}The Battle of the Kegs.{`"`}
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Harlem Renaissance :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underline">
                        <strong>
                          <em>- Context :</em>
                        </strong>
                      </span> <br />
                      **Time Period**: The Harlem Renaissance flourished during the 1920s and 1930s, primarily in the Harlem neighborhood of New York City. <br />
                      **Cultural Context**: This literary and cultural movement emerged as a response to the Great Migration, where African Americans moved from the rural South to urban centers in the North, seeking economic opportunities and fleeing racial discrimination.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Themes and Concerns :</em>
                        </strong>
                      </span>{" "} <br />
                      **Identity and Racial Pride**: Harlem Renaissance poetry explored themes of African American identity, heritage, and pride, celebrating Black culture and history. <br />
                      **Social Justice and Civil Rights**: Poets of this era addressed racial inequality, discrimination, and social injustice, advocating for civil rights and equality. <br />
                      **Artistic Expression and Creativity**: The Harlem Renaissance celebrated artistic expression and creativity, embracing diverse forms of literature, music, and visual arts.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Key Figures and Works :</em>
                        </strong>
                      </span>{" "} <br />
                      **Langston Hughes**: A central figure of the Harlem Renaissance known for his powerful poems celebrating Black identity and culture, such as {`"`}The Negro Speaks of Rivers{`"`} and {`"`}Harlem (Dream Deferred).{`"`} <br />
                      **Claude McKay**: A Jamaican American poet who wrote about racial injustice and the experiences of Black migrants in poems like {`"`}If We Must Die{`"`} and {`"`}Harlem Shadows.{`"`}
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Differences :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underline">
                        <strong>
                          <em>- Historical Context :</em>
                        </strong>
                      </span>{" "}
                      American Revolutionary poetry emerged during the struggle for independence from British rule, while the Harlem Renaissance occurred during the early 20th century, amid the Great Migration and heightened racial tensions.<br />
                      <span className="underline">
                        <strong>
                          <em>- Themes and Concerns :</em>
                        </strong>
                      </span>{" "}
                      While both movements addressed issues of identity and freedom, American Revolutionary poetry focused on political independence and national identity, while the Harlem Renaissance centered on racial identity, cultural pride, and social justice.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Similarities :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underline">
                        <strong>
                          <em>- Expression of Identity :</em>
                        </strong>
                      </span>{" "}
                      Both movements explored themes of identity, whether national or racial, celebrating the unique heritage and experiences of their respective communities.<br />
                      <span className="underline">
                        <strong>
                          <em>- Literary Innovation :</em>
                        </strong>
                      </span>{" "}
                      Both American Revolutionary poetry and Harlem Renaissance literature contributed to literary innovation and cultural expression, showcasing the diversity and creativity of American literature.
                    </p>

                    <p>
                    In summary, American Revolutionary poetry and the Harlem Renaissance represent distinct yet significant moments in American literary history, each reflecting the social, cultural, and political contexts of their time while contributing to the rich tapestry of American literature and culture.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Show how the Berlin conference is central to the colonial administration of Africa ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 The Berlin Conference of 1884–1885 was a significant event in the colonial administration of Africa. Here{"'"}s how it played a central role :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Formalization of the Scramble for Africa :</em>
                        </strong>
                      </span>{" "}
                      The conference formalized the Scramble for Africa that was already in full swing. It regulated European colonization and trade in Africa during the New Imperialism period.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Principle of Effective Occupation :</em>
                        </strong>
                      </span>{" "}
                      The conference established clear rules for the annexation and administration of African territories through the Principle of Effective Occupation.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Division of Africa :</em>
                        </strong>
                      </span>{" "} The conference led to the division of Africa into arbitrary borders, drawn without consideration for ethnic or cultural boundaries. This division led to numerous conflicts and tensions that continue to this day.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Colonial Expansion :</em>
                        </strong>
                      </span>{" "} 
                      The conference contributed to ushering in a period of heightened colonial activity by European powers.
                    </p>

                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="doc-header">
                🏅🖌🌿 Click on either <span className="underline"><em>{`"`}Open{`"`}</em></span> or <span className="underline"><em>{`"`}Download{`"`}</em></span> to get a well-explained document that will help you understand all the topics related to Semester 4 courses.
                </h5>
                <div className="spacers">---------------</div>

                {
                  isMember ? (
                    showInCacheBtn.sem4 ? (
                      <div className="Detailled-docs">
                <a onClick={() => openCachedPDF("/Docs/Semester_4/Semester_4_Detailled_document.pdf")} data-doc-name="Semester 4 Detailled document" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                </div>
                    ) : (
                      <div className="Detailled-docs">
                <a onClick={openDocInNewTab} href="https://drive.google.com/file/d/1befkXVQib9vH4FKvqnB_hF5t1zWIqV5U/view?usp=drive_link" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                <a onClick={getExplainedDoc} href="/Docs/Semester_4/Semester_4_Detailled_document.pdf" data-doc-name="Semester 4 Detailled document" rel="noopener noreferrer"> <img height={22} src={download} alt="doc" /> {downloadTxt}</a>
                </div>
                    )
                  ) : (
                    <div className="Detailled-docs">
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={open} alt="doc" /> Open</a>
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={download} alt="doc" /> Download</a>
                </div>
                  )
                }

              </div>
            </div>

          </div>
        )}

        {checked_sem_6 && (
          <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-1 g-4">
            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss Socialism in <em>Things Fall Apart</em> by Tchinua achebe.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                  <p>
                    <span className="underline"><em>Things Fall Apart </em></span> by Chinua Achebe is a powerful novel that explores the impact of colonialism on Igbo society in Nigeria. While the book primarily focuses on the cultural clash between traditional Igbo values and the forces of European colonization, elements of socialism can be observed throughout the narrative.
                    </p>
                    <p>
                    In <span className="underline"><em>Things Fall Apart </em></span>, socialism is intricately woven into the fabric of Igbo society. The communal living, shared values, and collective decision-making processes within the Igbo community reflect socialist ideals of cooperation, mutual support, and a sense of common ownership. The emphasis on communal well-being over individual success is a key aspect of socialism that is portrayed in the novel. <br />
                    Furthermore, the Igbo system of governance, which includes village councils and democratic decision-making processes, can be seen as a form of grassroots socialism where power is distributed among the community members rather than concentrated in the hands of a few. The egalitarian nature of Igbo society, where social status is earned through hard work and merit rather than inherited wealth or privilege, aligns with socialist principles of equality and social justice. <br />
                    However, the intrusion of British colonialism disrupts the socialist structures within Igbo society. The imposition of Western economic systems, legal frameworks, and religious beliefs leads to the erosion of traditional socialistic values and practices. The introduction of a capitalist economy based on monetary wealth, individual land ownership, and hierarchical power structures undermines the communal way of life that existed in pre-colonial Igbo society.
                    </p>
                    <p>
                    In conclusion, <span className="underline"><em>Things Fall Apart </em></span> by Chinua Achebe offers a poignant exploration of socialism within the context of traditional Igbo society and its encounter with European colonialism. The novel highlights the strengths and vulnerabilities of socialist ideals in the face of external influences, shedding light on the complexities of social, cultural, and political dynamics in a rapidly changing world.
                    </p>
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : How  <em>Things Fall Apart</em> can be shown as a corner stone novel which inspired other themes on Africa ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    
                    <p className="mt-2">
                    Chinua Achebe{"'"}s novel <span className="underline"><em>Things Fall Apart</em></span> is considered a cornerstone of African literature that inspired many other works exploring themes related to Africa. Here are a few key ways the novel has been influential :
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Portrayal of African culture :</em>
                        </strong>
                      </span>{" "}
                      <span className="underline"><em>Things Fall Apart</em></span>
                      provided one of the first realistic depictions of Igbo culture and society in literature. It challenged Western stereotypes and misconceptions about Africa by showcasing the complexity and richness of traditional African life. This paved the way for other African writers to confidently portray their own cultures.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Clash of cultures :</em>
                        </strong>
                      </span>{" "}
                      The novel{"'"}s central theme of the clash between traditional African culture and European colonialism resonated widely and inspired many other works exploring this conflict. The novel showed how colonization disrupted and undermined indigenous societies. This theme has been taken up by numerous other African writers.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Narrative style :</em>
                        </strong>
                      </span>{" "}
                      Achebe{"'"}s use of proverbs, folktales, and the Igbo language in the novel was groundbreaking and influenced the narrative styles of many later African writers. His blending of English with African storytelling techniques demonstrated the viability of African languages and oral traditions in literature.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Postcolonial perspective :</em>
                        </strong>
                      </span>{" "} 
                      <span className="underline"><em>Things Fall Apart</em></span> is considered an early example of postcolonial literature, written from the perspective of the colonized rather than the colonizer. This approach inspired other African writers to assert their own cultural identities and challenge colonial narratives.
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Tragic hero :</em>
                        </strong>
                      </span>{" "} 
                      Okonkwo, the protagonist of <span className="underline"><em>Things Fall Apart</em></span>, is a tragic hero whose downfall is brought about by both his own flaws and the changing times. This archetype has been emulated by many other African writers in their own works.
                    </p>

                    <p>
                    <strong><em>In summary</em></strong>, <span className="underline"><em>Things Fall Apart</em></span> was a pioneering novel that opened up new possibilities for African literature. Its portrayal of African culture, its exploration of the colonial experience, and its innovative narrative style have all been hugely influential on subsequent generations of African writers.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Show how Achebe{"'"}s novel style inspired writers on clash culture ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Chinua Achebe, a renowned Nigerian writer, has had a profound influence on writers, particularly in the context of cultural clashes. His novel style and storytelling approach have inspired many writers to explore similar themes. Here{"'"}s how :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- New Style of African Storytelling :</em>
                        </strong>
                      </span>{" "}
                      Achebe pioneered a new style of African storytelling, particularly evident in his novel <span className="underline"><em>Things Fall Apart</em></span>. His fresh literary voice shattered old myths about Africa, giving African people dignity and humanity on the printed page. This revolutionized how African life and culture could be portrayed through fiction writing.

                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Rich Cultural Context :</em>
                        </strong>
                      </span>{" "}
                      Achebe{"'"}s writing style was characterized by its rich cultural context. He incorporated elements from the Igbo society in his writings, enabling his audiences to escape the subject matter. This approach allowed him to present a more accurate portrayal of African society, inspiring writers to do the same.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Challenging Stereotypes :</em>
                        </strong>
                      </span>{" "}
                      Achebe sought to challenge stereotypes and present a more accurate portrayal of African society. His works revolve around issues touching directly or indirectly on social traditions, influences of colonization, and internal conflicts existing among contemporary Africans. This has inspired writers to tackle similar themes and challenge stereotypes in their works.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Influence on African Literature :</em>
                        </strong>
                      </span>{" "}
                      Achebe{"'"}s impact on African literature is immeasurable. He opened the door for generations of African writers to tell their own stories and challenge stereotypes. His work inspired a literary movement known as African literature in English, and he mentored many aspiring writers.
                    </p>

                    <p>
                    <strong>In summary</strong>, Achebe{"'"}s novel style and approach to storytelling have inspired many writers to explore themes of cultural clash, challenge stereotypes, and portray a more accurate and humanizing depiction of African societies. His influence continues to shape the landscape of literature, particularly in the context of postcolonial narratives.
                    </p>

                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : How is Chinua Achebe{"'"}s <em>Things Fall Apart</em> relevant to the African literature of protest ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Chinua Achebe{"'"}s <span className="underlin"><em>Things Fall Apart</em></span> is widely regarded as a seminal work in African literature, not only for its artistic merit but also for its profound impact in challenging colonial narratives and promoting a decolonial consciousness within African literature of protest. The novel{"'"}s relevance to African literature of protest can be seen through various key aspects :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Subversion of Colonial Narrative :</em>
                        </strong>
                      </span>{" "}
                      <span className="underlin"><em>Things Fall Apart</em></span> subverts the dominant colonial narrative by presenting a nuanced portrayal of pre colonial African society, highlighting its rich cultural traditions, complex social structures, and philosophical depth. Achebe{"'"}s narrative serves as a powerful critique of the dehumanizing effects of colonialism and the erasure of indigenous cultures, challenging the portrayal of African societies as primitive and uncivilized.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Reclamation of African Identity :</em>
                        </strong>
                      </span>{" "}
                      The novel emphasizes the importance of reclaiming and celebrating African cultural identities and traditions, showcasing the resilience and dignity of African communities in the face of colonial intrusion and cultural imperialism. Achebe{"'"}s portrayal of Igbo society serves as a poignant reflection on the enduring legacies of African civilizations, fostering a sense of cultural pride and empowerment within the broader discourse of African literature of protest.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Critique of Imperialism and Cultural Hegemony :</em>
                        </strong>
                      </span>{" "}
                      <span className="underlin"><em>Things Fall Apart</em></span> critiques the exploitative and oppressive nature of colonialism, highlighting its detrimental impacts on indigenous communities, social structures, and cultural practices. Achebe{"'"}s narrative sheds light on the complexities of power dynamics, cultural hybridity, and the erosion of indigenous knowledge systems, emphasizing the need to challenge the hegemony of Western cultural values and to assert the agency and autonomy of African communities.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Empowerment of Marginalized Voices :</em>
                        </strong>
                      </span>{" "}
                      The novel empowers marginalized voices within African societies, providing a platform for the representation and exploration of diverse cultural perspectives and experiences. Achebe{"'"}s narrative foregrounds the voices of indigenous characters, showcasing their agency, resilience, and cultural legacies, thereby challenging the marginalization and erasure of African narratives within the broader global literary canon.
                    </p>

                    <p>
                    Through its powerful critique of colonialism, its celebration of African cultural identities, and its empowerment of marginalized voices, <span className="underlin"><em>Things Fall Apart</em></span> embodies the spirit of resistance and resilience within African literature of protest, contributing to a broader decolonial discourse that seeks to challenge hegemonic narratives and promote cultural sovereignty within the African literary landscape.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss and show how <em>Things Fall Apart</em> has fund a new era in African literature and how it has become an early landmark and how it is a worthy archetype ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 <span className="underlin"><em>Things Fall Apart</em></span> by Chinua Achebe has indeed marked a significant milestone in African literature, ushering in a new era and establishing itself as an early landmark in the literary landscape. Here{"'"}s how the novel has fundamentally influenced African literature and why it is considered a worthy archetype :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Pioneering African Perspective :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underlin"><em>Things Fall Apart</em></span> is celebrated for offering a unique African perspective, challenging colonial narratives, and presenting the complexities of African societies authentically. By portraying the impact of colonialism on traditional African cultures, Achebe{"'"}s work set a precedent for African writers to reclaim their narratives and challenge Western representations of Africa.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Cultural Representation :</em>
                        </strong>
                      </span>{" "} <br />
                      The novel delves into the intricacies of Igbo culture, traditions, and societal norms, providing a rich and nuanced portrayal of pre-colonial African life. This focus on cultural authenticity and the exploration of indigenous belief systems became a hallmark of African literature inspired by Achebe{"'"}s work.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Exploration of Themes :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underlin"><em>Things Fall Apart</em></span> explores themes such as colonialism, religion, language, justice, and change within the context of African society. These themes have resonated with readers globally and have been further developed and expanded upon by subsequent African writers, making the novel a foundational text for exploring these critical issues.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Character Development :</em>
                        </strong>
                      </span>{" "} <br />
                      The character of Okonkwo, a tragic hero grappling with the clash of cultures and the disintegration of his community, has become emblematic of the struggles faced by many African societies during the colonial period. Okonkwo{"'"}s story has served as a template for exploring the complexities of identity, tradition, and modernity in African literature.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Global Impact :</em>
                        </strong>
                      </span>{" "} <br />
                      <span className="underlin"><em>Things Fall Apart</em></span> has achieved widespread acclaim, with translations into over 50 languages and a global readership exceeding 10 million copies. Its success has not only elevated African literature onto the world stage but has also inspired a generation of African writers to tell their stories in their own voices, contributing to a diverse and vibrant literary landscape.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Authenticity and Cultural Representation :</em>
                        </strong>
                      </span>{" "} <br />
                      Achebe{"'"}s skillful storytelling, evocative language, and memorable characters have captivated readers worldwide, making his tales relatable and his legacy enduring. The novel provides a rich and complex portrayal of Igbo culture, highlighting its strengths and weaknesses while dispelling stereotypes about African cultures.
                    </p>
                    
                    <p>
                    In conclusion, <span className="underlin"><em>Things Fall Apart</em></span> stands as a seminal work that has shaped the trajectory of African literature, setting a high standard for authenticity, cultural representation, and thematic depth. Its enduring legacy as a pioneering text in African literature underscores its significance as a worthy archetype that continues to inspire and influence generations of writers across the African continent and beyond.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : How does Chinua Achebe coexist Orature and Written Literature in <em>Things Fall Apart</em> ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Chinua Achebe masterfully intertwines oral tradition (orature) with written literature in his novel <span className="underlin"><em>Things Fall Apart</em></span> through various techniques that bridge the gap between the two forms of storytelling :
                    </p>
                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Incorporation of Proverbs and Folktales :</em>
                        </strong>
                      </span>{" "} Achebe seamlessly weaves Igbo proverbs and folktales into the narrative, enriching the text with the oral tradition of the Igbo people. These proverbs and tales serve multiple purposes, from conveying moral lessons to providing cultural context, mirroring the oral storytelling practices prevalent in African societies.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Language as a Cultural Bridge :</em>
                        </strong>
                      </span>{" "} Achebe uses language as a tool to combat negative stereotypes about African languages and to highlight the complexity and richness of the Igbo language. By showcasing the diversity of languages in Africa and emphasizing the challenges of translation, Achebe underscores the importance of preserving oral traditions within a written text.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Character Dialogue and Speech Patterns :</em>
                        </strong>
                      </span>{" "} The dialogue in <span className="underlin"><em>Things Fall Apart</em></span> reflects the speech patterns and idioms of the Igbo people, capturing the authenticity of oral communication within the written form. Through the characters{"'"} conversations, Achebe brings to life the oral traditions of storytelling, communal wisdom sharing, and interpersonal communication.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Cultural Context and Rituals :</em>
                        </strong>
                      </span>{" "} Achebe integrates cultural rituals, ceremonies, and practices into the narrative, grounding the story in the oral traditions and customs of the Igbo society. These elements serve as a bridge between orature and written literature, showcasing the importance of storytelling, music, dance, and communal gatherings in African cultures.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Narrative Structure and Storytelling Techniques :</em>
                        </strong>
                      </span>{" "} Achebe{"'"}s narrative structure mirrors the oral storytelling tradition by incorporating multiple perspectives, non-linear storytelling, and communal memory within the text. This approach blurs the distinction between oral and written forms of storytelling, creating a dynamic and immersive reading experience.
                    </p>

                    <p>
                    In essence, Chinua Achebe skillfully merges orature and written literature in <span className="underlin"><em>Things Fall Apart</em></span> by infusing the text with oral elements such as proverbs, folktales, language nuances, cultural rituals, and storytelling techniques. This fusion not only preserves the authenticity of African oral traditions but also elevates the novel to a work that transcends traditional literary boundaries, making it a powerful example of how orature can coexist harmoniously with written literature.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Discuss Janie in <em>Their Eyes Were Watching God</em> by Zora Neale Hurston.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Janie Crawford, the protagonist of Zora Neale Hurston{"'"}s novel <span className="underline"><em>Their Eyes Were Watching God</em></span> undergoes a transformative journey of self-discovery and empowerment. Throughout the narrative, Janie{"'"}s character evolves from a naive and voiceless girl into a strong, independent woman who finds her own voice and agency.
                    </p>

                    <p>
                    Janie{"'"}s first two marriages to Logan Killicks and Jody Starks are marked by oppression and the suppression of her voice. Logan treats her as a possession, while Jody seeks to control and mold her into a trophy wife. However, Janie{"'"}s third marriage to Tea Cake represents a turning point in her life. Tea Cake encourages Janie to embrace her true self and find her own voice. This relationship allows Janie to experience true love and independence. <br />
                    The novel explores Janie{"'"}s ripening from a vibrant but voiceless teenage girl into a woman with her finger on the trigger of her own destiny. Her journey is one of self-discovery, as she navigates the complexities of love, gender norms, and societal expectations. Janie{"'"}s experiences with her three husbands shape her understanding of herself and the world around her.
                    </p>

                    <p>
                    By the end of the novel, Janie returns to Eatonville a strong and proud woman, having found her voice and independence. Her story serves as a testament to the power of self-discovery and the importance of finding one{"'"}s own path in life, regardless of societal pressures and expectations.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : What role do you think Sofia plays in the Alice Walker{"'"}s novel <em>The Color Purple</em> ? Describe her character and how she contributes to the themes in the book.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Sofia plays a pivotal role in <span className="underline"><em>The Color Purple</em></span> as a strong, assertive woman who refuses to be oppressed by men or society. Her character directly challenges the traditional gender roles and expectations placed on black women in 1930s America.
                    </p>

                    <p>
                    Sofia is described as physically strong, with {`"`}muscle{`"`} in her {`"`}arms{`"`} and {`"`}legs{`"`}. She is unafraid to stand up to her husband Harpo when he tries to beat her into submission, even throwing him against a stove. Her indomitable spirit and unwillingness to be controlled by anyone, including white people, is central to her characterization. <br />
                    However, Sofia{"'"}s strength and independence ultimately lead to her downfall. When she refuses to be a maid for the mayor{"'"}s wife, she is beaten by the police and sentenced to 12 years in prison. This shows how black women who dared to assert their rights faced severe consequences from a racist and sexist society. <br />
                    Through Sofia, the novel exposes the oppression and violence faced by black women who tried to break free from the confines of their expected roles. Her character serves as a foil to the more passive Celie, who learns from Sofia{"'"}s example to stand up for herself against Mr. ____.
                    </p>

                    <p>
                    While Sofia{"'"}s story ends tragically, with her spirit broken by her imprisonment, she remains an inspirational figure in the novel. Her strength and refusal to be subservient, even in the face of overwhelming odds, makes her an important symbol of resistance against the intersecting oppressions of racism and sexism.
                    </p>
            
                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : What does Expressive Realism mean in critical theory ? and What connection does it have with Common Sense theory ?
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 Expressive realism, in critical theory, is the idea that cultural texts (like literature and art) realistically depict the world while also expressing individual and collective experiences and emotions. It highlights how these texts reflect and shape social realities, influenced by and influencing the socio-political context. Associated with Raymond Williams, expressive realism emphasizes the interconnectedness of personal expression and social conditions, offering a nuanced view of how culture both represents and constructs reality.
                    </p>
                    <p>
                    Expressive realism is connected to common sense theory through its exploration of how cultural texts reflect and shape everyday beliefs and experiences. Here’s how they relate :
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Reflection of Common Sense :</em>
                        </strong>
                      </span>{" "}
                      Expressive realism suggests that cultural texts depict the world in ways that align with the common sense of their time. These texts draw on widely held beliefs and perceptions, making them resonate with their audience’s everyday experiences and understanding of reality.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Shaping Common Sense :</em>
                        </strong>
                      </span>{" "} Cultural texts not only reflect but also influence common sense. By presenting certain views of reality and human experience, they contribute to shaping the shared beliefs and norms of society. In this way, expressive realism intersects with common sense theory by illustrating how literature and art help form and transform what people take for granted as “common sense.”
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Ideological Function :</em>
                        </strong>
                      </span>{" "} 
                      Both expressive realism and common sense theory address the ideological functions of cultural texts. They show how texts can reinforce or challenge dominant ideologies by either perpetuating the status quo or offering new ways of seeing the world. This ideological aspect ties into the notion of common sense as an arena where power and resistance play out in everyday life.
                    </p>
                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Raymond Williams{"'"} Influence :</em>
                        </strong>
                      </span>{" "} 
                      Raymond Williams, who developed the concept of expressive realism, also explored how culture and common sense are intertwined. He argued that what is considered “common sense” is often the result of cultural hegemony, where dominant groups impose their worldview as natural and unquestionable. Expressive realism, therefore, helps to analyze how cultural texts participate in this process.
                    </p>

                    <p>
                    In summary, expressive realism and common sense theory are connected through their focus on how cultural texts reflect, shape, and influence everyday beliefs and social norms. Both examine the interplay between individual experiences and broader societal forces, highlighting the role of culture in constructing and challenging common sense.
                    </p>

                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Write the characterization of the protagonist of <em>Their Eyes Were Watching God</em> , written by Zora Neale Hurston.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 The protagonist of Zora Neale Hurston{"'"}s novel <span className="underline"><em>Their Eyes Were Watching God</em></span> is Janie Crawford. Janie is a vibrant, resilient African American woman who embarks on a journey of self-discovery and empowerment over the course of the novel. Her characterization can be understood through several key aspects :
                    </p>
      
                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Appearance and Early Life :</em>
                        </strong>
                      </span>{" "}
                      Janie is described as a beautiful woman with long, flowing hair that symbolizes her independence and strength. Raised by her grandmother, Nanny, after her mother{"'"}s abandonment, Janie{"'"}s early life is marked by Nanny{"'"}s protective and somewhat restrictive guidance, aiming to secure Janie a stable future.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Personal Growth and Independence :</em>
                        </strong>
                      </span>{" "} Throughout the novel, Janie{"'"}s journey is defined by her quest for true love and self-fulfillment. She marries three times, each marriage shaping her understanding of herself and her desires. Her first marriage to Logan Killicks is arranged by Nanny and lacks love and respect. Her second marriage to Joe “Jody” Starks offers material wealth and social status but stifles her independence and voice. Finally, her third marriage to Vergible “Tea Cake” Woods, though fraught with challenges, brings her the love and companionship she seeks.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Voice and Identity :</em>
                        </strong>
                      </span>{" "} 
                      A crucial aspect of Janie{"'"}s character is her evolving voice and identity. Initially, she is passive and subdued, adhering to the expectations imposed on her by Nanny and her husbands. Over time, Janie finds her voice, particularly after Jody{"'"}s death, and begins to assert her own needs and desires. Her relationship with Tea Cake allows her to express herself more freely and explore her own identity.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Resilience and Inner Strength :</em>
                        </strong>
                      </span>{" "} 
                      Janie{"'"}s resilience is a central theme in the novel. She endures significant hardships, including domestic abuse, social scorn, and personal loss. Despite these challenges, she remains determined to live life on her own terms. Her resilience is particularly evident in her ability to start anew after each setback and her unwavering belief in the possibility of happiness and fulfillment.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Symbolism and Connection to Nature :</em>
                        </strong>
                      </span>{" "} 
                      Janie has a profound connection to nature, which symbolizes her inner life and growth. The pear tree under which she experiences an awakening of her desires in her youth represents her ideal vision of love and harmony. Throughout the novel, Janie’s connection to the natural world reflects her emotional and spiritual journey.
                    </p>

                    <p>
                    <strong><em>In summary</em></strong>, Janie Crawford is a complex and dynamic character whose journey towards self-realization and empowerment is at the heart of <span className="underline"><em>Their Eyes Were Watching God</em></span>. Her development from a voiceless young girl to a self-assured woman who embraces her own identity and desires is a testament to her strength and resilience.
                    </p>

                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
              <div className="faq-holder">
                <h5 className="faq-title">
                  🏅🖌🌿 : Many critics agree that <em>Things Fall Apart</em> by Chinua Achebe marks the beginning of modern African novel. With evidences from Things Fall Apart as compared or contrast with some other African novels in English, show how the first novel by Achebe has become an early landmark guiding present and future African writers.
                </h5>
                {
                  isMember ? (
                <details>
                  <summary className="reveal-answer mt-3">
                    Click to see the answer
                  </summary>
                  <div className="mt-4 answer-content">
                    <p>
                    🌿 <span className="underline"><em>Things Fall Apart</em></span> by Chinua Achebe is widely regarded as a foundational work in African literature, and its impact on subsequent African novels is profound. Achebe{"'"}s portrayal of Igbo society, colonialism, and the clash of cultures has set a benchmark for storytelling that combines cultural authenticity with critical perspectives on colonialism. To understand how {`"`}Things Fall Apart{`"`} serves as an early landmark for modern African literature, we can compare and contrast it with other notable African novels in English, such as {`"`}A Grain of Wheat{`"`} by Ngũgĩ wa Thiong{"'"}o, {`"`}Half of a Yellow Sun{`"`} by Chimamanda Ngozi Adichie, and {`"`}The Beautyful Ones Are Not Yet Born{`"`} by Ayi Kwei Armah.
                    </p>
      
                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Cultural Authenticity and Representation :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong><em>{`"`}Things Fall Apart{`"`}</em> by Chinua Achebe:</strong> <br />
<strong>- Evidence :</strong> Achebe presents a detailed and nuanced depiction of pre-colonial Igbo society, its customs, and beliefs. The use of proverbs, folktales, and native language terms enriches the narrative, providing an insider{`'`}s perspective on Igbo life. <br />
<strong>- Impact :</strong> This approach has inspired other African writers to delve deeply into their own cultures and present them authentically. Achebe{`'`}s work encourages a reclamation of African narratives from a Western-dominated literary tradition. <br />

<strong><em>{`"`}A Grain of Wheat{`"`}</em> by Ngũgĩ wa Thiong{`'`}o:</strong> <br />
<strong>- Comparison :</strong> Ngũgĩ similarly focuses on Kenyan culture and the impact of colonialism. He integrates Gikuyu oral traditions and idioms into the text, reflecting a commitment to cultural authenticity. <br />
<strong>- Contrast :</strong> While Achebe sets his story in the pre-colonial and early colonial period, Ngũgĩ{`'`}s novel deals with the Mau Mau uprising and the struggle for independence, highlighting a different phase of colonial impact and resistance.
                    </p>

                    <p>
                      <span className="underline">
                        <strong>
                          <em>- Colonialism and Its Effects :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong><em>{`"`}Things Fall Apart{`"`}:</em></strong><br />
<strong>- Evidence :</strong> The novel examines the disruption of Igbo society by British colonial forces and Christian missionaries, focusing on the personal and societal consequences of this encounter. <br />
<strong>- Impact :</strong> Achebe{`'`}s critical portrayal of colonialism has set a precedent for African writers to explore and critique the colonial experience and its aftermath in their works.

<strong><em>{`"`}Half of a Yellow Sun{`"`}</em> by Chimamanda Ngozi Adichie:</strong> <br />
<strong>- Comparison :</strong> Adichie{`'`}s novel addresses the Nigerian Civil War (Biafran War) and its effects on Nigerian society. Like Achebe, she explores themes of cultural identity, conflict, and the lasting impact of colonial rule. <br />
<strong>- Contrast :</strong> Adichie{`'`}s focus on a post-independence conflict shows the ongoing struggles and complexities in post-colonial African nations, expanding the scope of Achebe{`'`}s initial critique of colonialism.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Character Complexity and Humanization :</em>
                        </strong>
                      </span>{" "} <br />
                      <strong><em>{`"`}Things Fall Apart{`"`}:</em></strong> <br />
<strong>- Evidence :</strong> Achebe{`'`}s protagonist, Okonkwo, is a complex character whose personal flaws and tragic fate are deeply intertwined with the larger societal changes brought by colonialism. <br />
<strong>- Impact :</strong> This depth of character has encouraged African writers to create multifaceted, relatable characters, moving beyond stereotypical portrayals often found in earlier Western literature about Africa.
<br />
<strong><em>{`"`}The Beautyful Ones Are Not Yet Born{`"`}</em> by Ayi Kwei Armah:</strong> <br />
<strong>- Comparison :</strong> Armah{`'`}s novel features similarly complex characters struggling with post-independence disillusionment and corruption in Ghana. The protagonist, {`"`}The Man,{`"`} embodies the moral and existential crises facing many Africans in the wake of failed political promises. <br />
<strong>- Contrast :</strong> While Achebe{`'`}s characters grapple with the initial impact of colonialism, Armah{`'`}s characters deal with the internal failures of newly independent states, reflecting different stages of African post-colonial experience.
                    </p>

                    <p>
                      {" "}
                      <span className="underline">
                        <strong>
                          <em>- Language and Style :</em>
                        </strong>
                      </span>{" "} 
                      <strong><em>{`"`}Things Fall Apart{`"`}:</em></strong> <br />
<strong>- Evidence :</strong> Achebe{`'`}s use of English infused with Igbo idioms and proverbs creates a unique narrative voice that captures the rhythms and sensibilities of African oral traditions. <br />
<strong>- Impact :</strong> This stylistic choice has influenced other African writers to experiment with language, blending local dialects and English to convey their cultural context authentically. <br />

<strong><em>{`"`}Season of Migration to the North{`"`}</em> by Tayeb Salih:</strong>
 <strong>- Comparison :</strong> Salih{`'`}s novel, while set in Sudan and dealing with the effects of colonialism and post-colonial identity, also uses a hybrid narrative style. The protagonist{`'`}s story is interwoven with Arabic cultural references and a critique of colonial influence. <br />
 <strong>- Contrast :</strong> Salih{`'`}s narrative also deals with the complexities of cross-cultural interactions and the psychological impact of colonialism, but his style is more fragmented and introspective compared to Achebe{`'`}s straightforward storytelling.
                    </p>

                    <p>
                    <strong><em>In Conclusion</em></strong>, <span className="underline"><em>Things Fall Apart</em></span> by Chinua Achebe has become an early landmark in modern African literature by setting high standards for cultural authenticity, critical engagement with colonialism, character complexity, and innovative use of language. Its influence can be seen in the works of many subsequent African writers who have built upon Achebe{`'`}s legacy to explore their own cultural narratives, critique post-colonial realities, and develop rich, multi-dimensional characters. Achebe{`'`}s pioneering efforts have paved the way for a diverse and dynamic body of African literature that continues to evolve and resonate globally.
                    </p>

                    <p>
                      <strong>
                        <em>🏅🌿 By UK-Elearn 🥇</em>
                      </strong>
                    </p>
                  </div>
                </details>
                    
                  ) : (
                    <p data-bs-toggle="modal" data-bs-target="#logInMember" className="no-reveal-answer">▸ Click to see the answer</p>
                  )
                }
              </div>
            </div>

            <div className="col">
            <div className="faq-holder">
                <h5 className="doc-header">
                🏅🖌🌿 Click on either <span className="underline"><em>{`"`}Open{`"`}</em></span> or <span className="underline"><em>{`"`}Download{`"`}</em></span> to get a well-explained document that will help you understand all the topics related to Semester 6 courses.
                </h5>
                <div className="spacers">---------------</div>

                {
                  isMember ? (
                    showInCacheBtn.sem6 ? (
                      <div className="Detailled-docs">
                <a onClick={() => openCachedPDF("/Docs/Semester_6/Semester_6_Detailled_document.pdf")} data-doc-name="Semester 6 Detailled document" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                </div>
                    ) : (
                      <div className="Detailled-docs">
                <a onClick={openDocInNewTab} href="https://drive.google.com/file/d/1QELAIL7EaDAUYqqdq4TBn0yxKRprfMnw/view?usp=drive_link" rel="noopener noreferrer"> <img height={22} src={open} alt="doc" /> Open</a>
                <a onClick={getExplainedDoc} href="/Docs/Semester_6/Semester_6_Detailled_document.pdf" data-doc-name="Semester 6 Detailled document" rel="noopener noreferrer"> <img height={22} src={download} alt="doc" /> {downloadTxt}</a>
                </div>
                    )
                  ) : (
                    <div className="Detailled-docs">
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={open} alt="doc" /> Open</a>
                <a data-bs-toggle="modal" data-bs-target="#logInMember"> <img height={22} src={download} alt="doc" /> Download</a>
                </div>
                  )
                }

              </div>
            </div>

          </div> 
        )}

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

    </>
  );
}
