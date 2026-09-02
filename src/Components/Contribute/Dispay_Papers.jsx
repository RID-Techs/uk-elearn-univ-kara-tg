import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import open from "../../assets/course.png";
import download from "../../assets/download.png";
import { pdfFiles_sem_1 } from "../../All_Couses_Docs/Sem_1_2/courses_docs_1_2";
import { pdfFiles_sem_2 } from "../../All_Couses_Docs/Sem_1_2/courses_docs_1_2";
import { pdfFiles_sem_3 } from "../../All_Couses_Docs/Sem_3_4/courses_docs_3_4";
import { pdfFiles_sem_4 } from "../../All_Couses_Docs/Sem_3_4/courses_docs_3_4";
import { pdfFiles_sem_5 } from "../../All_Couses_Docs/Sem_5_6/courses_docs_5_6";
import { pdfFiles_sem_6 } from "../../All_Couses_Docs/Sem_5_6/courses_docs_5_6";
import { useEffect, useState } from "react";
import { ExamPapersCorrection } from "../../Utils/ExamPapersCorrectionHook";
import { isItemInCache } from "../../Network-Status/itemCache";
import { useNetworkStatus } from "../../Network-Status/networkHook";

const exactPaperIcon = <svg
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
  <path d="M17 17v-4l-5 3l-5 -3v4l5 3z" />
  <path d="M17 8v-4l-5 3l-5 -3v4l5 3z" />
</svg>

const otherPapersIcon = <svg
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
  <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
  <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
  <path d="M5 8h4" />
  <path d="M9 16h4" />
  <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
  <path d="M14 9l4 -1" />
  <path d="M16 16l3.923 -.98" />
</svg>
export function DisplayPapers({ papers }) {
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();
  const getMemberStatus = localStorage.getItem("isSignedIn");
  const isMember = getMemberStatus === "true";
  const [searchParams,] = useSearchParams();
  const semester = searchParams.get("semester");
  const [corrections, setCorrections] = useState({});

  const [filesSem1, setFilesSem1] = useState(pdfFiles_sem_1);
    const [filesSem2, setFilesSem2] = useState(pdfFiles_sem_2);
    const [filesSem3, setFilesSem3] = useState(pdfFiles_sem_3);
    const [filesSem4, setFilesSem4] = useState(pdfFiles_sem_4);
    const [filesSem5, setFilesSem5] = useState(pdfFiles_sem_5);
    const [filesSem6, setFilesSem6] = useState(pdfFiles_sem_6);

 useEffect(() => {
  let pdfSource;

  switch (semester) {
    case "1": pdfSource = filesSem1; break;
    case "2": pdfSource = filesSem2; break;
    case "3": pdfSource = filesSem3; break;
    case "4": pdfSource = filesSem4; break;
    case "5": pdfSource = filesSem5; break;
    case "6": pdfSource = filesSem6; break;
    default: return;
  }

  const result = {};

  papers.forEach((paper) => {
    const correction = ExamPapersCorrection(pdfSource, paper);
    if (correction) {
      result[paper.id] = correction;
    }
  });

  setCorrections(result);

}, [semester, papers, filesSem1, filesSem2, filesSem3, filesSem4, filesSem5, filesSem6]);

const [trackCourses_Sem_1, setTrackCourses_Sem_1] = useState(() => {
      const saved = localStorage.getItem("tr_cs_1");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "English_Grammar", courses: [] },
        { courseKey: "American_Civilization", courses: [] },
        { courseKey: "African_Civilization", courses: [] },
        { courseKey: "Phonetics_Phonology", courses: [] },
        { courseKey: "Travail_Universitaire", courses: [] },
        { courseKey: "Civilisation_Britanique", courses: [] },
        { courseKey: "Expression_Écrite", courses: [] },
        { courseKey: "Composition_En_Français", courses: [] }
      ];
    });
  
    const [trackCourses_Sem_3, setTrackCourses_Sem_3] = useState(() => {
      const saved = localStorage.getItem("tr_cs_3");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "English_Novel", courses: [] },
        { courseKey: "Morphology_and_Syntax", courses: [] },
        { courseKey: "African_Novel", courses: [] },
        { courseKey: "American_Novel", courses: [] },
        { courseKey: "Théâtre_Africain", courses: [] },
        { courseKey: "Théâtre_Classique", courses: [] },
        { courseKey: "Traduction_Avancée", courses: [] },
        { courseKey: "Expression_Écrite_Avancée", courses: [] }
      ];
    });
  
    const [trackCourses_Sem_5, setTrackCourses_Sem_5] = useState(() => {
      const saved = localStorage.getItem("tr_cs_5");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "English_Novel", courses: [] },
        { courseKey: "Morpho_Phonology", courses: [] },
        { courseKey: "Post_African_Novel", courses: [] },
        { courseKey: "Discourse_Analysis", courses: [] },
        { courseKey: "Litt_Env", courses: [] },
        { courseKey: "Litt_Culture", courses: [] },
        { courseKey: "Modern_American", courses: [] }
      ];
    });
  
    const [trackCourses_Sem_2, setTrackCourses_Sem_2] = useState(() => {
      const saved = localStorage.getItem("tr_cs_2");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "Anglophone_Lit", courses: [] },
        { courseKey: "Anglophone_Poetry", courses: [] },
        { courseKey: "Anglophone_Prose", courses: [] },
        { courseKey: "Anglophone_Theater", courses: [] },
        { courseKey: "Creative_Writing", courses: [] },
        { courseKey: "Méth_de_Traduction", courses: [] },
        { courseKey: "Oral_Express", courses: [] },
        { courseKey: "Allemand", courses: [] },
        { courseKey: "Espagnol", courses: [] }
      ];
    });
  
    const [trackCourses_Sem_4, setTrackCourses_Sem_4] = useState(() => {
      const saved = localStorage.getItem("tr_cs_4");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "African_Civilisation", courses: [] },
        { courseKey: "African_Poetry", courses: [] },
        { courseKey: "American_Civilisation", courses: [] },
        { courseKey: "American_Poetry", courses: [] },
        { courseKey: "Contemporary_British_Civ", courses: [] },
        { courseKey: "Early_Am_Theater", courses: [] },
        { courseKey: "English_Poetry", courses: [] },
        { courseKey: "Advanced_Oral_Exp", courses: [] }
      ];
    });
  
    const [trackCourses_Sem_6, setTrackCourses_Sem_6] = useState(() => {
      const saved = localStorage.getItem("tr_cs_6");
  
      if (saved) {
        return JSON.parse(saved);
      }
  
      return [
        { courseKey: "Academic_Writing", courses: [] },
        { courseKey: "Litt_Theory", courses: [] },
        { courseKey: "Critique_Litt_Africa", courses: [] },
        { courseKey: "Critique_Litt_America", courses: [] },
        { courseKey: "Critique_Litt_Anglaise", courses: [] },
        { courseKey: "Litt_Comparée", courses: [] },
        { courseKey: "Litt_Media", courses: [] }
      ];
    });

     useEffect(() => {
        // 1. Move isMounted INSIDE the effect so it resets properly on every run
      let isMounted = true; 
    
      async function verifyCache(setSemesterFiles) {
        try {
          const cacheName = 'local-media-cache';
          const cache = await caches.open(cacheName);
          const cachedRequests = await cache.keys();
          
          const cachedUrls = cachedRequests.map(req => decodeURIComponent(req.url));
          
          // 2. Check if mounted right BEFORE setting state (after async work)
          if (!isMounted) return; 
          setSemesterFiles(prevFiles => {
            let hasChanges = false;
            
            const newFiles = prevFiles.map(doc => {
              const isInCache = cachedUrls.some(url => url.includes(doc.url));
              
              // 3. Only create a new object if the status actually changed
              if (isInCache && !doc.isCached) {
                hasChanges = true;
                return { ...doc, isCached: true };
              } 
              // Optional: If an item was removed from the cache, flip it to false
              else if (!isInCache && doc.isCached) {
                hasChanges = true;
                return { ...doc, isCached: false };
              }
              
              // If no change, return the exact same object reference
              return doc; 
            });
    
            // 4. If nothing changed, return prevFiles to PREVENT a re-render
            return hasChanges ? newFiles : prevFiles; 
          });
    
        } catch (error) {
          console.error("Erreur lecture cache:", error);
        }
      }
        
          // 2. Wrap the execution in a helper function so we can call it easily
      const checkAllCaches = () => {
        if(semester === "1") verifyCache(setFilesSem1);
        if(semester === "2") verifyCache(setFilesSem2);
        if(semester === "3") verifyCache(setFilesSem3);
        if(semester === "4") verifyCache(setFilesSem4);
        if(semester === "5") verifyCache(setFilesSem5);
        if(semester === "6") verifyCache(setFilesSem6);
      };
    checkAllCaches();
      // 4. Add the event listener to catch any downloads/deletions happening in real-time
      window.addEventListener('cache-updated', checkAllCaches);
        
          return () => {
            isMounted = false;
            // 5. Clean up the listener when the component unmounts
            window.removeEventListener('cache-updated', checkAllCaches);
          }
      }, [semester]);

          useEffect(() => {
            if(isMember) {
              if(semester === "1") localStorage.setItem("tr_cs_1", JSON.stringify(trackCourses_Sem_1));
              if(semester === "2") localStorage.setItem("tr_cs_3", JSON.stringify(trackCourses_Sem_3));
              if(semester === "3") localStorage.setItem("tr_cs_5", JSON.stringify(trackCourses_Sem_5));
              if(semester === "4") localStorage.setItem("tr_cs_2", JSON.stringify(trackCourses_Sem_2));
              if(semester === "5") localStorage.setItem("tr_cs_4", JSON.stringify(trackCourses_Sem_4));
              if(semester === "6") localStorage.setItem("tr_cs_6", JSON.stringify(trackCourses_Sem_6));
            }
          }, [trackCourses_Sem_1, trackCourses_Sem_3, trackCourses_Sem_5, trackCourses_Sem_2, trackCourses_Sem_4, trackCourses_Sem_6, semester, isMember]);

  const openDocInNewTab = async (e) => {
            e.preventDefault();
            const currentItem = e.currentTarget;
            const fileUrl = currentItem.getAttribute("href");
              const findItemInTheCache = await isItemInCache(fileUrl);
          
              if(!isOnline && !findItemInTheCache) {
                // setOfflineMsg(true);
                return;
              }
              window.open(fileUrl, "_blank");
              return;
          }
        const [downloadTxt, setDownloadTxt] = useState("Download");

      const getCourseOfSem = async (e, fileUrl, fileName) => {
        e.preventDefault();
        const currentItem = e.currentTarget;
        const findItemInTheCache = await isItemInCache(fileUrl);
        setDownloadTxt("Preparing...");
        if(!isOnline && !findItemInTheCache) {
          // setOfflineMsg(true);
          setDownloadTxt("Download");
          return;
        }
    
        const targetedCourse = currentItem.getAttribute("data-course");
        const targetedCourseKey = currentItem.getAttribute("data-course-key");
        const targetedCourseIndex = currentItem.getAttribute("data-course-index");
        const getItemTarget = currentItem.getAttribute("target");
    
        if(getItemTarget === "_blank") {
          window.open(fileUrl, "_blank");
        } else {
          try {
            const response = await fetch(fileUrl);
    
            if (response.ok) {
                // The Service Worker has successfully intercepted and CACHED the file.
                setDownloadTxt("Download");
                // 3. Trigger the actual browser download using the response data.
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
    
                // Create a temporary link element to prompt the download dialog
                const tempLink = document.createElement('a');
                tempLink.href = url;
                tempLink.setAttribute('download', fileName);
                document.body.appendChild(tempLink);
                tempLink.click();
                document.body.removeChild(tempLink);
                window.URL.revokeObjectURL(url);
                // Put this right after your file is successfully added to the cache
                window.dispatchEvent(new Event('cache-updated'));
            }
        } catch (error) {
          setDownloadTxt("Download");
            console.error("Fetch failed (offline or server error):", error);
            // Handle offline state here (show your "connect first" message)
            alert("Unable to download or access file. Please check connection."); 
        }
        }
    
        const convertedTargetedCourseIndex = Number(targetedCourseIndex);
    
        if(semester === "1") {
          if(trackCourses_Sem_1[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_1[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
            return;
          }
      
          setTrackCourses_Sem_1(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        } else if(semester === "3") {
          if(trackCourses_Sem_3[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_3[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
            return;
          }
      
          setTrackCourses_Sem_3(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        } else if(semester === "5") {
          if(trackCourses_Sem_5[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_5[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
            return;
          }
      
          setTrackCourses_Sem_5(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        } else if(semester === "2") {
          if(trackCourses_Sem_2[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_2[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
            return;
          }
      
          setTrackCourses_Sem_2(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        } else if(semester === "4") {
          if(trackCourses_Sem_4[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_4[convertedTargetedCourseIndex].courses.includes(targetedCourse)){ 
            return;
          }
      
          setTrackCourses_Sem_4(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        } else if(semester === "6") {
          if(trackCourses_Sem_6[convertedTargetedCourseIndex].courseKey !== targetedCourseKey) {
            return;
          }
      
          if(trackCourses_Sem_6[convertedTargetedCourseIndex].courses.includes(targetedCourse)){
            return;
          }
      
          setTrackCourses_Sem_6(prev =>
            prev.map((item, idx) => {
              if(idx === convertedTargetedCourseIndex) {
                return {...item, courses: [...item.courses, targetedCourse]}
              } else {
                return item
              }
            })
          );
        }
      }

    async function openCachedPDF(url) {
      await navigator.serviceWorker.ready;
    
      const cache = await caches.open('local-media-cache');
      const cachedResponse = await cache.match(url);
    
      if (!cachedResponse) {
        console.error("PDF not found in cache:", url);
        return;
      }
    
      document.body.style.overflow = "auto";
      // ✅ Just navigate with the original URL
      navigate("/pdfreader", { state: { url }, replace: false });
    }
    
  return (
    <div className="display-all-papers-wrapper">
      <div className="display-papers-holder">
        {papers.map((paper) => {
          const correction = corrections[paper.id];
          return (
          <div key={paper.id} className="paper-item">
            <div className="paper-info-header">
              <img src={paper.paper_img} alt="paper" />
            </div>
            <div className="paper-info-body">
              <h5>📑 Unit : {paper.paper_name} </h5>
              <p>Academic Year : {paper.paper_year} 🧩📌</p>
              {paper.is_double_sided === "Yes" ? (
                <p>Paper Side : {paper.paper_side} 🎋</p>
              ) : null
              }
            </div>
                        <div className="paper-info-footer">
              <a href={`${paper.paper_img}?download=${paper.paper_name}.jpg`} rel="noopener noreferrer" download={`${paper.paper_name}.jpg`}>Download ⤴</a>
            </div>
            {correction?.available && (
              <div className="exam-papers-corrections-links">
              <details>
                <summary>View Corrections</summary>
                <div className="">
                  {correction?.exactPaperCorrection && (
  <div className="correction-info">
    <div className="corrected-papers-holder">
    <p className="corrected-papers-holder-title"> {exactPaperIcon} Exact correction available</p>
    <div className="corrected-papers">
      <p className="corrected-papers-name">{correction.exactPaperCorrection.name}</p>
    {
                          isMember === true ? (
                            correction.exactPaperCorrection.isCached ? (
                              <div className="doc-action-button">
                          <a onClick={() => openCachedPDF(correction.exactPaperCorrection.url)}>
                            <img
                              className="me-2"
                              height={22}
                              src={open}
                              alt="arrow"
                            />{" "}
                            Open
                          </a>
                        </div>
                            ) : (
                              
                        <div className="doc-action-button">
                          <a
                            onClick={openDocInNewTab}
                            href={correction.exactPaperCorrection.opendoc}
                            rel="noopener noreferrer"
                          >
                            <img
                              className="me-2"
                              height={22}
                              src={open}
                              alt="arrow"
                            />{" "}
                            Open
                          </a>
                          <a
                            onClick={(e) => getCourseOfSem(e, correction.exactPaperCorrection.url, `${correction.exactPaperCorrection.name}.pdf`)}
                            data-course={correction.exactPaperCorrection.name}
                            data-course-key={correction.exactPaperCorrection.course_key}
                            data-course-index={correction.exactPaperCorrection.course_index}
                            rel="noopener noreferrer"
                          >
                            <img
                              className="me-2"
                              height={22}
                              src={download}
                              alt="arrow"
                            />{" "}
                            <span className="both-screens">{downloadTxt}</span>
                          </a>
                          
                        </div>
                            )
                          ) : (
                            <div className="doc-action-button">
                          <a data-bs-toggle="modal" data-bs-target="#logInMember">
                            <img
                              className="me-2"
                              height={22}
                              src={open}
                              alt="arrow"
                            />{" "}
                            Open
                          </a>
                          <a data-bs-toggle="modal" data-bs-target="#logInMember">
                            <img
                              className="me-2"
                              height={22}
                              src={download}
                              alt="arrow"
                            />{" "}
                            <span className="both-screens">Download</span>
                          </a>
                        </div>
                          )
                        }
    </div>
    </div>
  </div>
)}

{correction?.examPapers?.length > 0 && (
  <div className="corrected-papers-holder">
    <p className="corrected-papers-holder-title">{otherPapersIcon} {correction?.examPapers?.length > 1 ? "Other" : "Another"} Correction{correction?.examPapers?.length > 1 ? "s" : ""} available</p>
    {correction.examPapers.map((p, i) => {
      return (
            <div key={i} className="corrected-papers">
              <p className="corrected-papers-name">{p.name}</p>
              {
                isMember === true ? (
                                p.isCached ? (
                                  <div className="doc-action-button">
                              <a onClick={() => openCachedPDF(p.url)}>
                                <img
                                  className="me-2"
                                  height={22}
                                  src={open}
                                  alt="arrow"
                                />{" "}
                                Open
                              </a>
                            </div>
                                ) : (
                                  
                            <div className="doc-action-button">
                              <a
                                onClick={openDocInNewTab}
                                href={p.opendoc}
                                rel="noopener noreferrer"
                              >
                                <img
                                  className="me-2"
                                  height={22}
                                  src={open}
                                  alt="arrow"
                                />{" "}
                                Open
                              </a>
                              <a
                                onClick={(e) => getCourseOfSem(e, p.url, `${p.name}.pdf`)}
                                data-course={p.name}
                                data-course-key={p.course_key}
                                data-course-index={p.course_index}
                                rel="noopener noreferrer"
                              >
                                <img
                                  className="me-2"
                                  height={22}
                                  src={download}
                                  alt="arrow"
                                />{" "}
                                <span className="both-screens">{downloadTxt}</span>
                              </a>
                              
                            </div>
                                )
                              ) : (
                                <div className="doc-action-button">
                              <a data-bs-toggle="modal" data-bs-target="#logInMember">
                                <img
                                  className="me-2"
                                  height={22}
                                  src={open}
                                  alt="arrow"
                                />{" "}
                                Open
                              </a>
                              <a data-bs-toggle="modal" data-bs-target="#logInMember">
                                <img
                                  className="me-2"
                                  height={22}
                                  src={download}
                                  alt="arrow"
                                />{" "}
                                <span className="both-screens">Download</span>
                              </a>
                            </div>
                              )
              }
            </div>
      )
    })}
  </div>
)}
                </div>
              </details>
            </div>
            )}
          </div>
        )
        })}
      </div>
    </div>
  );
}

DisplayPapers.propTypes = {
  papers: PropTypes.arrayOf(
    PropTypes.shape({
      paper_name: PropTypes.string.isRequired,
      is_double_sided: PropTypes.string.isRequired,
      paper_side: PropTypes.string,
      paper_year: PropTypes.string.isRequired,
      paper_img: PropTypes.string.isRequired
    })
  ).isRequired
};