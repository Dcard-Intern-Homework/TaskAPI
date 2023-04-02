import { useState, useEffect } from "react";
import { useIssueContext } from "./issueContext";

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

export default function useUser() {
  const [user, setUser] = useState();
  const [renderer, setRenderer] = useState(false);

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

  useEffect(() => {
    getUserData(setUser);
  }, [renderer]);

  return [user, setUser];
}
