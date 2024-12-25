import React from "react";

export const ContactList = ({ users, onSelectUser }) => {
  console.log("Users from contact list ", users);
  return (
    <div style={styles.contactList}>
      <h3>Contacts</h3>
      {users.map((user) => (
        <div
          key={user.id}
          style={styles.contactItem}
          onClick={() => onSelectUser(user)}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
};

const styles = {
  contactList: {
    border: "0.5px #9dc3f6",
    background: "#9dc3f6",
    width: "200px",

    padding: "10px",
  },
  contactItem: {
    padding: "5px",
    cursor: "pointer",
    _hover: "#846faa",
    borderBottom: "1px solid #846faa",
  },
};
