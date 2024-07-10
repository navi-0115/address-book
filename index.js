// DOM Elements
const contactList = document.getElementById("contact-list");
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("add-contact-modal");
const searchInput = document.getElementById("search-input");
const deleteConfirmModal = document.getElementById("delete-contact-modal");
const deleteConfirmButton = document.getElementById("confirm-delete-button");

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
        <td class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex items-center space-x-2">
                <button id="update-contact-button" type="click" contact-id="${contact.id}" data-modal-target="update-contact-modal" data-modal-toggle="update-contact-modal""
                    aria-controls="update-contact-modal"
                    class="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 -ml-0.5" viewbox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fill-rule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clip-rule="evenodd" />
                    </svg>
                    Edit
                </button>
                <button id="delete-contact-button" type="click" contact-id="${contact.id}" data-modal-target="delete-contact-modal" data-modal-toggle="delete-contact-modal"
                    class="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 -ml-0.5" viewbox="0 0 20 20" fill="currentColor"
                        aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clip-rule="evenodd" />
                    </svg>
                    Delete
                </button>
            </div>
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
  const updatedContact = contacts.filter((contact) => contact.id !== id);
  saveContacts(updatedContact);
  return updatedContact;
};

// function to hide contact modal
const hideContactModal = () => {
  contactForm.reset();
  contactModal.classList.remove("block");
  contactModal.classList.add("hidden");
};

// Event listener for contactList update and delete
contactList.addEventListener("click", (event) => {
  const buttonDeleteTarget = event.target;

  // Event listener for delete contact button by contact id
  if (buttonDeleteTarget.id === "delete-contact-button") {
    const contactId = parseInt(
      buttonDeleteTarget.getAttribute("contact-id", 10)
    );
    const deletedContact = deleteContact(contactId);
    renderContacts(deletedContact);
  }
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
