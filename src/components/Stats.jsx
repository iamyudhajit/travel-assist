import React from "react";

function Stats({ items }) {
  if (items.length == 0) {
    return <footer className="stats">Start listing items to pack! 🧳</footer>;
  }

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {packedPercentage < 100
        ? `You have ${numItems} items on your list, and you already packed ${packedItems} (${packedPercentage}%)`
        : "Your are all packed!! ✈️"}
    </footer>
  );
}

export default Stats;