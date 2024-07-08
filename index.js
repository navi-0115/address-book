// DOM Elements
const contactList = document.getElementById("contact-list");
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("contact-modal");

// Save contacts to local storage
const saveContacts = (contacts) => {
  try {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } catch (error) {
    console.log("Could not save contacts to local storage");
  }
};
// get contacts from local storage
const getContacts = () => {
  try {
    const contacts = localStorage.getItem("contacts");
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.log("Could not get contacts from local storage");
  }
};

// Render Contact
const renderContacts = () => {
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
};

// Add Contacts
const addContact = (contact) => {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
  return contacts;
};

// Search Contacts
const searchContacts = (contact, keyword) => {
  const contacts = getContacts();
  const filtered = contacts.filter((contact) =>
    contact.toLowerCase().includes(keyword.toLowerCase())
  );
  console.log("Filtered Contacts:\n", contact);
  renderContacts(filtered);
};

// Event Listener for Add Contact Form
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newContact = {
    name: contactForm.elements["name"].value,
    email: contactForm.elements["email"].value,
    phone: contactForm.elements["phone-number"].value,
    jobTitle: contactForm.elements["job"].value,
    address: contactForm.elements["address"].value,
  };

  addContact(newContact);
  renderContacts();
  contactForm.reset();
  contactModal.classList.add("hidden");
});

// initialize to display existing data
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
