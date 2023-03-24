
import IssueBox from "./components/issueBox";


const StackedBox = ({issues, setIssues}) => {
    
  

    return (
      <>
        {Array.isArray(issues) && issues.map((d,id) => {
            return <IssueBox
            key={id}
            setIssues={setIssues}
            data={d} 
            title={d.title}
            status={d.state}
            body={d.body}
          />
        }) 
        }
      </>
    );
  };
  
  export default StackedBox;