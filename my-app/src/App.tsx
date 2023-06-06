import React from 'react';
import { useState } from 'react';
import { Dispatch, SetStateAction } from "react";
import './App.css';

const backendAddress = '';
type JSONValue = { [x: string]: boolean };

function App() {
  const [items, setItems] = useState<JSONValue>({});
  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>My To-Do List</h1>
        <Login setItems={setItems}/>
        <AddItem setItems={setItems}/>
        <DeleteItem setItems={setItems}/>
        <h3>Things To Do</h3>
        {Object.keys(items).map((listItem, i) => {
          return (<ListItem item={listItem} items={items} setItems={setItems}/>);
        })}
      </header>
      
    </div>
    </>
  );
}

type Item = {
  item: string;
  items: JSONValue,
  setItems: Dispatch<SetStateAction<JSONValue>>
}

type IProps = {
  setItems: Dispatch<SetStateAction<JSONValue>>
}

const ListItem = ({ item, items, setItems }: Item) => {

  const handleChange = () => {
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: item })
    };

    fetch(`${backendAddress}/toggleItem`, postRequest)
      .then(response => {return response.json();})
      .then(data => {console.log(data); return data;})
      .then(data => setItems(data));
  };

  return (
  <div>
    <label>
      <input
        type="checkbox"
        checked={items[item]}
        onChange={handleChange}
      />
      {item}
    </label>
  </div>
  );
}

const AddItem = ({setItems}: IProps) => {
  function handleSubmit (e: React.SyntheticEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const target = e.target as typeof e.target & {
      item: { value: string };
    };
    const item = target.item.value; // typechecks!
    console.log(item);
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: item })
    };

    fetch(`${backendAddress}/addItem`, postRequest)
      .then(response => {return response.json();})
      .then(data => {console.log(data); return data;})
      .then(data => setItems(data));
  }
  return (
  <form onSubmit={handleSubmit}>
    <label>
      {'Add Item: '}
      <input type="text" name="item" />
    </label>
    <br />
    <input type="submit" value="Submit" />
  </form>
  );
};

function DeleteItem({setItems}: IProps) {
  function handleSubmit (e: React.SyntheticEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const target = e.target as typeof e.target & {
      item: { value: string };
    };
    const item = target.item.value; // typechecks!
    console.log(item);
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: item })
    };

    fetch(`${backendAddress}/deleteItem`, postRequest)
    .then(response => response.json())
    .then(data => {console.log(data); return data;})
    .then(data => setItems(data));
  }
  return (
  <form onSubmit={handleSubmit}>
    <label>
      {'Delete Item: '}
      <input type="text" name="item" />
    </label>
    <br />
    <input type="submit" value="Submit" />
  </form>
  );
}

function Login({setItems}: IProps) {
  function handleSubmit (e: React.SyntheticEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value; // typechecks!
    const password = target.password.value; // typechecks!
    console.log(username);
    console.log(password);
    const postRequest = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };

    fetch(`${backendAddress}/login`, postRequest)
      .then(response => {return response.json();})
      .then(data => {console.log(data); return data;})
      .then(data => setItems(data));
  }
  return (
  <form onSubmit={handleSubmit}>
    <label>
      {'Username: '}
      <input type="text" name="username" />
    </label>
    <br />
    <label>
      {'Password: '}
      <input type="text" name="password" />
    </label>
    <br />
    <input type="submit" value="Submit" />
  </form>
  );
}
export default App;
