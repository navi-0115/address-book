// DOM Elements
const contactList = document.getElementById("contact-list");
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("add-contact-modal");
const searchInput = document.getElementById("search-input");
const deleteModal = document.getElementById("delete-modal");

// Save contacts to local storage
const saveContacts = (contacts) => {
  try {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  } catch (error) {
    console.log("Could not save contacts to local storage", error);
  }
};
// get contacts from local storage
const getContacts = () => {
  try {
    const contacts = localStorage.getItem("contacts");
    return contacts ? JSON.parse(contacts) : [];
  } catch (error) {
    console.log("Could not get contacts from local storage", error);
    return [];
  }
};

// Render Contact
const renderContacts = (specificRenderContacts) => {
  const contacts = specificRenderContacts || getContacts();
  contactList.innerHTML = "";
  contacts.forEach((contact) => {
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
const searchContacts = (query) => {
  const contacts = getContacts();
  const filtered = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );
  return filtered;
};

const deleteContact = (id) => {
  const contacts = getContacts();
  const removeContact = contacts.filter((contact) => contact.id !== id);
  saveContacts(removeContact);
  return removeContact;
};

// function to hide contact modal
const hideContactModal = () => {
  contactForm.reset();
  contactModal.classList.remove("block");
  contactModal.classList.add("hidden");
};

// Event listener for delete contact form
deleteModal.addEventListener("submit", (event) => {
  const contacts = getContacts();
  const deletedContact = deleteContact(contacts);
  renderContacts(deletedContact);
});

// Event Listener for Add Contact Form
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const contacts = getContacts();
  const contactId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

  const newContact = {
    id: contactId,
    name: contactForm.elements["name"].value,
    email: contactForm.elements["email"].value,
    phone: contactForm.elements["phone-number"].value,
    jobTitle: contactForm.elements["job"].value,
    address: contactForm.elements["address"].value,
  };

  addContact(newContact);
  renderContacts();
  hideContactModal();
});

// Event listener for searching contacts, then callback renderContacts on specificRenderContacts param
searchInput.addEventListener("input", (event) => {
  const query = event.target.value;
  const filteredContact = searchContacts(query);
  renderContacts(filteredContact);
});

// initialize to display existing data
document.addEventListener("DOMContentLoaded", () => {
  renderContacts();
});
