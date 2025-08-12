import spinner from "./assets/spinner.webp";

function Spinner() {
  return (
    <img
      src={spinner}
      alt="loading-gif"
      style={{
        width: "30%",
        height: "30%",
        display: "block",
        margin: "50px auto",
      }}
    />
  );
}

export default Spinner;
