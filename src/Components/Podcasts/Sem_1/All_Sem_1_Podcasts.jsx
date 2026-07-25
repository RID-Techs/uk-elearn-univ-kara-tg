
import { Link } from "react-router-dom";

export function Sem_1_Podcasts () {
  // const MTU_INTRODUCTION_STEPS = "https://oousnjsxqzaocpqjfvkp.supabase.co/storage/v1/object/public/e-learning/Sem_1/MTU_INTRO.ogg";
  const MTU_INTRODUCTION_STEPS = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761470/MTU_INTRO_awctie.ogg";
  const Phonetics_phonology = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761521/Phonetics_phonology_fitjjs.aac";
  const getMemberStatus = localStorage.getItem("isLoggedIn");
  const isMember = getMemberStatus === "true";

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

        <div className="cours-podcasts-holder">

          <div className="cours-podcast">
          <div className="cours-podcast-header">
            <p><span className="podcast-underliner">Podcast</span> : Phonetics & Phonology </p>
          </div>
          <div className="cours-podcast-body">
            <p>Content : Explanation of the course</p>
            {
              isMember ? (
                <audio controls>
                  <source src={Phonetics_phonology} type="audio/aac" />
                </audio>
              ) : (
              <div className="podcast-not-allowed">
                <p data-bs-toggle="modal" data-bs-target="#logInMember"> <span>▸</span> <span> Play 🧩🎙️</span></p>
              </div>
              )
            }
          </div>
        </div>
          <div className="cours-podcast">
          <div className="cours-podcast-header">
            <p><span className="podcast-underliner">Podcast</span> : Méthodologie du Travail Universitaire </p>
          </div>
          <div className="cours-podcast-body">
            <p>Content : Introduction Steps</p>
            {
              isMember ? (
                <audio controls>
                  <source src={MTU_INTRODUCTION_STEPS} type="audio/aac" />
                </audio>
              ) : (
              <div className="podcast-not-allowed">
                <p data-bs-toggle="modal" data-bs-target="#logInMember"> <span>▸</span> <span> Play 🧩🎙️</span></p>
              </div>
              )
            }
          </div>
        </div>

        </div>
        
        </>
  )
}