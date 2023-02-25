const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsString = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsString);
  return contacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  const deleteContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  }
  return deleteContact;
};

const addContact = async (body) => {
  const newContact = {
    id: uuid.v4(),
    ...body,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  console.log(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }
  allContacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
