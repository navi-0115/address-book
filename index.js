// DOM Elements
const contactList = document.getElementById("contact-list");
const contactForm = document.getElementById("contact-form");
const contactModal = document.getElementById("add-contact-modal");
const searchInput = document.getElementById("search-input");
const deleteConfirmModal = document.getElementById("delete-contact-modal");
const deleteConfirmButton = document.getElementById("confirm-delete-button");
const updateContactModal = document.getElementById("update-contact-modal");

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

// Get contact value by id from contact-id
const getContactById = (id) => {
  const contacts = getContacts();
  return contacts.find((contact) => contact.id === id);
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
        <td class="px-4 py-3">${contact.job}</td>
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
                <button id="delete-contact-button" type="click" contact-id="${contact.id}"
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

// Render contact by id to for edit feature
function renderEditContactsFormById(id) {
  const contact = getContactById(id);

  if (!contact) {
    Swal.fire;
    "Error", "Contact not found!", "error";
  }
  updateContactModal.setAttribute("selected-contact-id", id);
  updateContactModal.querySelector(".update-contact-body").innerHTML = `
      <form id="update-contact-form">
      <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Type name" required
                value= "${contact.name}" />
        </div>
        <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" name="email" id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Email" required
                value= "${contact.email}" />
        </div>
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input type="number" name="phone" id="phone"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="088812345678" required
                value= "${contact.phone}" />
        </div>
        <div>
            <label for="job" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Job Title</label>
            <input type="text" name="job" id="job"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Software Engineer"
                value= "${contact.job}" />
        </div>
        <div class="sm:col-span-2">
            <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
            <textarea name="address" id="address" rows="2"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Write the address here">${contact.address}</textarea>
        </div>
      </div>
      <div class="flex items-center space-x-4">
          <button type="submit"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update
              contact
          </button>
      </div>
    </form>
  `;

  const updateContactForm = document.getElementById("update-contact-form");
  updateContactForm.addEventListener("submit", editContact);
}

// Add Contact
const addContact = (contact) => {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
  return contacts;
};

// Edit contact function will run if edit button is clicked
const editContact = (event) => {
  event.preventDefault();
  const contacts = getContacts();

  const contactFormData = new FormData(event.target);

  // Parse into integer when get selected-contact-id id
  const contactId = parseInt(
    updateContactModal.getAttribute("selected-contact-id"),
    10
  );

  const newContact = {
    id: contactId,
    name: contactFormData.get("name"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone"),
    job: contactFormData.get("job"),
    address: contactFormData.get("address"),
  };
  // Update contact using map by find id
  const updatedContact = contacts.map((contact) => {
    if (contact.id === newContact.id) {
      return newContact;
    } else {
      return contact;
    }
  });
  saveContacts(updatedContact);
  renderContacts();

  // Swal popups when click submit "update contact"
  Swal.fire({
    title: "Success!",
    text: "Contact has been updated",
    icon: "success",
    confirmButtonText: "OK!",
    confirmButtonColor: "#0080fe",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace("/");
      updateContactModal.classList.remove("block");
      updateContactModal.classList.add("hidden");
    }
  });
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
  const buttonTarget = event.target;

  // Event listener for delete contact button by contact id
  if (buttonTarget.id === "delete-contact-button") {
    const contactId = parseInt(buttonTarget.getAttribute("contact-id", 10));
    // Delete confirmation popup
    Swal.fire({
      title: "Delete confirmation!",
      text: "Are you sure you want to delete this contact?",
      icon: "warning",
      cancelButtonText: `Cancel`,
      confirmButtonText: "Yes, I'm sure!",
      showCancelButton: true,
      confirmButtonColor: "#808080",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "The contact has been deleted.",
          icon: "success",
          confirmButtonText: "OK!",
          confirmButtonColor: "#0080fe",
        });
        const deletedContact = deleteContact(contactId);
        renderContacts(deletedContact);
      }
    });
  }

  if (buttonTarget.id === "update-contact-button") {
    const contactId = parseInt(buttonTarget.getAttribute("contact-id"), 10);
    renderEditContactsFormById(contactId);
  }
});

// Event Listener for Add Contact Form
contactModal.addEventListener("submit", (event) => {
  event.preventDefault();
  const contacts = getContacts();
  const contactId = contacts.length ? contacts[contacts.length - 1].id + 1 : 1;

  const contactFormData = new FormData(contactForm);
  const newContact = {
    id: contactId,
    name: contactFormData.get("name"),
    email: contactFormData.get("email"),
    phone: contactFormData.get("phone-number"),
    job: contactFormData.get("job"),
    address: contactFormData.get("address"),
  };

  // Add contact swal popups when submit "save contact"
  Swal.fire({
    title: "Success!",
    text: "Contact has been added",
    icon: "success",
    confirmButtonText: "OK!",
    confirmButtonColor: "#0080fe",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.replace("/");
    }
  });
  addContact(newContact);
  hideContactModal();
  renderContacts();
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
