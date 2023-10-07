import fs from "fs/promises";
import path from "path";
import languageEncoding from "detect-file-encoding-and-language";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const { encoding } = await languageEncoding(contactsPath);

export async function listContacts() {
  // Повертає масив контактів.
  try {
    const data = await fs.readFile(contactsPath, encoding);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  //Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const findedContact = contacts.find((contact) => contact.id === contactId);
    return findedContact || null;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(data) {
  //Повертає об'єкт доданого контакту.
  try {
    const newContact = { id: nanoid(), ...data };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact || null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  //Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    console.log(index);
    if (index === -1) {
      return null;
    }
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } catch (error) {
    console.log(error);
  }
}
