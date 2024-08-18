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
      <Stats items={items}/>
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

  const[sortBy, setSortBy] = useState("input");

  let sortedItems;

  if(sortBy=='input') sortedItems = items;
  if(sortBy=='description') sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description));
  if(sortBy=='packed') sortedItems = items
    .slice()
    .sort((a, b) => Number(a.packed)-Number(b.packed));
  

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => {
          return (
            <Item
              item={item}
              key={index}
              onDeleteItem={onDeleteItem}
              onCheckedItem={onCheckedItem}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort By packed status</option>
        </select>
      </div>
    </div>
  );
}

function Stats({items}) {
  if(items.length==0){
    return (
      <footer className="stats">
        Start listing items to pack! 🧳
      </footer>
    );
  }
  
  const numItems = items.length;
  const packedItems = items.filter((item)=>item.packed).length;
  const packedPercentage = Math.round((packedItems/numItems)*100);


  return (
    <footer className="stats">
      {packedPercentage<100 ? `You have ${numItems} items on your list, and you already packed ${packedItems} (${packedPercentage}%)` : "Your are all packed!! ✈️"}
    </footer>
  );
}

export default App;
