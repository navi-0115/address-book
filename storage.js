function storeContacts(contacts) {
  localStorage.setItem("Contacts", JSON.stringify(contacts));
}

function getContacts() {
  let data = localStorage.getItem("contacts");
  return data ? JSON.parse(data) : [];
}

storeContacts(contacts);
let storedContacts = getContacts();
console.log("Data Contacts:", storedContacts);
