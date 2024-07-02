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
    address: "Jl. Bikini Bottom",
    jobTitle: "CEO",
    labels: [labels[0]],
  },
  {
    id: 2,
    fullName: "Blue Adams",
    email: "adams@mail.com",
    phoneNumber: "62888099912323",
    address: "Jl. Pasific Ocean",
    jobTitle: "Cleaner",
    labels: [labels[0]],
  },
  {
    id: 3,
    fullName: "Owen Hadi",
    email: "owenhadi@mail.com",
    phoneNumber: "6288809990023",
    address: "Jl. Merdeka Raya",
    jobTitle: "Software Engineer",
    label: [labels[0]],
  },
];
console.log([labels, contacts]);
