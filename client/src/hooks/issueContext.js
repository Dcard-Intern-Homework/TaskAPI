import { useState, useEffect } from "react";
import useUser from "./userContext";

async function getPrivateIssues(setIssues,page) {
  
  await fetch("http://localhost:4000/getPrivateIssues?page="+page, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setIssues((prev)=>{
        return [...prev,...data.items]
      });
      
    });
}

function handleScroll(event, issues, setIssues){
  const target = event.target;
  console.log(target)
  if(target.scrollHeight = target.scrollTop === target.clientHeight){
      getPrivateIssues(setIssues, issues.length / 10 + 1)
  }
}

function useIssue() {
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useUser();
  
  useEffect(() => {
    
    getPrivateIssues(setIssues,issues.length / 10 + 1);
  }, [user]);
  

  return [issues, setIssues];
}

async function updateStatus(data) {
  await fetch("http://localhost:4000/patchData", {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // setIssues(data.items);
      console.log(data);
    });
}

export { useIssue, updateStatus, handleScroll };
