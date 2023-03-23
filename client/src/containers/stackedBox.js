
import IssueBox from "./components/issueBox";
import {useIssue} from "../hooks/issueContext"

const StackedBox = () => {
    
  const [issues, setIssues] = useIssue();

    return (
      <>
        {issues && issues.map((d,id) => {
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