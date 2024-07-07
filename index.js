// DOM Elements
const contactList = document.getElementById("contact-list");

// Save contacts to local storage
function saveContacts(contacts) {
  localStorage.setItem("Contacts", JSON.stringify(contacts));
}
// get contacts from local storage
function getContacts() {
  const data = localStorage.getItem("contacts");
  return data ? JSON.parse(data) : [];
}

// Render Contact
function renderContacts() {
  const contacts = getContacts();
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const contactItem = document.createElement("tr");

    contactItem.innerHTML = `
        <td class="px-4 py-4">${contact.name}</td>
        <td class="px-4 py-3">${contact.email}</td>
        <td class="px-4 py-3">${contact.phone}</td>
        <td class="px-4 py-3">${contact.jobTitle}</td>
        <td class="px-4 py-3">${contact.address}</td>
        <td class="px-4 py-3">
          <button class="edit-contact bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
          <button class="delete-contact bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </td>
    `;
    contactList.appendChild(contactItem);
  });
}

// Add Contacts
function addContacts(contact) {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
  renderContacts(contact);
  console.log("Contacts added:", contact);
}

// Search Contacts
function searchContacts(contacts, keyword) {
  const contacts = getContacts();
  const filtered = contacts.filter((contact) =>
    contact.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log("Filtered Contacts:\n");
  renderContacts(filtered);
}

// Main Execution
renderContacts(contacts);

const newContact = {
  id: 4,
  fullName: "Ahmad Cahyadi",
  email: "ahmadc@mail.com",
  phoneNumber: "62888092131232",
  address: "Bantul, DIY",
  jobTitle: "Junior DevOps",
  labels: ["Colleague"],
};
console.log("Updated Contacts:\n");
addContacts(contacts, newContact);

searchContacts(contacts, "SLEMAN");

storeContacts(contacts);
let storedContacts = getContacts();
console.log("Data Contacts:", storedContacts);
