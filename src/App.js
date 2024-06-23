import { faBookAtlas, faCommenting, faSearch, faToggleOff, faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useState } from "react";
import Dictionary from "./Dictionary";
function App() {
  console.log("App rendered");

  return (
    <div className="App">
      <div className="content">
      <header>
        <p className="brand">
          <span>
            WORD<b>Z</b>WI<b>Z</b>
            <b>Z</b>ARD
          </span>
          <span className="logo ">
            <b><FontAwesomeIcon icon={faBookAtlas} /></b>
          </span>
        </p>
      </header>
      <div id="cursor-circle"></div>
<Dictionary />
      <footer>
        <p className="cal orange orderF">
          Find meanings !
          <span className="gold">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </p>
        <p className="cal orange">
          Translate (coming soon)
          <span className="gold">
            <FontAwesomeIcon icon={faCommenting} />
          </span>
        </p>
      </footer>
      </div>
    </div>
  );
}

export default App;
