import { useState, useEffect } from "react";

// Define a function that gets user data from the server
async function getUserData(setUser) {
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

// Define a custom hook that returns the user and setUser state variables
export default function useUser() {
  const [user, setUser] = useState();
  const [renderer, setRenderer] = useState(false);

  // Use the useEffect hook to get the access token from the URL query parameters
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParams = urlParams.get("code");
    console.log(codeParams);

    // If the access token has not been stored in localStorage and the code parameter exists, get the access token
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
            // If the access token is retrieved, store it in localStorage and set the renderer state variable to force a re-render
            if (data.access_token) {
              localStorage.setItem("access_token", data.access_token);
              setRenderer(!renderer);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  // Use the useEffect hook to get the user data from the server whenever the renderer state variable changes
  useEffect(() => {
    getUserData(setUser);
  }, [renderer]);

  // Return the user and setUser state variables as an array
  return [user, setUser];
}
