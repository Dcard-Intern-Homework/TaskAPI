import { useEffect, useState } from "react";
import LoginPage from "./pages/loginPage"
import MainPage from "./pages/mainPage"
const CLIENT_ID = "4b7feddfcd88aa615d89";

function App() {
  const [renderer, setRenderer] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    if (codeParams && localStorage.getItem("access_token") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParams, {
          method: "GET",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("access_token", data.access_token);
              setRenderer(!renderer);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    })
      .then((response) => {
        
        return response.json();
      })
      .then((data) => {
        setUser(data);
        console.log(data);
      });
  }

  function loginWithGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  }

  function handleLogOut() {
    localStorage.removeItem("access_token"); setRenderer(!renderer);
  }

  return (
    <div>
      {localStorage.getItem("access_token") ? (
        
        <MainPage handleLogOut={handleLogOut} getUserData={getUserData}/>
        
        
      ) : (
        <LoginPage loginWithGithub={loginWithGithub} />
      )}
    </div>
  );
}

export default App;
