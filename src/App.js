import './App.css';
import React, { useState, useEffect } from "react";
import TableHeader from './components/TableHeader';

function App() {

  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: ""
  });

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleDeleteContact = (id) => {
    if (id) {
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
    }
  };

  const handleHideForm = () => {
    setShowForm(false);
    setNewContact({
      firstName: "",
      lastName: "",
      phone: ""
    });
  };

  const handleInputChange = (e) => {
    setNewContact(prevContact => ({
      ...prevContact,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveContact = () => {
    const { firstName, lastName, phone, email } = newContact;

    if (firstName || lastName || phone) {
      const newContactData = {
        id: Date.now(),
        name: `${firstName || "user did not enter this field"} ${lastName}`,
        email: email || "user did not enter this field",
        phone: phone || "user did not enter this field",
        website: ""
      };

      setContacts(prevContacts => [...prevContacts, newContactData]);
    }

    handleHideForm();
  };


  return (
    <div className='container'>
      <div>
        <table>
          <TableHeader name="имя" mail="почтовый адрес" phone="телефон" remove="удалить запись" />
          <tbody>
            {contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button onClick={() => handleDeleteContact(contact.id)}>Удалить запись</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showForm === false ? (<button onClick={handleShowForm}>Добавить новую запись</button>) : (
          <div className='flexRows'>
            <div className='flexColumns'>
              <input
                type="text"
                name="firstName"
                value={newContact.firstName}
                placeholder="First Name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                value={newContact.lastName}
                placeholder="Last Name"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                value={newContact.phone}
                placeholder="Phone"
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="email"
                value={newContact.email}
                placeholder="Email"
                onChange={handleInputChange}
              />
             
            </div>

            <div className='buttonContainer'>
              <button onClick={handleSaveContact}>Save</button>
              <button onClick={handleHideForm}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
