const labels = [
  { id: 1, name: "Friend" },
  { id: 2, name: "Family" },
];

const contacts = [];

// Render Contact
function renderContacts(contacts) {
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    const labelOutput = contact.labels.join("");

    console.log(`
       Fullname   :  ${contact.fullName}
       Email      :  ${contact.email}
       Phone      :  ${contact.phoneNumber}
       Address    :  ${contact.address}
       Job Title  :  ${contact.jobTitle}
       Label      :  ${contact.labels}`);
  }
}

// Add Contacts
function addContacts(contacts, newContact) {
  contacts.push(newContact);
  renderContacts(contacts);
}

// Search Contacts
function searchContacts(contacts, keyword) {
  lowerKeywords = keyword.toLowerCase();
  const results = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(lowerKeywords) ||
      contact.email.toLowerCase().includes(lowerKeywords) ||
      contact.phoneNumber.toLowerCase().includes(lowerKeywords) ||
      contact.address.toLowerCase().includes(lowerKeywords)
  );
  console.log("Filtered Contacts:\n");
  renderContacts(results);
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
