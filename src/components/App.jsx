import React, { Component } from "react";
// import { GlobalStyle } from "./Styled/GlobalStyle";
import  { ContactForm } from "./ContactForm/ContactForm";
import  { Filter } from "./FiltrContacts/FiltrContacts";
// import { nanoid } from "nanoid";
import  { ContactList } from "./ContactsList/ContactsList";
import { Container, MainTitle, SubTitle } from "./Styled/App";

export class App extends Component {
	
	state = {
		contacts: [
			{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
			{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
			{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
			{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
		],
		filter: "",
	};

	onSubmitHandler = ({ id, name, number }) => {
		const contact = { id, name, number };
		this.setState(({ contacts }) => {
			return { contacts: [contact, ...contacts] };
		});
	};

	onChangeHandler = (filter) => {
		this.setState((prevState) => {
			return { ...prevState, filter: filter };
		});
	};

	onDeleteHandler = (id) => {
		const filteredContacts = this.state.contacts.filter(
			(contact) => contact.id !== id
		);
		this.setState((prevState) => {
			return { ...prevState, contacts: [...filteredContacts] };
		});
	};

	onFilterContacts = () => {
		let filterContact = [];
		if (this.state.filter) {
			filterContact = this.state.contacts.filter(
				(contact) =>
					contact.name.includes(this.state.filter) ||
					contact.name.toLowerCase().includes(this.state.filter)
			);
		} else {
			return this.state.contacts;
		}
		return filterContact;
	};

	render() {
		const { contacts, filter } = this.state;
		return (
			<Container>

				<MainTitle>Phonebook</MainTitle>
				<ContactForm onSubmit={this.onSubmitHandler} contacts={contacts} />

				<SubTitle>Contacts</SubTitle>
				<Filter onChange={this.onChangeHandler} />
				<ContactList
					contacts={contacts}
					filter={filter}
					onDelete={this.onDeleteHandler}
					filterContacts={this.onFilterContacts}
				/>
			</Container>
		);
	}
}