import fs from 'fs/promises'
import path from 'path'
import {nanoid} from "nanoid";

const contactsPath = path.resolve("models", "contacts.json")

const updateContactsStorage = contact => fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
    // ...твій код. Повертає масив контактів.
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data)
  }
  
const getContactById = async (contactId) => {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    const contacts = await listContacts()
    const result = contacts.find(contact => contact.id === contactId )
  
    return result
  }
  
const removeContact = async (contactId) => {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

    const contacts = await listContacts()
    const result = contacts.find( contact => contact.id === contactId ) 
    if(!result){
      return result
    }
    const newArray = contacts.filter( contact => contact.id !== contactId ) 

    await updateContactsStorage(newArray)
    return result
  }

    const addContact = async ({name, email, phone}) => {
    // ...твій код. Повертає об'єкт доданого контакту.
    const newArray = await listContacts()
    const newContact = {
        id:nanoid(),
        name,
        email,
        phone,
    };

    newArray.push(newContact)

    await updateContactsStorage(newArray)
    return newContact
  }

    const updateContact = async (contactId, data) => {
      const contacts = await listContacts()

      const result = contacts.find( contact => contact.id === contactId ) 
          if(!result){
            return result
          }

      let putContact = null
      const newArray = await contacts.map(contact => 
        { if(contact.id === contactId){
          putContact = {...contact,...data}
          return contact = {...contact,...data}
        }
        return contact
      }
      )
      await updateContactsStorage(newArray)
      return putContact
    }

const todoActions = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

export default todoActions
