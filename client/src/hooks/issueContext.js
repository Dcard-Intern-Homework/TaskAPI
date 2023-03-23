import { useState, useEffect } from "react";
import useUser from "./userContext";

async function getPrivateIssues(setIssues) {
  await fetch("http://localhost:4000/getPrivateIssues", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setIssues(data.items);
      console.log(data);
    });
}



function useIssue() {
  const [issues, setIssues] = useState();
  const [user, setUser] = useUser();

  useEffect(() => {
    getPrivateIssues(setIssues);
  }, [user]);

  return [issues, setIssues];
}

async function updateStatus(data){
  await fetch("http://localhost:4000/patchData", {
    method: "PATCH",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
    return data;
}

export {useIssue, updateStatus}

