"use client";

import { id, i, init } from "@instantdb/react";
import React, { useState, useEffect } from "react";
import { ContactList } from "./component/ContactList";
import { ChatWindow } from "./component/ChatWindow";

// Your InstantDB App ID
const APP_ID = "8b44f09b-6737-4141-851a-ac0a628c7181";

// Define Schema for Chat App
const schema = i.schema({
  entities: {
    users: i.entity({
      name: i.string(),
      email: i.string(),
      lastSeen: i.number(),
    }),
    messages: i.entity({
      senderId: i.string("users"),
      receiverId: i.string("users"),
      text: i.string(),
      timestamp: i.number(),
    }),
  },
});

const db = init({ appId: APP_ID, schema });

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(true); // Popup state

  // Use the InstantDB hook for querying
  const { isLoading, error, data } = db.useQuery({
    users: {},
    messages: {},
  });

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  // Real-time updates: Subscribe to users and messages
  useEffect(() => {
    if (data) {
      setUsers(data.users || []);
      setMessages(data.messages || []);
    }
  }, [data]);

  // Handle sending a message
  function sendMessage(text) {
    if (!loginUser || !selectedUser) return;
    console.log("Sending message", text);
    db.transact(
      db.tx.messages[id()].update({
        senderId: loginUser.id, // Sender is the logged-in user
        receiverId: selectedUser.id, // Receiver is the selected user
        text,
        timestamp: Date.now(),
      })
    );
  }

  // Loading and Error Handling UI
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error querying data: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Popup for Selecting Logged-In User */}
      {isPopupOpen && (
        <div style={styles.popup}>
          <h3>Select a User to Log In</h3>
          {users.map((user) => (
            <div
              key={user.id}
              style={styles.userItem}
              onClick={() => {
                setLoginUser(user); // Set logged-in user
                setPopupOpen(false); // Close popup
              }}
            >
              {user.name}
            </div>
          ))}
        </div>
      )}

      {/* Main App UI */}
      {loginUser && (
        <>
          <ContactList
            users={users.filter((user) => user.id != loginUser.id)} // Exclude logged-in user
            onSelectUser={setSelectedUser}
          />
          <ChatWindow
            loginUser={loginUser}
            selectedUser={selectedUser}
            users={users}
            messages={messages}
            sendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
  },
  userItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
};

export default App;
