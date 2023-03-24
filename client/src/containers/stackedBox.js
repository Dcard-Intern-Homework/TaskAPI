import IssueBox from "./components/issueBox";

const StackedBox = ({ issues }) => {
  return (
    <>
      {Array.isArray(issues) &&
        issues.map((d, id) => {
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
    </>
  );
};

export default StackedBox;
