import React from "react";

export const Message = ({ message, users }) => {
  return (
    <div style={styles.message}>
      <strong>
        {message.senderId === users.sender.id ? "You" : users.receiver.name}:
      </strong>{" "}
      {message?.text}
    </div>
  );
};

const styles = {
  message: {
   
    borderBottom: "1px solid lightgray",
    padding: "5px",
  },
};
