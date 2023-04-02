// Import necessary dependencies
import { createContext, useContext, useState, useEffect } from "react";
import useUser from "./userContext";

/*--------------Some Functions Utils-------------*/

// Async function to get authenticated user's private issues
async function getPrivateIssues(issues, setIssues, page) {
  // Fetch the issues from backend API
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
      // If there are more issues, add them to the state
      if (data.total_count > issues.length) {
        data.items &&
          setIssues((prev) => {
            return [...prev, ...data.items];
          });
      }
      console.log(data);
    });
}

// Async function to create a new issue and post it to the backend
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

// Function to handle delay loading, the tasks will be loaded while scrolling to bottom
function handleScroll(event, issues, setIssues) {
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  console.log("scrolling");
  if (scrollHeight - scrollTop === clientHeight) {
    getPrivateIssues(setIssues, issues.length / 10 + 1);
  }
}

// Async function to update the issues and patch it from the backend server
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
/*------------issue context ----------- */
// create a new context for the issue data
const IssueContext = createContext();

// define a provider component that wraps the app and provides access to the issue data through context
function IssueContextProvider({ children }) {
  // set up state for issues, search input, renderer, and user
  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [renderer, setRenderer] = useState(false);
  const [user, setUser] = useUser(); // assume this is a custom hook that gets the currently logged in user

  // when the user changes, fetch private issues for the user
  useEffect(() => {
    if (user) {
      getPrivateIssues(issues, setIssues, issues.length / 10 + 1); // assume this is a function that fetches private issues for a given user and page number
    }
  }, [user]);

  // wrap children in the IssueContext.Provider component and provide the issue data and setters as context
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

// define a custom hook that can be used to access the issue data through context
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
