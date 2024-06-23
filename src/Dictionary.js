import { faBroom, faSearchDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import useFetchnew from "./useFetchnew";

function Dictionary() {
  const [inputword, setinputword] = useState("");

  const [input, setInput] = useState("");

  const handleChange = useCallback((e) => {
    setInput(e.target.value);
  });

  const handleSearch = () => {
    if(input){
    setinputword(input);
    }else{
      alert("Please enter a word in the search box ");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
      setinputword(input);
      setInput('');
    }
  };
  const handleClear = () => {
    setinputword("");
  };

  const { data, isPending, error } = useFetchnew(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputword}`,
    0
  );
  console.log(data);

  useEffect(() => {
    // Create a new div element for the cursor circle
    const hoverMouse = document.createElement("div");
    hoverMouse.classList.add("hoverMouse");
    document.body.appendChild(hoverMouse);

    // Add event listener for mousemove on the window object
    const handleMouseMove = (event) => {
      // Get mouse coordinates
      let cursorX = event.clientX;
      let cursorY = event.clientY;

      // Update position of cursor circle
      hoverMouse.style.left = `${cursorX}px`;
      hoverMouse.style.top = `${cursorY}px`;

      // Show the cursor circle
      hoverMouse.style.display = "block";
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener and the hoverMouse element on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeChild(hoverMouse);
    };
  }, []);

  console.log(" Dictionary main rendered");

  return (
    <>
      <main>
        <section className="inputField">
          <textarea
            placeholder=" Enter a word here "
            value={input}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          ></textarea>
          <p>
            <span className="btn" onClick={handleSearch}>
              Search <FontAwesomeIcon icon={faSearchDollar} />
            </span>
          </p>
          <p>
            <span className="btn" onClick={handleClear}>
              Clear <FontAwesomeIcon icon={faBroom} />
            </span>
          </p>
        </section>
        <section className="outputField orderL">
          {!data ? (
            <h1 className="init">
              Results to be displayed after you hit Search Button
            </h1>
          ) : (
            <div className="pad">
              <h1 className="resHead">
                Your Search Results for : <span>{inputword}</span>
              </h1>
              <div className="resBody">
                {data &&
                  data.map((groups, GI) => (
                    <div className="sources" key={GI}>
                      <section>
                        {groups.meanings.map((cls, CI) => (
                          <div key={CI} className="packet">
                            <h1>
                              {CI + 1}. Part of Speech :{" "}
                              <b>{cls.partOfSpeech}</b>
                            </h1>
                            <div >
                              {
                                <div className="syno">
                                  {cls.synonyms.length >= 1 && (
                                    <>
                                      <p className="synonyms">Synonyms: </p>
                                      {cls.synonyms.map((sy, syI) => (
                                        <span key={syI}>
                                          {syI + 1}.{sy}.{"  "}
                                        </span>
                                      ))}
                                    </>
                                  )}
                                  {cls.antonyms.lenght >= 1 && (
                                    <>
                                      <p className="antonyms">Antonyms : </p>
                                      {cls.antonyms.map((an, anI) => (
                                        <span key={anI}>
                                          {anI + 1}.{an}.{"  "}
                                        </span>
                                      ))}
                                    </>
                                  )}
                                </div>
                              }
                            </div>
                            <div className="meanings">
                              {cls.definitions &&
                                cls.definitions.map((defs, dI) => (
                                  <div key={dI} className="definitions">
                                    <p className="df">
                                      {dI + 1}. {defs.definition}
                                    </p>
                                    {defs.example && (
                                      <p className="examples">
                                        Example : {defs.example}
                                      </p>
                                    )}
                                    {defs.synonyms.length >= 1 && (
                                      <p className="synonyms">
                                        Synonyms :{" "}
                                        {defs.synonyms.map((ds, dsI) => (
                                          <span key={dsI}>
                                            {dsI + 1}.{ds}{" "}
                                          </span>
                                        ))}
                                      </p>
                                    )}
                                    {(defs.antonyms.length >= 1) &&
                                      (
                                        <p className="antonyms">
                                          Antonyms :{" "}
                                          {defs.antonyms.map((da, daI) => (
                                            <span key={daI}>{daI+1}.{da}{" "}</span>
                                          ))}
                                        </p>
                                      )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </section>
                     <p className="counting">
                        {GI + 1}. Result from Source :
                        <span>
                          {groups.sourceUrls.map((urls, uI) => (
                            <span key={uI}>
                              {uI + 1}.
                              <a href={urls}>
                                {" "}
                                {urls}
                                {". "}
                              </a>
                            </span>
                          ))}
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </section>

        {/* <section className="dynamicH orderF">
          <marquee>THOUGHT OF THE DAY HERE </marquee>
        </section> */}
      </main>
    </>
  );
}

export default Dictionary;
