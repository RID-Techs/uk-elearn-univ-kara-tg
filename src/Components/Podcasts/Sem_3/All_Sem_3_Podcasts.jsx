import { Link } from "react-router-dom";
export function Sem_3_Podcasts () {
  const American_Novel = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761682/American_Novel_zdlyub.aac";
  const Uncle_Tom = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761740/Uncle_Tom_ofdrgw.aac";
  const New_Names = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761675/NewNames_srdfua.aac";
  const Railroad = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761690/Railroad_pba2vu.aac";
  const Huckleberry_Finn = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761736/Huckleberry_Finn_l6et5r.aac";
  const English_18_Novel = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761708/English_18_Novel_bxayht.aac";
  const The_Lion_and_Jewel = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761723/The_Lion_and_Jewel_hd1h64.aac";
  const Morphology = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761729/Morphology_foti4p.aac";
  const African_drama = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761650/African_drama_ughbj7.aac";
  const Yellow_Yellow = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761712/Yellow_Yellow_hcfflz.ogg";
  const Yellow_Characters = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761692/Yellow_Characterization_su7mzl.ogg";
  const Yellow_SecondCharacters = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761698/Yellow_Secondary_fr2p8v.ogg";
  const Yellow_Themes = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761702/Yellow_Themes_gc34wk.ogg";
  const Yellow_French = "https://res.cloudinary.com/ddejfyqlw/video/upload/v1768761696/Yellow_French_iwdfgg.ogg";
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
          <p><span className="podcast-underliner">Podcast</span> : Morphology & Syntax</p>
        </div>
        <div className="cours-podcast-body">
          <p>Content : Explanation of key concepts</p>
          {
              isMember ? (
          <audio controls>
            <source src={Morphology} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : American Novel </p>
          </div>
          <div className="cours-podcast-body">
            <p>Content : Explanation of the course</p>
            {
              isMember ? (
            <audio controls>
              <source src={American_Novel} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : American Novel </p>
          </div>
          <div className="cours-podcast-body">
            <p>Case Study : Harriet Beecher Stowe{"'"}s <em>Uncle Tom{"'"}s Cabin</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Uncle_Tom} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : American Novel </p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Mark Twain{"'"}s <em>The Adventures of Huckleberry Finn </em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Huckleberry_Finn} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : American Novel </p>
          </div>
          <div className="cours-podcast-body">
            <p>Case Study : Colson Whitehead{"'"}s <em>The Underground Railroad</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Railroad} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : American Novel </p>
          </div>
          <div className="cours-podcast-body">
            <p>Case Study : Noviolet Bulawayo{"'"}s <em>We Need New Names</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={New_Names} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : 18<sup>th</sup> Century English Novel </p>
          </div>
          <div className="cours-podcast-body">
          <p>Content : Explanation of the course</p>
            {
              isMember ? (
            <audio controls>
              <source src={English_18_Novel} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Drama</p>
          </div>
          <div className="cours-podcast-body">
          <p>Content : Explanation of the course</p>
            {
              isMember ? (
            <audio controls>
              <source src={African_drama} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Drama</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Wole Soyinka{"'"}s <em>The Lion and the Jewel</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={The_Lion_and_Jewel} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Novel</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Kaine Agary{"'"}s <em>Yellow Yellow</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Yellow_Yellow} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Novel</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Kaine Agary{"'"}s <em>Yellow Yellow (Characterization)</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Yellow_Characters} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Novel</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Kaine Agary{"'"}s <em>Yellow Yellow (Secondary Characters)</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Yellow_SecondCharacters} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Novel</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Kaine Agary{"'"}s <em>Yellow Yellow (Themes)</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Yellow_Themes} type="audio/aac" />
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
            <p><span className="podcast-underliner">Podcast</span> : African Novel</p>
          </div>
          <div className="cours-podcast-body">
          <p>Case Study : Kaine Agary{"'"}s <em>Yellow Yellow (French Version)</em></p>
            {
              isMember ? (
            <audio controls>
              <source src={Yellow_French} type="audio/aac" />
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