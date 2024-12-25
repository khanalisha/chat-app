import React, { useState } from "react";

export const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  return (
    <div style={styles.inputContainer}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.input}
        placeholder="Type a message"
      />
      <button
        style={styles.button}
        onClick={() => {
          if (text.trim()) {
            onSend(text);
            setText("");
          }
        }}
      >
        Send
      </button>
    </div>
  );
};

// const styles = {
//   inputContainer: {
//     display: "flex",
//     alignItems: "center",
//     padding: "10px 0",
//   },
//   input: {
//     flex: 1,
//     padding: "5px",
//     marginRight: "10px",

//     borderRadius: "10px 10px 10px 10px",
//   },
//   button: {
//     borderRadius: "10px 10px 10px 10px",
//   },
// };

const styles = {
  inputContainer: {
    display: "flex",
    alignItems: "center",

    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    margin: "10px 10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
    outline: "none",
    marginRight: "10px",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#9dc3f6",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

// Add hover effects
styles.input[":focus"] = {
  borderColor: "#4caf50",
};

styles.button[":hover"] = {
  backgroundColor: "#45a049",
};
