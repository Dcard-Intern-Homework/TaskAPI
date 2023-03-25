import IssueBox from "./components/issueBox";
import {useState } from 'react'
import ButtonNav from "./components/buttonNav";
import { Box } from "@mui/material"
const StackedBox = ({ issues }) => {

  const [filter, setFilter] = useState(0);

  
  return (
    <Box >
      <ButtonNav filter={filter} setFilter={setFilter} />
      {Array.isArray(issues) &&
        issues.filter((d)=>{
          if(filter === 0){
            return d
          } else if(filter === 1) {
            if(d.labels[0])
              return d.labels[0].name === "Open"
            else 
              return d;
          } else if(filter === 2) {
            if(d.labels[0])
              return d.labels[0].name === "In Progress"
            else 
              return d;
          } else if(filter === 3) {
            if(d.labels[0])
              return d.labels[0].name === "Done"
            else 
              return d;
          }
        }).map((d, id) => {
          return (
            <IssueBox
              key={id}
              data={d}
              title={d.title}
              status={d.state}
              body={d.body}
              labels={d.labels}
            />
          );
        })}
    </Box>
  );
};

export default StackedBox;
