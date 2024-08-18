import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    console.log(`Clicked On Item With ID : ${id}`);
    setItems((items)=>
      items.filter((item)=>item.id!==id)
    );
  }

  function handleCheckItem(id) {
    console.log(`Item Checked Is : ${id}`);
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  

  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems}/>
      <PackingList items={items} onDeleteItem = {handleDeleteItem} onCheckedItem = {handleCheckItem}/>
      <Stats />
    </>
  );
}

function Logo() {
  return <h1>Far Away</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items,setItems] = useState([]);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder='"Item ...'
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function Item({ item , onDeleteItem , onCheckedItem}) {

  

  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=>onCheckedItem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={()=>{onDeleteItem(item.id)}}>❌</button>
    </li>
  );
}

function PackingList({items , onDeleteItem, onCheckedItem}) {

  return (
    <div className="list">
      <ul>
        {items.map((item, index) => {
          return <Item item={item} key={index} onDeleteItem = {onDeleteItem} onCheckedItem={onCheckedItem}/>;
        })}
      </ul>
    </div>
  );
}

function Stats() {
  return (
    <footer className="stats">
      You hav X items on your list, and you already packed X (X%)
    </footer>
  );
}

export default App;
