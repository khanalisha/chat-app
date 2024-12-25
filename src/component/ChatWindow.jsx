import React from "react";
import { Message } from "./Message";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({
  selectedUser,
  loginUser,
  messages,
  sendMessage,
}) => {
  if (!selectedUser) {
    return (
      <div style={styles.chatWindow}>Select a user to start chatting.</div>
    );
  }
  console.log("login user", loginUser);
  return (
    <div style={styles.chat}>
      <h3>Chat with {selectedUser?.name}</h3>
      <div style={styles?.messages}>
        {messages &&
          messages.length > 0 &&
          messages
            .filter(
              (msg) =>
                (msg.senderId === loginUser.id &&
                  msg.receiverId === selectedUser.id) ||
                (msg.receiverId === loginUser.id &&
                  msg.senderId === selectedUser.id)
            )
            .map((msg) => (
              <Message
                key={msg.id}
                message={msg}
                users={{ sender: loginUser, receiver: selectedUser }}
              />
            ))}
      </div>
      <MessageInput
        onSend={(text) => {
          sendMessage(text);
        }}
      />
    </div>
  );
};

const styles = {
  chatWindow: {
    background: "#dfa7e4",
    flex: 1,
    padding: "10px",
    borderLeft: "1px solid gray",
    textAlign: "center", // Centers the text horizontally
    fontSize: "32px",
    fontWeight: "bold", // Makes the text bold
    display: "flex", // Ensures proper centering
    justifyContent: "center", // Centers the content horizontally
    alignItems: "center", // Centers the content vertically
  },
  chat: {
    flex: 1,
    padding: "10px",
    borderLeft: "1px solid gray",
    background: "#dfa7e4",
  },
  messages: {
    maxHeight: "400px",
    overflowY: "scroll",
    marginBottom: "10px",

    // Hide scrollbar for WebKit browsers (Chrome, Edge, Safari)
    "&::-webkit-scrollbar": {
      display: "none",
    },

    // Hide scrollbar for Firefox
    scrollbarWidth: "none",

    // Hide scrollbar for Internet Explorer and Edge (legacy)
    msOverflowStyle: "none",
  },
};
