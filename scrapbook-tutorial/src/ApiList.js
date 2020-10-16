import React, { useCallback, useState } from "react";

export default ({ items = [] }) => {
  console.log("All elements");
  console.log(items);

  return (
    <div className="list">
      <section className="api-list-section">
        <p>This is from the API</p>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
