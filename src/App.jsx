import { useState } from "react";
import Logo from "./components/Logo.jsx";
import Form from "./components/Form.jsx";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats.jsx";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState([]);

  function deleteEverything(){
    setItems([]);
  }

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
      <PackingList items={items} onDeleteItem = {handleDeleteItem} onCheckedItem = {handleCheckItem} onClear = {deleteEverything}/>
      <Stats items={items}/>
    </>
  );
}

export default App;
