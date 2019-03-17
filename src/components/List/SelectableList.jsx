import React, { useState } from 'react';

const SelectableList = props => {
  const { items } = props;
  const [selectedItems, setSelectedItems] = useState(items.map(() => false));
  const onSelectItem = selectedIdx => setSelectedItems(items.map((item, idx) => selectedIdx === idx));

  const listItems = items.map((item, idx) => {
    const state = selectedItems[idx] ? "active" : "inactive";
    const className = `list-group-item ${state}`;
    return (
      <a className={className} onClick={() => onSelectItem(idx)}>
        {item}
      </a>
    )
  });

  return (
    <div className="list-group">
      {listItems}
    </div>
  )
};

export default SelectableList;