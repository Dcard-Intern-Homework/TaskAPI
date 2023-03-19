
import IssueBox from "./components/issueBox";
const StackedBox = ({ data }) => {
    
    return (
      <>
        {data.map((d,id) => {
            <IssueBox
            key={id}
            user={d}
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