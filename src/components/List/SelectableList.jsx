import React, { useState } from 'react';

const SelectableList = props => {
  const { items } = props;
  const [selectedItems, setSelectedItems] = useState(items.map(() => false));
  const onSelectItem = selectedIdx => setSelectedItems(items.map((item, idx) => !item.props.hasOwnProperty("disabled") && selectedIdx === idx));

  const listItems = items.map((item, idx) => {
    const state = selectedItems[idx] ? "active" : "inactive";
    const disabled = item.props.hasOwnProperty("disabled") ? "disabled" : "";
    const className = `list-group-item ${state} ${disabled}`;
    return (
      <div key={idx} className={className} onClick={() => onSelectItem(idx)}>
        {item}
      </div>
    )
  });

  return (
    <div className="list-group">
      {listItems}
    </div>
  )
};

export default SelectableList;