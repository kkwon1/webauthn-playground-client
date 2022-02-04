import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState("");

  const handleClick = () => {
    if (username !== "") {
      axios
        .post("http://localhost:8080/register", {
          Username: username,
        })
        .then((response) => {
          response.data.authenticatorSelection = {
            requireResidentKey: false,
            userVerification: "discouraged",
          };
          response.data.challenge = Uint8Array.from(response.data.challenge);
          response.data.user.id = Uint8Array.from(response.data.user.id);
          response.data.timeout = 60000;
          return navigator.credentials.create({
            publicKey: response.data,
          });
        })
        .then((response) => {
          console.log(response);
          setRegistered(true);
        });
    } else {
      console.log("Please enter valid username");
    }
  };
  return (
    <div className="App">
      <div>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
            />
          </label>
        </form>
        <button onClick={handleClick}>Register</button>
        <div>
          {registered ? `Username ${username} Registered Successfully!` : ""}
        </div>
      </div>
    </div>
  );
};

export default App;
