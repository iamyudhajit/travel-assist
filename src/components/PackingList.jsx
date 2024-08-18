import React from "react";
import Item from "./Item";
import { useState } from "react";

function PackingList({ items, onDeleteItem, onCheckedItem, onClear }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy == "input") sortedItems = items;
  if (sortBy == "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy == "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

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
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description order</option>
          <option value="packed">Sort By packed status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;