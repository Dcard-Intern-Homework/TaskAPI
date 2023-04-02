// This function redirects the user to the GitHub login page using OAuth.
// It retrieves the client ID from localStorage.
export default function loginWithGithub() {
  const CLIENT_ID = localStorage.getItem("CLIENT_ID");
  window.location.assign(
    "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
  );
}
