import React from 'react';
import './App.css';

function App() {
  const items = ['apples', 'bananans', 'mangos', 'oranges'];
  const obj = 'apples';
  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>My To-Do List</h1>
        <Login />
        <AddItem />
        <h3>Things To Do</h3>
        {items.map(listItem => {
          return (<ListItem item={listItem}/>);
        })}
      </header>
      
    </div>
    </>
  );
}

type AppProps = {
  item: string;
}

const ListItem = ({ item }: AppProps) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
  <div>
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      {item}
    </label>
  </div>
  );
}

function AddItem() {
  function handleSubmit (e: React.SyntheticEvent) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    const target = e.target as typeof e.target & {
      item: { value: string };
    };
    const item = target.item.value; // typechecks!
    console.log(item);
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
}

function Login() {
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
