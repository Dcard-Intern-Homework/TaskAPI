import IssueBox from "./components/issueBox";
import { useState, useEffect } from "react";
import ButtonNav from "./components/buttonNav";
import { Box } from "@mui/material";
import { useIssueContext } from "../hooks/issueContext";
const StackedBox = () => {
  const { issues, setIssues, search } = useIssueContext();

  const [filter, setFilter] = useState(0);

  return (
    <Box>
      <ButtonNav filter={filter} setFilter={setFilter} />
      {issues
        .filter((d) => {
          if (filter === 0) {
            if (d.labels[0]) return true;
          } else if (filter === 1) {
            if (d.labels[0]) return d.labels[0].name === "Open";
            else return false;
          } else if (filter === 2) {
            if (d.labels[0]) return d.labels[0].name === "In Progress";
            else return false;
          } else if (filter === 3) {
            if (d.labels[0]) {
              return d.labels[0].name === "Done";
            } else return false;
          }
          return false;
        })
        .filter((d) => {
          return (
            d.body.includes(search) === true ||
            d.title.includes(search) === true
          );
        })
        .map((d, id) => {
          return <IssueBox key={id} data={d} filter={filter} />;
        })}
    </Box>
  );
};

export default StackedBox;
