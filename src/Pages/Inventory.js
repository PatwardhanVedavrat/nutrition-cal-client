import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

export const Inventory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCate, setSelectedCate] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [update, setUpdate] = useState(false);
  const initialItem = {
    category: "",
    name: "",
    moisture: "",
    protien: "",
    fat: "",
    minerals: "",
    crudeFibre: "",
    carboHydrates: "",
    energy: "",
    calcium: "",
    phosphorus: "",
    iron: "",
  };
  const [item, setItem] = useState(initialItem);
  const selectCategory = (category) => {
    if (Array.isArray(category)) {
      setItem({ ...item, category: category[0]._id });
      setSelectedCate(category);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [update]);

  return (
    <div className="inventory">
      <Link to="/" className="btn btn-warning">
        Back
      </Link>
      <h1>Category Section ↓</h1>
      <div className="inventory__category">
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              axios
                .post(`${process.env.REACT_APP_API_KEY}/add-category`, {
                  name: newCategory,
                })
                .then(() => {
                  setNewCategory("");
                  setUpdate(!update);
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Add Category
          </button>
          <input
            type="text"
            className="form-control"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
            }}
            placeholder="Category Name"
          />
        </div>
      </div>
      <h1>Nutriant Section ↓</h1>
      <div className="inventory__item">
        <Typeahead
          id="category-typeahead"
          style={{ width: "20rem", marginRight: "1rem" }}
          highlightOnlyResult={true}
          onChange={selectCategory}
          options={categories}
          placeholder="Choose a category..."
          selected={selectedCate}
          labelKey="name"
        />
        <input
          type="text"
          placeholder="Nutriant name"
          className="form-control mt-3"
          value={item.name}
          onChange={(e) => {
            setItem({ ...item, name: e.target.value });
          }}
        />
        <div className="item-sec">
          <div className="sec-1">
            <input
              type="number"
              placeholder="Moisture (g)"
              className="form-control mt-3"
              value={item.moisture}
              onChange={(e) => {
                setItem({ ...item, moisture: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Protein (g)"
              className="form-control mt-3"
              value={item.protien}
              onChange={(e) => {
                setItem({ ...item, protien: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Fat (g)"
              className="form-control mt-3"
              value={item.fat}
              onChange={(e) => {
                setItem({ ...item, fat: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Mineals (g)"
              className="form-control mt-3"
              value={item.minerals}
              onChange={(e) => {
                setItem({ ...item, minerals: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Crud Fibre (g)"
              className="form-control mt-3"
              value={item.crudeFibre}
              onChange={(e) => {
                setItem({ ...item, crudeFibre: e.target.value });
              }}
            />
          </div>
          <div className="sec-2">
            <input
              type="number"
              placeholder="CarboHydrates (g)"
              className="form-control mt-3"
              value={item.carboHydrates}
              onChange={(e) => {
                setItem({ ...item, carboHydrates: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Energy (kcal)"
              className="form-control mt-3"
              value={item.energy}
              onChange={(e) => {
                setItem({ ...item, energy: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Calcium (mg)"
              className="form-control mt-3"
              value={item.calcium}
              onChange={(e) => {
                setItem({ ...item, calcium: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Phosphorus (mg)"
              className="form-control mt-3"
              value={item.phosphorus}
              onChange={(e) => {
                setItem({ ...item, phosphorus: e.target.value });
              }}
            />
            <input
              type="number"
              placeholder="Iron (mg)"
              className="form-control mt-3"
              value={item.iron}
              onChange={(e) => {
                setItem({ ...item, iron: e.target.value });
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-success mt-3"
          onClick={() => {
            axios
              .post(`${process.env.REACT_APP_API_KEY}/add-item`, item)
              .then(() => {
                setItem({ ...initialItem, category: selectedCate[0]._id });
                // setSelectedCate([]);
              })
              .catch((err) => {
                console.error(err);
              });
          }}
        >
          Add Nutriant
        </button>
      </div>
    </div>
  );
};
