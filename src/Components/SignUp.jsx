import supabase from "../Config/DbConnect"
// Image logo, stars, star, username, password is from https://icons8.com/
import logo from "../assets/learns.png";
import stars from "../assets/stars.png";
import star from "../assets/stars_2.png";
import username from "../assets/username.png";
import password from "../assets/password.png";
import E_member from "../assets/E_picture.webp";
import { toast, Zoom } from "react-toastify";
import { useState, useEffect} from "react";
export function SignUp() {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [identifiant, setIdentifiant] = useState('');
  const [loading, setLoading] = useState("Sign up");
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

  const WarnMsg = (Msg) => {
    toast.warn(Msg, {
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

  const generateIdentifiant = () => {
  // Ensure we have at least one of the fields to work with
  if (!name?.trim() && !firstname?.trim()) {
    WarnMsg("Enter the name first to generate the identifier.");
    return;
  }

  // Reusable sanitization function for both name and pronoun
  const sanitizeString = (str) => {
    if (!str) return "";
    return str
      .trim()
      .normalize("NFD") // Separate letters from accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
      .replace(/['’`-]/g, "") // Remove apostrophes and hyphens
      .replace(/\s+/g, "") // Remove spaces
      .replace(/[^\p{L}]/gu, "") // Keep only letters
      .toUpperCase();
  };

  const cleanName = sanitizeString(name);
  const cleanPronoun = sanitizeString(firstname); // Assuming 'pronoun' holds the Prénom

  if (!cleanName && !cleanPronoun) {
    FailedToSignIn("The name contains no valid letters.");
    return;
  }

  // Combine name and pronoun to guarantee 4 letters. 
  // Pad with "X" at the end just in case the combined length is still under 4.
  const baseLetters = (cleanName + cleanPronoun + "XXXX").substring(0, 4);

  // Generate a random 4-digit number between 1000 and 9999
  const randomNumbers = Math.floor(1000 + Math.random() * 9000);

  // Set the identifier (e.g., MARC8645)
  setIdentifiant(`${baseLetters}${randomNumbers}`);
};

  const handleSignUp = async (e) => {
    e.preventDefault();
      if (!name.trim() || !firstname.trim() || !identifiant.trim()) {
      WarnMsg("Please, All fields are required !");
      setLoading("Sign up");
        return
    }

    setLoading("Processing...");

    try {
       const { error } = await supabase
          .from('students')
          .insert([
            {
              Name: name.trim(),
              Firstname: firstname.trim(),
              identifiant: identifiant.trim(),
              uniqueCopyKey: null
            }
          ]);

            if (error) {
          // Handle uniqueness error (If the identifier already exists)
          if (error.code === '23505') {
            FailedToSignIn(`The identifier "${identifiant}" already exists.`);
          } else {
            FailedToSignIn("Registration error: " + error.message);
          }
          return;
        }

        setName('');
        setFirstname('');
        setIdentifiant('');
        setLoading("Sign up");
        Welcome("You are an E-member now !");
        window.location.reload();
    } catch (error) {
       console.error("Unexpected error:", error);
        FailedToSignIn("An unexpected error occurred.");
    }

}

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
          Sign up to access your learning space{" "}
          <img src={star} alt="star" />{" "}
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
                Name :
              </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="username" placeholder="Ex: TCHALA" />
            </div>
            <div className="input-holder mt-4">
              <label htmlFor="username">
                {" "}
                <img
                  id="user-icon"
                  height={36}
                  src={username}
                  alt="username"
                />{" "}
                Firstname :
              </label>
              <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} id="username" placeholder="Ex: Marco" />
            </div>
            <div className="input-holder mt-4">
              <label htmlFor="username">
                {" "}
                <img
                  id="user-icon"
                  height={36}
                  src={password}
                  alt="username"
                />{" "}
                Identifier :
              </label>
              <input type="text" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} id="username" placeholder="Ex: TCHALA-8492" />
            </div>

             <button
            type="button"
            onClick={generateIdentifiant}
            title="Generate automatically"
            className="generate-btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
            Generate
          </button>
 
            <div className="">
              <button onClick={handleSignUp} id="login-button" type="button">
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