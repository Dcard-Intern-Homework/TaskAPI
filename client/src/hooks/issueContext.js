import { useState, useEffect } from "react";
import useUser from "./userContext";

async function getPrivateIssues(issues,setIssues,page) {

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
      data.items&&setIssues((prev)=>{
        return [...prev,...data.items]
      });
      console.log(data)
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
    
    getPrivateIssues(issues,setIssues,issues.length / 10 + 1);
  }, []);
  

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
