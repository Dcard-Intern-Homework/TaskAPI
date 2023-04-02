import { createContext, useContext, useState, useEffect } from "react";
import useUser from "./userContext";

async function getPrivateIssues(issues, setIssues, page) {
  await fetch("http://localhost:4000/getPrivateIssues?page=" + page, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.total_count > issues.length) {
        data.items &&
          setIssues((prev) => {
            return [...prev, ...data.items];
          });
      }
      console.log(data);
    });
}

async function createIssue({ owner, repo, title, body, state }) {
  const postBody = {
    owner: owner,
    repo: repo,
    title: title,
    body: body,
    state: state,
  };
  console.log(postBody);
  await fetch("http://localhost:4000/createIssue", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function handleScroll(event, issues, setIssues) {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  console.log("scrolling");
  if (scrollHeight - scrollTop === clientHeight) {
    getPrivateIssues(setIssues, issues.length / 10 + 1);
  }
}

async function updateStatus(data, setIssues) {
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
      setIssues((prev) => {
        return [...prev, data];
      });
      console.log(data);
    });
}

const IssueContext = createContext();

function IssueContextProvider({ children }) {
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [renderer, setRenderer] = useState(false);
  const [user, setUser] = useUser();
  useEffect(() => {
    if (user) {
      getPrivateIssues(issues, setIssues, issues.length / 10 + 1);
    }
  }, [user]);

  return (
    <IssueContext.Provider
      value={{
        issues,
        setIssues,
        search,
        setSearch,
        renderer,
        setRenderer,
        user,
        setUser,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

function useIssueContext() {
  const context = useContext(IssueContext);
  if (context === undefined) {
    throw new Error(
      "useIssueContext must be used within a IssueContextProvider"
    );
  }
  return context;
}

export {
  useIssueContext,
  IssueContextProvider,
  updateStatus,
  handleScroll,
  getPrivateIssues,
  createIssue,
};
