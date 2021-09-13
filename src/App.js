import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return (list = JSON.parse(localStorage.getItem("list")));
    } else {
      return [];
    }
  };

  const [itemName, setitemName] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [isEditing, setisEditing] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [editId, setEditID] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName) {
      showAlert(true, "please enter a value", "danger");
    } else if (itemName && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: itemName };
          }
          return item;
        })
      );
      setisEditing(false);
      setitemName("");
      setEditID(null);
      showAlert(true, "item name is edited successfully", "success");
    } else {
      showAlert(true, "successfully item added to the list", "success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: itemName,
      };
      setList([...list, newItem]);
      setitemName("");
    }
  };
  const clearlist = () => {
    showAlert(true, "list is empty", "danger");
    setList([]);
  };
  const showAlert = (show = "", msg = "", type = "") => {
    setAlert({ show, msg, type });
  };
  const removeItem = (id) => {
    showAlert(true, "item removed from list", "danger");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setisEditing(true);
    setEditID(id);
    setitemName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={itemName}
            onChange={(e) => setitemName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} editItem={editItem} removeItem={removeItem} />
          <button onClick={clearlist} className="clear-btn">
            clear all items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
