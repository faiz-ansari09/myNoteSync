import Notes from "./Notes";

export const Home = (props) => {
  // Function to show alert
  const { showAlert } = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};
