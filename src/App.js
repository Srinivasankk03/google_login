import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
function App() {
  const [user, setUser] = useState({});
  function handleCallBackResponse(ressponse) {
    console.log("encoded JWT id token" + ressponse.credential);
    var userObject = jwt_decode(ressponse.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "718433997603-agi1nb2ee8h93p83rqsraqjr7qbm4hmm.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  function handleSignOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={handleSignOut}>Sign Out</button>
      )}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h2>{user.name}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
