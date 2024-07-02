const labels = [
  { id: 1, name: "Friend" },
  { id: 2, name: "Family" },
];

const contacts = [
  {
    id: 1,
    fullName: "Alaska Bandar Salju",
    email: "alaska@mail.com",
    phoneNumber: "62888092131232",
    address: "Sleman, DIY",
    jobTitle: "CEO",
    labels: ["Family", "Colleague"],
  },
  {
    id: 2,
    fullName: "Blue Adams",
    email: "adams@mail.com",
    phoneNumber: "62888099912323",
    address: "Sleman, DIY",
    jobTitle: "Cleaner",
    labels: ["Colleague"],
  },
  {
    id: 3,
    fullName: "Owen Hadi",
    email: "owenhadi@mail.com",
    phoneNumber: "6288809990023",
    address: "Surabaya, Jawa Timur",
    jobTitle: "Software Engineer",
    labels: ["Others"],
  },
];

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

renderContacts(contacts);

// ADD CONTACT
function addContact(contacts, newContact) {
  contacts.push(newContact);
  renderContacts(contacts);
}

let newContact = {
  id: 4,
  fullName: "Ahmad Cahyadi",
  email: "ahmadc@mail.com",
  phoneNumber: "62888092131232",
  address: "Bantul, DIY",
  jobTitle: "Junior DevOps",
  labels: ["Colleague"],
};

addContact(contacts, newContact);
