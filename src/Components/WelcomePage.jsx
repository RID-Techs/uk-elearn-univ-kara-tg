import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
// Image logo, stars, star, username, password is from https://icons8.com/
import logo from "../assets/learns.png";
import students_crew from "../assets/students_crew.jpg";
import openLearning from "../assets/open_learning.png";
import stars from "../assets/stars.png";
import feedback from "../assets/feedback.png";
import reward from "../assets/reward.png";
import star from "../assets/stars_2.png";
// import E_crew from "/E_crew.png";
// import password from "/password.png";
import E_member from "../assets/E_picture.webp";
import { toast, Zoom } from "react-toastify";
import { Testimony } from "./Testimonies/Testimony";

export function Welcome_Page() {
  const navigate = useNavigate();
  const [showNote, setShowNote] = useState(null);
  const [hasReadNote, setHasReadNote] = useState(false);
  const [dateOfCreation, setDateOfCreation]  = useState("2024");

  const getMemberStatus = localStorage.getItem("isSignedIn");
  const isMember = getMemberStatus === "true";

  const Welcome = (message) => {
    toast.success(message, {
        theme: "light",
        position:"top-center",
        autoClose: 2000,
        transition: Zoom
    })
}

  useEffect(() => {
    const getNote = localStorage.getItem("Show Note");
    const HasReadNotes = localStorage.getItem("HasReadNote");

    if (getNote === "true") {
      setShowNote(false);
    } else {
      setShowNote(true);
      document.body.style.overflow = "hidden";
    }

    const timer = setTimeout(() => {
        const firstWelcomeMessage = document.querySelector("#first-welcome-message");
      const nextBtn = document.querySelector("#next-btn");
      const nextBtn_2 = document.querySelector("#next-btn-2");
      const prevBtn = document.querySelector("#prev-btn");
      const prevBtn_2 = document.querySelector("#prev-btn-2");
      const secondWelcomeMessage = document.querySelector("#second-welcome-message");
      const integrateWhatsapp = document.querySelector("#integrate-whatsapp");

      const PrevBtnFunc = () => {
        if(firstWelcomeMessage && secondWelcomeMessage) {
          secondWelcomeMessage.style.display = "none";
        firstWelcomeMessage.style.display = "block";
        }
      }

      const PrevBtnFunc_2 = () => {
        if(firstWelcomeMessage && integrateWhatsapp && secondWelcomeMessage) {
          firstWelcomeMessage.style.display = "none";
        integrateWhatsapp.style.display = "none";
        secondWelcomeMessage.style.display = "block";
        }
      }
      const PrevBtnFunc_3 = () => {
        if(firstWelcomeMessage && secondWelcomeMessage) {
          firstWelcomeMessage.style.display = "none";
        secondWelcomeMessage.style.display = "block";
        }
      }
      const PrevBtnFunc_4 = () => {
        if(secondWelcomeMessage && integrateWhatsapp) {
          secondWelcomeMessage.style.display = "none";
        integrateWhatsapp.style.display = "block";
        }
      }

      if(prevBtn) prevBtn.addEventListener("click", PrevBtnFunc);
        
      if(prevBtn_2) prevBtn_2.addEventListener("click", PrevBtnFunc_2);
      if(nextBtn) nextBtn.addEventListener("click", PrevBtnFunc_3);
      if(nextBtn_2) nextBtn_2.addEventListener("click", PrevBtnFunc_4);

      return () => {
        if(prevBtn) prevBtn.removeEventListener("click", PrevBtnFunc);
        if(prevBtn_2) prevBtn_2.removeEventListener("click", PrevBtnFunc_2);
        if(nextBtn) nextBtn.removeEventListener("click", PrevBtnFunc_3);
        if(nextBtn_2) nextBtn_2.removeEventListener("click", PrevBtnFunc_4);
      }

    }, 1000)

    if(HasReadNotes === "true") {
      setHasReadNote(true)
    } else {
      setHasReadNote(false)
    }
    
    return () => clearTimeout(timer);
  }, []);


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

  const CloseNoteButton = () => {
    setShowNote(false);
    document.body.style.overflow = "auto";
    localStorage.setItem("Show Note", "true");
    setHasReadNote(true);
    localStorage.setItem("HasReadNote", "true");
  };
const userFirstname = localStorage.getItem('userFirstname') || "Guest Learner";
  const EnterMySession = () => { 
      Welcome(`Hi! ${userFirstname}`)
      navigate("/Home")
}
const [eco, setEco] = useState(() => {
  const ecoValue = localStorage.getItem("eco");
  return ecoValue === "true";
});

const ClosingEcoBanner = () => {
  localStorage.setItem("eco", "true");
  setEco(true);
}

  // 1. Track if the browser is actually ready to install
  const [isInstallable, setIsInstallable] = useState(false);
  
  // 2. Track if the user has previously closed/installed (Preference)
  const [userDismissed, setUserDismissed] = useState(() => {
    // Lazy initialization: check localStorage only once on mount
    return localStorage.getItem("pwaInstalledOrDismissed") === "true";
  });

  // 3. Store the event itself (we don't need this in state, just the ref)
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const handler = (event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      
      // Stash the event so we can trigger it later
      deferredPrompt.current = event;
      
      // ERROR FIX: Trigger a state change so React re-renders and shows the UI
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Cleanup
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleAppInstallPrompt = async () => {
    // Safety check
    if (!deferredPrompt.current) return;

    // Show the install prompt
    deferredPrompt.current.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.current.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      // Mark as installed so we don't show it again
      localStorage.setItem("pwaInstalledOrDismissed", "true");
      setUserDismissed(true);
    } else {
      console.log("User dismissed the install prompt");
      // Optional: Do you want to hide it if they say no? 
      // Usually yes, to not be annoying.
    }

    // We've used the prompt, it can't be used again
    deferredPrompt.current = null;
    setIsInstallable(false);
  };

  const closeBanner = () => {
    localStorage.setItem("pwaInstalledOrDismissed", "true");
    setUserDismissed(true);
  };

  // LOGIC: Show banner ONLY if:
  // 1. User is a member
  // 2. Browser says it's installable (isInstallable)
  // 3. User hasn't dismissed it yet (!userDismissed)
  const showBanner = isMember && isInstallable && !userDismissed;
  const imageSectionRef = useRef(null);
  const [showTestimonyPicture, setShowTestimonyPicture] = useState(false);
  const toggleTestimonyPicture = () => {
    setShowTestimonyPicture(!showTestimonyPicture);
  };

  useEffect(() => {
    if (showTestimonyPicture && imageSectionRef.current) {
      imageSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [showTestimonyPicture]);

  return (
    <>
        <div className="page-wrapper">
        {showNote && (
            <div className="conatiner-fluid Info-holder">
            <div className="container">
                <div className="Info-wrapper">
                <div className="ContentInfo">
                    <div className="info-title">
                    <h1>
                        <span className="note-key">
                          <svg fill="#105ee5" height={24} width={24} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="m1783.68 1468.235-315.445 315.445v-315.445h315.445Zm-541.327-338.823v112.94h-903.53v-112.94h903.53Zm338.936-338.824V903.53H338.824V790.59h1242.465ZM621.176 0c93.403 0 169.412 76.01 169.412 169.412 0 26.09-6.437 50.484-16.94 72.62L999.98 468.255l-79.962 79.962-226.221-226.334c-22.137 10.504-46.532 16.942-72.622 16.942-93.402 0-169.411-76.01-169.411-169.412C451.765 76.009 527.775 0 621.176 0Zm395.295 225.882v112.942h790.588v1016.47h-451.765v451.765H112.941V338.824h225.883V225.882H0V1920h1421.478c45.176 0 87.755-17.619 119.717-49.581l329.224-329.11c31.962-32.076 49.581-74.655 49.581-119.831V225.882h-903.53Z" fillRule="evenodd"></path> </g></svg>
                        </span> <span>KEY INSIGHT</span>
                    </h1>
                    </div>
                    <hr />
                    <div className="info-body">
                    <div id="first-welcome-message">
                        <p>
                        Welcome to the{" "}
                        <span id="site-name">
                            <strong>
                            <em>UK-Elearn website</em>
                            </strong>
                        </span>
                        . Our platform is a learning space for Anglophone Studies students, providing the resources needed to better understand lecturers’ courses, engage more actively in class, and effectively transmit the knowledge acquired.

                        </p>
                        <hr />
                        <div className="leave">
                        <button className="hi-btn" type="button">
                            Hi
                        </button>
                        <button id="next-btn" type="button">
                            Next
                        </button>
                        </div>
                    </div>

                    <div id="second-welcome-message">
                        <p>
                        By doing so, you will deepen your understanding of various areas within English Studies.{" "}
                        <span className="underline">
                            {" "}
                            <strong>
                            Please note that some resources may occasionally differ from current course content, as lecturers may revise or update their materials
                            </strong>{" "}
                        </span>.{" "}
                        Otherwise, you are ready to begin.
                        </p>

                        <hr />
                        <div className="leave">
                        <button id="prev-btn" type="button">
                            Previous
                        </button>
                        {/* <button id="next-btn-2" type="button">
                            Next
                        </button> */}
                        <button
                            id="close-btn"
                            onClick={CloseNoteButton}
                            type="button"
                        >
                            Close
                        </button>
                        </div>
                    </div>

                    {/* <div id="integrate-whatsapp">
                        <div className="whatsapp-content">
                        <p>
                            Join our special WhatsApp group,{" "}
                            <strong>
                            {"'"}UK-Elearn Crew,{"'"}
                            </strong>{" "}
                            for more tips on the English language and essential
                            resources to help you dive deeper into the world of
                            English like never before. If you are already in, just click <strong>Close.</strong> Otherwise, click the button below to join the crew, and then return here.
                        </p>
                        <img
                            id="e-crew-icon"
                            height={100}
                            src={E_crew}
                            alt="UK-Elearn Crew"
                        />
                        <a
                            href="https://chat.whatsapp.com/KEHsubuy8gKBogstCaBPzq"
                            target="_blank"
                            onClick={CloseNoteButton}
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
                        <p id="click-here">
                        {" "}
                        <span className="up-arrow">￪</span>{" "}
                        <span className="up-arrow">￪</span> Click here{" "}
                        <span className="up-arrow">￪</span>{" "}
                        <span className="up-arrow">￪</span>{" "}
                        </p>
                        <hr />
                        <div className="leave">
                        <button id="prev-btn-2" type="button">
                            Previous
                        </button>
                        <button
                            id="close-btn"
                            onClick={CloseNoteButton}
                            type="button"
                        >
                            Close
                        </button>
                        </div>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}

      <div className="container-fluid header-wraper-home">
        <div className="header-holder">
          <header>
            <img height={50} src={logo} alt="UK-Elearn" />
            <h1>UK-Elearn</h1>
          </header>
        </div>

        <div className="header-elements">
          <h3 id="member">
            Hi there! 👋 <img className="member-stars" height={42} src={stars} alt="stars" />{" "}
          </h3>

          {showBanner && (
  <div id="install-banner">
    <div className="banner-wrapper">
      <div className="banner-content">
        <div className="closing-banner"><button onClick={closeBanner} id="closing-banner">Close</button></div>
        <p id="banner-title">✧ New Update ✧</p>
        <p id="banner-divider">- · - - · - - · -</p>
        <p>
          Install the platform for quicker access from your phone, tablet, or desktop and enjoy a more seamless learning experience.
        </p>
        <button onClick={handleAppInstallPrompt} id="install-btn">Install ↯</button>
      </div>
    </div>
  </div>
)}

{!eco && (
   <div id="install-banner">
    <div className="banner-wrapper">
      <div className="banner-content">
        <div className="closing-banner"><button onClick={ClosingEcoBanner} id="closing-banner">Close</button></div>
        <p id="banner-title">✧ New Update ✧</p>
        <p id="banner-divider">- · - - · - - · -</p>
        <div>
          <p>
            Hey 😃, <span id="hey"><strong><em>E-Collection Of Papers</em></strong></span> is here !
          </p>
          <p>
            It is a collection of past exam papers that will help you prepare for your exams and improve your knowledge. You can contribute too 🤗.
          </p>
        </div>
        <button onClick={ClosingEcoBanner} id="install-btn">Got it <em>!</em></button>
      </div>
    </div>
  </div>
)}


        </div>
        <div className="elearning-member-wrapper">
          <div className="elearning-member">
        {isMember ? <button type="button">  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
</svg> Verified Member {isMember && <img height={32} src={reward} alt="reward" />} </button> : 

<button type="button" data-bs-toggle="modal" data-bs-target="#logInMember">  <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
</svg> Guest Learner</button>}
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

      <div className="guide-msg">
        <h3 id="guide-msg-h3" className="ms-4 me-4">
          {" "}
          Ensure your{" "}
          <span id="click-open-btn">
            {" "}
            <span id="open-btn"><em>university career</em></span>
          </span>{" "}
          with UK-Elearn{" "}
          <img height={32} src={star} alt="star" />{" "}
        </h3>
      </div>

      <section className="stretch-section-content">
        <div className="login-holder mt-4">

{hasReadNote && (<div className="welcome-button">
    <div className="welcome-actions">
            <button onClick={EnterMySession} id="login-button"> <img height={32} src={openLearning} alt="user" /> Open my Learning Space</button>
            {isMember && <Link id="web-tour" to={"/Websitetour"}>⋄⦂ Click me to make a nice tour of the website !</Link>}
            <NavLink id="survey-link" to={"Survey"}>
              <img height={32} src={feedback} alt="feedback" />
             Give your Feedback</NavLink>
            <NavLink id="exam-papers-link" to={"/Exam-papers"}> <span id="exam-papers-icon">࠰⊱</span> E-Collection Of Papers 🪴</NavLink>
    </div>
</div>)}

<div className="welcome-picture">
    <img height={350} src={E_member} alt="learning" />
</div>

</div>

<section>
  <div className="wave-holder">
  {/* TOP CROPPED: viewBox adjusted from "0 0 1440 320" to "0 128 1440 192" */}
  <svg 
    id="wave-straight" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 128 1440 192"
    preserveAspectRatio="none"
  >
    <path fill="hsl(218, 87%, 88%)" fillOpacity="1" d="M0,128L480,224L960,192L1440,192L1440,320L960,320L480,320L0,320Z"></path>
  </svg>
  {/* BOTTOM CROPPED: viewBox adjusted from "0 0 1440 320" to "0 0 1440 283" */}
  <svg 
    id="wave-wavy" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1440 293"
    preserveAspectRatio="none"
  >
    <path fill="hsl(218, 87%, 88%)" fillOpacity="1" d="M0,256L40,266.7C80,277,160,299,240,282.7C320,267,400,213,480,165.3C560,117,640,75,720,53.3C800,32,880,32,960,48C1040,64,1120,96,1200,96C1280,96,1360,64,1400,48L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
  </svg>
</div>
  <Testimony />
  <div className="wave-footer">
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1}} className="see-our-students">
      <p><strong>600k+</strong> Students</p>
      <button onClick={toggleTestimonyPicture} type="button">
        {showTestimonyPicture ? "Hide Crew" : "View more"}
      </button>
    </motion.div>
    <svg 
  width="100%" 
  height="100%" 
  id="wave-footer-svg-1" 
  viewBox="0 0 1440 390" 
  xmlns="http://www.w3.org/2000/svg" 
  className="transition duration-300 ease-in-out delay-150"
>
  <path 
    d="M 0,400 L 0,0 C 120.90909090909093,14.526315789473685 241.81818181818187,29.05263157894737 332,49 C 422.18181818181813,68.94736842105263 481.6363636363636,94.3157894736842 570,103 C 658.3636363636364,111.6842105263158 775.6363636363637,103.68421052631581 866,100 C 956.3636363636363,96.31578947368419 1019.8181818181818,96.94736842105263 1111,81 C 1202.1818181818182,65.05263157894737 1321.090909090909,32.526315789473685 1440,0 L 1440,400 L 0,400 Z" 
    stroke="none" 
    strokeWidth="0" 
    fill="hsl(218, 87%, 88%)" 
    fillOpacity="0.4" 
    className="transition-all duration-300 ease-in-out delay-150 path-0"
  ></path>
  
  <path 
    d="M 0,400 L 0,0 C 88.00956937799043,55.23444976076556 176.01913875598086,110.46889952153111 281,137 C 385.98086124401914,163.5311004784689 507.93301435406704,161.35885167464113 595,159 C 682.066985645933,156.64114832535887 734.2488038277511,154.0956937799043 834,159 C 933.7511961722489,163.9043062200957 1081.0717703349283,176.25837320574163 1190,151 C 1298.9282296650717,125.74162679425838 1369.4641148325359,62.87081339712919 1440,0 L 1440,400 L 0,400 Z" 
    stroke="none" 
    strokeWidth="0" 
    fill="hsl(218, 87%, 78%)" 
    fillOpacity="0.53" 
    className="transition-all duration-300 ease-in-out delay-150 path-1"
  ></path>
  
  <path 
    d="M 0,400 L 0,0 C 91.311004784689,129.0622009569378 182.622009569378,258.1244019138756 273,301 C 363.377990430622,343.8755980861244 452.82296650717694,300.5645933014354 541,285 C 629.177033492823,269.4354066985646 716.0861244019139,281.61722488038276 830,301 C 943.9138755980861,320.38277511961724 1084.8325358851675,346.96650717703346 1191,298 C 1297.1674641148325,249.03349282296654 1368.5837320574162,124.51674641148327 1440,0 L 1440,400 L 0,400 Z" 
    stroke="none" 
    strokeWidth="0" 
    fill="hsl(218, 87%, 68%)" 
    fillOpacity="1" 
    className="transition-all duration-300 ease-in-out delay-150 path-2"
  ></path>
</svg>
<svg 
id="wave-footer-svg-2"
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 32 1440 288" 
  preserveAspectRatio="none"
  style={{ width: '100%', height: '50px', transform: 'scaleY(-1)' }} /* Adjust height here to make it thinner */
>
  <path 
    fill="hsl(218, 87%, 68%)" 
    fillOpacity="1" 
    d="M0,32L40,58.7C80,85,160,139,240,165.3C320,192,400,192,480,202.7C560,213,640,235,720,234.7C800,235,880,213,960,192C1040,171,1120,149,1200,122.7C1280,96,1360,64,1400,48L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
  ></path>
</svg>
{
  showTestimonyPicture && (
    <div ref={imageSectionRef} className="students-crew-holder">
      <img id="students_crew" src={students_crew} alt="students crew" />
    </div>
  )
}
  </div>
</section>

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
                {isInstallable && (
                <div className="app-container">
                  <button onClick={handleAppInstallPrompt} type="button">Download App</button>
                  <img height={32} src={logo} alt="UK-Elearn" />
                </div>
                )}
              </div>
            </footer>

    </div>
    </>
  );
}