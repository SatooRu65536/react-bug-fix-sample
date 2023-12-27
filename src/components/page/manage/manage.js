import { useState } from "react";
import styles from "./manage.module.css";

export default function Manage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [items, setItems] = useState(getLocalstorage());

  function setLocalstorage(items) {
    localStorage.setItem("items", JSON.stringify(items));
  }

  function getLocalstorage() {
    const items = localStorage.getItem("items");
    if (items) return JSON.parse(items);
    return [];
  }

  function handleNameChange(e) {
    const value = e.target.value;
    const upperCaseValue = value.toLowerCase();
    setName(upperCaseValue);
  }

  function handleAdd() {
    const newItem = {
      name: name,
      price: price,
      stock: stock,
    };

    if (items.some((item) => item.name === newItem.name)) {
      alert("商品名が重複しています");
      return;
    }

    if (newItem.name === "") {
      alert("商品名を入力してください");
      return;
    }

    if (newItem.price === "") {
      alert("単価を入力してください");
      return;
    }

    if (newItem.stock === "") {
      alert("数量を入力してください");
      return;
    }

    if (newItem.price < 0) {
      alert("単価は0以上を入力してください");
      return;
    }

    if (newItem.stock < 0) {
      alert("数量は0以上を入力してください");
      return;
    }

    if (!Number.isInteger(Number(newItem.price))) {
      alert("単価は整数を入力してください");
      return;
    }

    if (!Number.isInteger(Number(newItem.stock))) {
      alert("数量は整数を入力してください");
      return;
    }

    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalstorage(newItems);
    setName("");
    setPrice("");
    setStock("");
  }

  function handleDelete(index) {
    const res = window.confirm(`${items[index].name} を削除します`);
    if (!res) return;

    const newItems = items.filter((item, i) => i !== index);
    setItems(newItems);
    setLocalstorage(newItems);
  }

  return (
    <main className={styles.manage}>
      <h1 className={styles.title}>在庫一覧</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>商品名</th>
            <th>単価</th>
            <th>数量</th>
            <th className={styles.delete}>削除</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className={styles.name}>{item.name}</td>
              <td>{item.price}円</td>
              <td>{item.stock}個</td>
              <td className={styles.delete}>
                <input
                  type="button"
                  value="削除"
                  onClick={() => handleDelete(i)}
                />
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
            onChange={handleNameChange}
          />
          <label>単価:</label>
          <input
            type="number"
            placeholder="単価"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label>数量:</label>
          <input
            type="number"
            placeholder="数量"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <div className={styles.add}>
          <input type="button" value="追加" onClick={handleAdd} />
        </div>
      </div>
    </main>
  );
}
