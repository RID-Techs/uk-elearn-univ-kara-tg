import supabase from "../Config/DbConnect"
// Image logo, stars, star, username, password is from https://icons8.com/
import logo from "../assets/learns.png";
import stars from "../assets/stars.png";
import star from "../assets/stars_2.png";
import username from "../assets/username.png";
import E_member from "../assets/E_picture.webp";
import { toast, Zoom } from "react-toastify";
import { useState, useEffect} from "react";

export function SignIn() {
  const [loading, setLoading] = useState("Sign in");
  const [identifiant, setIdentifiant] = useState('');
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

  const FillInputs = () => {
    toast.warn("Please enter your identifier.", {
      theme: "light",
      position: "top-center",
      autoClose: 2000,
      transition: Zoom,
    });
  };
  const Welcome = (message) => {
    toast.success(message, {
      theme: "light",
      position: "top-center",
      autoClose: 2000,
      transition: Zoom,
    });
  };
  const FailedToSignIn = (message) => {
    toast.error(message, {
      theme: "light",
      position: "top-center",
      autoClose: 2000,
      transition: Zoom,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const cleanIdentifiant = identifiant.trim();
    if (!cleanIdentifiant) {
      FillInputs();
      setLoading("Sign in");
        return
    }

    setLoading("Processing...");

    try {
        // 1. Fetch the student from the Supabase database
        const { data: student, error: fetchError } = await supabase
          .from('students')
          .select('id, identifiant, uniqueCopyKey, Name, Firstname')
          .eq('identifiant', cleanIdentifiant)
          .single();

        if (fetchError || !student) {
          FailedToSignIn("Identifier not found. Please verify its accuracy.");
          setLoading("Sign in");
          return;
        }

        // 2. Check the key in the student's browser localStorage
        const localDeviceKey = localStorage.getItem('deviceKey');

        // SCENARIO A: FIRST LOGIN (The DB field is null)
        if (!student.uniqueCopyKey) {
          // Generation of a unique UUID for this device
          const newDeviceKey = crypto.randomUUID();

          // Update Supabase DB
          const { error: updateError } = await supabase
            .from('students')
            .update({ uniqueCopyKey: newDeviceKey })
            .eq('id', student.id);

          if (updateError) {
            FailedToSignIn("Error during device activation. Please try again.");
            setLoading("Sign in");
            return;
          }

          // Local storage
          localStorage.setItem('deviceKey', newDeviceKey);
          
          // Activation success
         completeLogin(student.identifiant, student.Name, student.Firstname);
          return;
        }

        // SCENARIO B: DEVICE ALREADY REGISTERED (The DB field is not null)
        if (student.uniqueCopyKey) {
          // Compare the DB key with the local key
          if (student.uniqueCopyKey === localDeviceKey) {
             // Perfect match: It is the correct device
             completeLogin(student.identifiant, student.Name, student.Firstname);
          } else {
             // Mismatch: Attempt to login from another device!
             FailedToSignIn("Access denied: This account is already bound to another device (phone or computer).");
          }
        }
    } catch (error) {
      console.error("Unexpected error:", error);
        FailedToSignIn("A network error occurred. Please check your connection.");
    }
}

  const completeLogin = (userId, userName, userFirstname) => {
    // This function handles the final authentication state
    setLoading("Sign in");
    localStorage.setItem("isSignedIn", "true");
    Welcome("You are an E-member now !");
    localStorage.setItem('currentUser', userId);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userFirstname', userFirstname);
    setTimeout(() => {
          window.location.replace("/");
        }, 2000);
  };

  return (
    <>
      <div className="page-wrapper">
      <div className="container-fluid header-wraper-home">
        <div className="header-holder">
          <header>
            <img height={50} src={logo} alt="UK-Elearn" />
            <h1>UK-Elearn</h1>
          </header>
        </div>

        <div className="header-elements">
          <h3 id="member">
            Enjoy learning here <img className="member-stars" height={52} src={stars} alt="stars" />{" "}
          </h3>
        </div>
      </div>

      <div className="sign-up-and-in-holder">
        <h3 className="ms-4">
          Sign in to access your learning space{" "}
          <img height={32} src={star} alt="star" />{" "}
        </h3>
      </div>

      <section className="stretch-section-content">
        <div className="login-holder mt-4">
        <div className="inputs-wraper mt-4">
          <form>
            <div className="input-holder">
              <label htmlFor="username">
                {" "}
                <img
                  id="user-icon"
                  height={36}
                  src={username}
                  alt="username"
                />{" "}
                Identifier :
              </label>
              <input type="text" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} id="username" placeholder="Enter Your PassKey" />
            </div>
            <div className="">
              <button onClick={handleSignIn} id="login-button" type="button">
                {loading}
              </button>
            </div>
          </form>
        </div>

        <div className="e-member-picture-holder">
          <img height={350} src={E_member} alt="learning" />
        </div>
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
  );
}
