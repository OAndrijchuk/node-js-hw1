import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";
import { program } from "commander";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.table(allContacts);

    case "get":
      const contactById = await getContactById(id);
      return console.log("Знайдено контакт===>>>", contactById);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return console.log("Додано контакт===>>>", newContact);

    case "remove":
      const removedContact = await removeContact(id);
      return console.log("Видалено контакт===>>>", removedContact);

    default:
      console.warn("Ups! We have some trable!!!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();

invokeAction(options);
