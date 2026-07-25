import { NavLink } from "react-router-dom";
// Images logo, semester, courses, Answers, user, download, docs and warning are from https://icons8.com/
import Homepage from "../assets/Homepage.png";
import logo from "../assets/learns.png";
import podcast from "../assets/podcast.png";
import open from "../assets/course.png";
import intro from "../assets/intro.svg";
import { useEffect, useRef, useState } from "react";

export const Intro = () => {
  const startingSentenceRef = useRef(null);
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
  return (
    <>
    <div className="container-fluid header-wraper">
            <div className="header-holder">
              <header>
                <img height={50} src={logo} alt="UK-Elearn" />
                <h1>UK-Elearn</h1>
              </header>
    
              <div className="header-elements">
                <ul>
                  <NavLink to={"/Home"}>
                    <li>
                      {" "}
                      <img height={22} src={Homepage} alt="Homepage" /> Homepage{" "}
                    </li>
                  </NavLink>
                  <NavLink to={"/Intro"}>
                    <li>
                      {" "}
                      <img height={22} src={open} alt="library" /> Intro{" "}
                    </li>
                  </NavLink>
                  <NavLink to={"/Podcast"}>
                    <li>
                      {" "}
                      <img height={22} src={podcast} alt="Podcast" /> E-Progress{" "}
                    </li>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>

          <div className="container intro-wrapper">
            <h2><sup id="star">٭</sup>Crafting <span id="engaging-introductions">engaging introductions</span> in literary works effortlessly.</h2>
            <img src={intro} alt="Intro" />
          </div>
          <div className="container call-to-action-holder">
            <a onClick={() => startingSentenceRef.current.scrollIntoView({ behavior: "smooth", block: "start" })} className="call-to-action">
              Kick off the journey
            </a>
          </div>
          <div className="wave-divider-holder">
            <svg id="wave-divider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="M0 0v100c500 0 475-96 500-96s0 96 500 96V0H0Z" fill="#0A2239"></path></svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100"><path d="M0 0v100c500 0 475-96 500-96s0 96 500 96V0H0Z" fill="#0A2239"></path></svg>
          </div>

          <div ref={startingSentenceRef} className="container starting-sentence-holder">
            <p className="starting-sentence">
              Making a captivating introduction has never been easier for students. They always find themselves stressing over how to start their work.
              For some, the introduction is the most difficult part of the work, and they end up writing it at the end of their work, 
              while others see it as rocket science and end up considering those who can write good introductions as geniuses.
            </p>
            <p>
              But the reality is that writing an introduction is a skill that can be learned and mastered with practice. It is not about being a genius, but about understanding the key elements that make an introduction effective and engaging.
              With the right guidance, students can learn how to craft introductions that capture the reader{"'"}s attention and set the tone for their work.
            </p>
            <p>
              Thus, I call on you to stop fearing the introduction process and consider it rather as a piece of cake that you do with fun and creativity. 
              Yet, you must commit to learning the art of writing introductions, and with time, you will find yourself writing them effortlessly and with confidence. 
              I will walk you through diffrent techniques to help you master the art of writing introductions, and 
              you should surely be able to write captivating introductions 
              that impress your readers and set the stage for your work by the end of this journey.
            </p>
          </div>
            
          <div className="container techniques-holder">
            <h2>Techniques for Writing Effective Introductions</h2>
            <p>There are different techniques for writing effective introductions. 
              However, I will walk you through the most <span className="underscore-msg">common</span> and  <span className="underscore-msg">effective</span> ones. 
              They are in number of <span className="underscore-msg">Two</span> : <strong><em>Straightforward Way</em></strong> and <strong><em>Five-step Way</em></strong>.</p>
          </div>

          <div className="container writing-steps-holder">
            <div className="straightforward-way">
              <h2><svg height={32} width={32} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
</svg>
 Straightforward Way</h2>
 <p>
    This technique is the most common one, and the simplest one you can use. It consists in three (3) main points: <span className="underscore-msg-2">Hook or Preamble</span>, <span className="underscore-msg-2">Thesis Statement</span> and <span className="underscore-msg-2">Plan Announcement</span>.
 </p>
 <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Hook or Preamble</span></span> is the first sentence of your introduction, and it is meant to grab the reader{"'"}s attention and make them interested in reading your work. It should be a general or overall idea, or a larger scope of your topic. Therefore, make sure to understand your topic well, and try to find a hook that is related to it, and that confirms your understanding of it. Do not forget that the hook is the first impression you make on your reader, so make it count and make it interesting.
 </p>
 <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Thesis Statement</span></span> is the second part of your introduction, and it is meant to state your main argument or point of view on your topic. In fact, it narrows down the scope of your work. It should be clear, concise, and specific. It should also be arguable, meaning that it should not be a statement of fact, but rather a statement that can be debated or challenged or a genuine reformulation. Bear in mind that your thesis statement should give an overview of your work and provide a roadmap for your readers.
 </p>
 <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Plan Announcement</span></span> is the third part of your introduction, and it is meant to outline the main points you will discuss in your body paragraphs. It should provide a clear structure for your readers and help them follow your argument. Make sure to keep it concise and relevant to your thesis statement. Remember the plan anouncement is the without exageration the contracted version of your body. As a result, you shoud be faithfull in your body with regards to what you claim in your plan announcement.
 </p>

 <p>- Let{"'"}s apply this technique to a real-world example, through this topic : <blockquote><strong><em>Discuss Socialism in Things Fall Apart by Tchinua achebe.</em></strong></blockquote></p>

 <p><span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

<span className="step-element-highlighter"> Application :</span> </span>
  Socialism is a political and economic ideology that advocates for the collective ownership and control of the means of production and distribution of goods and services. In Tchinua Achebe{"'"}s novel, Things Fall Apart, socialism is portrayed as a system that promotes equality and social justice, but also has its drawbacks and limitations. The novel explores the impact of colonialism on traditional African societies and how it disrupts their social and economic structures. Through the character of Okonkwo, we will bring light to the tension between individualism and collectivism in African societies, and how socialism can be both a solution and a challenge to these tensions.
</p>
            </div>

          <div className="five-steps-way">
            <h2><svg height={32} width={32} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
</svg>
 Five-step Way</h2>
 <p>
    This technique follows a five-step process and requires you to follow a structured approach. You may be asked to use this technique in your writing to assess your level of dealing with literary works regarding tertiary work methodology. It consists in five (5) main points: <span className="underscore-msg-2">Breaking Sentence</span>, <span className="underscore-msg-2">Framing Sentence</span>, <span className="underscore-msg-2">Working Definition</span>, <span className="underscore-msg-2">Launching Sentence</span> and <span className="underscore-msg-2">Plan Announcement</span>.
 </p>
  <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Breaking Sentence</span></span> is the first sentence of your introduction, and it is meant to break the ice and introduce your topic in a general way. It should be a broad statement that gives an overview of your topic and sets the stage for your introduction. Remember to avoid being too specific or too vague.
 </p>
  <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Framing Sentence</span></span> is the second part of your introduction, and it is meant to frame your topic and provide context for your readers. It should be a statement that narrows down the scope of your topic and provides background information that is relevant to your thesis statement. Make sure to keep it concise and relevant to your topic.
 </p>
  <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Working Definition</span></span> is the third part of your introduction, and it is where you break down key concepts that make up your topic. It should be a statement that defines your topic in a way that is relevant to your thesis statement and provides a clear understanding of what you will be discussing in your body paragraphs.
 </p>
  <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Launching Sentence</span></span> is the fourth part of your introduction, and it is meant to launch into your main argument or thesis statement. It should be a clear and concise statement that outlines the central idea of your paper and sets the stage for your body paragraphs. Bear in mind that you are not allowed to shed light on your work structure in this part, and you should not even give a hint about it. The launching sentence is meant to be a transition between your working definition and your thesis statement, and it should be a statement that leads your readers into your main argument.
 </p>
  <p>
    <span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
<span className="step-element-highlighter">Plan Announcement</span></span> is the fifth part of your introduction, and it is meant to outline the main points you will discuss in your body paragraphs. It should provide a clear structure for your readers and help them follow your argument. Make sure to keep it concise and relevant to your thesis statement. Remember the plan anouncement should include key elements from the working definition, as those key elements are the ones that make up your topic, and they should be the ones you will be discussing in your body paragraphs. As a result, you shoud be faithfull in your body with regards to what you claim in your plan announcement.
 </p>

 <p>- Let{"'"}s apply this technique to a real-world example, through this topic : <blockquote><strong><em>What are the landmarks which show the effectiveness of British integration ?</em></strong></blockquote></p>

 <p><span className="step-element"><svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#804f00" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

<span className="step-element-highlighter"> Application :</span> </span>
  Integration has been a key aspect of British history and has played a significant role in shaping the country{"'"}s social, economic, and political landscape. The effectiveness of British integration can be seen through various landmarks that have been established over the years. In fact, the British integration is about bringing together different cultures, communities, and identities to create a cohesive and inclusive society. Our task demands us to shed light on the landmarks that show the effectiveness of British integration. Thus, we will be discussing the key landmarks that have been established in Britain to promote integration and how they have contributed to creating a more inclusive society. We will also be exploring the challenges that have been faced in the process of integration and how they have been addressed. By the end of this discussion, we should have a clear understanding of the landmarks that show the effectiveness of British integration and how they have contributed to shaping the country{"'"}s identity and social fabric.
  </p>
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
    </>
  )
}