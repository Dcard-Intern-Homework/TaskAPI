const MainPage = ({handleLogOut,getUserData }) =>{

    
    return(
        <>
        <h1> We have the access_token
          </h1>
          <button onClick={handleLogOut}>
            Log out
          </button>
          <h3>Get user data from github api</h3>
          <button onClick={getUserData}>get</button>
        </>
    )
}


export default MainPage;