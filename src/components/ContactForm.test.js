import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText(/contact form/i);
  expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput, "Mari"); 
    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const button = screen.getByRole("button");
    userEvent.click(button);
    const errors = await screen.findAllByTestId("error");
    expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Marius");
    const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Moldov");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const err = await screen.findByTestId(/error/i);
    expect(err).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput,"Mari");
    const err = await screen.findByTestId(/error/i);
    expect(err).toHaveTextContent("email must be a valid email address");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Marius");
    const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput,"somenting@gmail.com");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const err = await screen.findByTestId(/error/i);
    expect(err).toHaveTextContent("lastName is a required field");
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Marius");
    const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Moldo");
    const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput,"somenting@gmail.com");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const fSubmitted = await screen.findByTestId("firstnameDisplay");
    const sSubmitted = await screen.findByTestId("lastnameDisplay");
    const tSubmitted = await screen.findByTestId("emailDisplay");
    const bSubmitted = await screen.queryByTestId("messageDisplay");
    expect(fSubmitted).toBeInTheDocument();
    expect(sSubmitted).toBeInTheDocument();
    expect(tSubmitted).toBeInTheDocument();
    expect(bSubmitted).not.toBeInTheDocument();
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstInput = screen.getByLabelText("First Name*");
    userEvent.type(firstInput,"Marius");
    const secondInput = screen.getByLabelText("Last Name*");
    userEvent.type(secondInput,"Moldovan");
    const thirdInput = screen.getByLabelText("Email*");
    userEvent.type(thirdInput,"somenting@gmail.com");
    const fourthInput = screen.getByLabelText("Message");
    userEvent.type(fourthInput,"somenting");
    const button = screen.getByRole("button");
    userEvent.click(button);
    const fSubmitted = await screen.findByTestId("firstnameDisplay");
    const sSubmitted = await screen.findByTestId("lastnameDisplay");
    const tSubmitted = await screen.findByTestId("emailDisplay");
    const bSubmitted = await screen.findByTestId("messageDisplay");
    expect(fSubmitted).toBeInTheDocument();
    expect(sSubmitted).toBeInTheDocument();
    expect(tSubmitted).toBeInTheDocument();
    expect(bSubmitted).toBeInTheDocument();
});