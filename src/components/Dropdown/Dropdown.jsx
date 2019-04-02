import React, {useState, useEffect} from "react";

const Dropdown = ({items, name, click, color="default", ...props}) => {
    const [expanded, setExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState(name);

    useEffect(() => {
      setSelectedItem(name)
    }, [name]);

    const onItemClick = (item, click) => {
        click(item);
        setSelectedItem(item);
        setExpanded(false);
    };

    return (
        <div className="dropdown" {...props}>
            <button
                className={`btn btn-${color} dropdown-toggle`}
                onClick={() => setExpanded(!expanded)}
                type="button"
            >
                {selectedItem}{" "}
                <span className="caret"/>
            </button>
            <ul
                className="dropdown-menu"
                style={{
                    transform: "none",
                    display: expanded ? "block" : "none",
                    opacity: 1,
                    visibility: "visible"
                }}
            >
                {items.map((item, idx) => (
                    <li key={idx}>
                        <a href="#todo" onClick={() => onItemClick(item, click)}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;
