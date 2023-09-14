import "../styles/main.scss";
import arrow from "../assets/Arrow.png";

function EmptyComponent({ sendMessage, setNewMessage }) {
  return (
    <div style={{ width: "70%", margin: "50px auto" }}>
      <h1 className="dash-title">
        Let's Explore <span style={{ color: "#246aee" }}>ChainQ</span>
      </h1>
      <div className="common-que-flex">
        <div style={{ width: "50%", flexDirection: "column", display: "flex" }}>
          <div
            style={{
              fontFamily: "BeVietnamPro-SemiBold",
              fontSize: "20px",
              paddingBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Prompts example
          </div>
          <p
            className="empty-que"
            onClick={() => {
              setNewMessage("");
              sendMessage();
            }}
          >
            How many total transactions for block 54075718?
            <img src={arrow} style={{ width: "25px", padding: "10px" }}></img>
          </p>
          <p className="empty-que">
            And list all the transaction hashes?{" "}
            <img src={arrow} style={{ width: "25px", padding: "10px" }}></img>
          </p>
          <p className="empty-que">
            Can you give me more information about the same block?
            <img src={arrow} style={{ width: "25px", padding: "10px" }}></img>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmptyComponent;
