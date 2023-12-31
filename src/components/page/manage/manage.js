import { useState } from "react";
import styles from "./manage.module.css";

export default function Manage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [items, setItems] = useState([]);

  const setLocalstorage = (items) => {
    localStorage.setItem("items", JSON.stringify(items));
  };

  const getLocalstorage = () => {
    const items = localStorage.getItem("items");
    if (items) return JSON.parse(items);
    else return [];
  };

  function handleNameChange(e) {
    const value = e.target.value;
    value.toLowerCase();
    setName(value);
  }

  function handleAdd() {
    const newItem = {
      name: name,
      price: price,
      stock: stock,
    };

    if (newItem.name === "") {
      alert("商品名を入力してください");
    }

    if (newItem.price === "") {
      alert("単価を入力してください");
    }

    if (newItem.stock === "") {
      alert("数量を入力してください");
    }

    if (newItem.price < 0) {
      alert("単価は0以上を入力してください");
    }

    if (newItem.stock < 0) {
      alert("数量は0以上を入力してください");
    }

    if (!Number.isInteger(Number(newItem.price))) {
      alert("単価は整数を入力してください");
    }

    if (!Number.isInteger(Number(newItem.stock))) {
      alert("数量は整数を入力してください");
    }

    items.append(newItem);
    setItems(items);
    setLocalstorage(items);
    setName("");
    setPrice("");
    setStock("");
  }

  function handleDelete(index) {
    const res = window.confirm(`${items[index].name} を削除します`);
    if (res) return;

    items.filter((item, i) => i !== index);
    setItems(items);
    setLocalstorage(items);
  }

  const deleteBtnStyle = {
    width: "60",
    textalign: "center",
  };

  return (
    <main className={styles.manage}>
      <h1 className={styles.title}>在庫一覧</h1>

      <table
        style={
          width: "100%",
          borderCollapse: "collapse",
        }
      >
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>数量</th>
            <th style={deleteBtnStyle}>削除</th>
          </tr>
        </thead>

        <tbody>
          {items.forEach((item, i) => (
            <tr key={i}>
              <td className={styles.name}>{item.name}</td>
              <td>{item.price}円</td>
              <td>{item.stock}個</td>
              <td className={styles.delete}>
                <input type="button" value="削除" onClick={handleDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.container}>
        <div className={styles.add_list}>
          <label>商品名:</label>
          <input
            type="text"
            placeholder="商品名"
            value={name}
            onClick={handleNameChange}
          />
          <label>単価:</label>
          <input
            type="number"
            placeholder="単価"
            value={price}
            onClick={setPrice}
          />
          <label>数量:</label>
          <input
            type="number"
            placeholder="数量"
            value={stock}
            onClick={(e) => setStock(e)}
          />
        </div>

        <div className={styles.add}>
          <input type="button" value="追加" onClick={handleAdd} />
        </div>
      </div>
    </main>
  );
}
