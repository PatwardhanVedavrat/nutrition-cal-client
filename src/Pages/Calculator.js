import axios from "axios";
import React, { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from "react-router-dom";

export const Calculator = () => {
  const [categories, setCategories] = useState([]);
  const [nutrients, setNutrients] = useState([]);

  const [quantity, setQuantity] = useState("");
  const [nutriant, setNutriant] = useState("");
  const [cate, setCate] = useState("");
  const [dataCollection, setDataCollection] = useState([]);
  const [selectedNutri, setSelectedNutri] = useState([]);
  const [selectedCate, setSelectedCate] = useState([]);

  const selectNutri = (nutri) => {
    if (Array.isArray(nutri)) {
      setNutriant(nutri[0]);
      setSelectedNutri(nutri);
    }
  };

  const selectCategory = (category) => {
    if (Array.isArray(category)) {
      setCate(category[0]);
      setSelectedCate(category);
      setSelectedNutri([]);
      axios
        .get(`${process.env.REACT_APP_API_KEY}/items/${category[0]._id}`)
        .then((res) => {
          setNutrients(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity && nutriant && cate) {
      const data = {
        name: nutriant.name,
        moisture: ((+nutriant.moisture * quantity) / 100).toFixed(2),
        protien: ((+nutriant.protien * quantity) / 100).toFixed(2),
        fat: ((+nutriant.fat * quantity) / 100).toFixed(2),
        minerals: ((+nutriant.minerals * quantity) / 100).toFixed(2),
        crudeFibre: ((+nutriant.crudeFibre * quantity) / 100).toFixed(2),
        carboHydrates: ((+nutriant.carboHydrates * quantity) / 100).toFixed(2),
        energy: ((+nutriant.energy * quantity) / 100).toFixed(2),
        calcium: ((+nutriant.calcium * quantity) / 100).toFixed(2),
        phosphorus: ((+nutriant.phosphorus * quantity) / 100).toFixed(2),
        iron: ((+nutriant.iron * quantity) / 100).toFixed(2),
        quantity,
      };
      setDataCollection([...dataCollection, data]);
      setSelectedCate([]);
      setSelectedNutri([]);
      setQuantity("");
    }
  };
  return (
    <div className="nutri-cal">
      <form className="add-nutri" onSubmit={handleSubmit}>
        <div className="nutri-sec1">
          <Link to="/inventory" className="btn btn-success m-r-16">
            Add item to inventory
          </Link>
        </div>
        <div className="nutri-sec2">
          <Typeahead
            labelKey="name"
            id="nutri-typeahead"
            style={{ width: "20rem" }}
            highlightOnlyResult={true}
            onChange={selectCategory}
            options={categories}
            placeholder="Choose a category..."
            selected={selectedCate}
          />
          <Typeahead
            labelKey="name"
            id="sub-nutri-typeahead"
            style={{ width: "20rem" }}
            highlightOnlyResult={true}
            onChange={selectNutri}
            options={nutrients}
            placeholder="Choose a nutriant..."
            selected={selectedNutri}
          />
          <div className="input-group" style={{ width: "16rem" }}>
            <input
              type="number"
              className="form-control"
              placeholder="Quantity in grams"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Add +
            </button>
          </div>
        </div>
      </form>
      <table className="table table-bordered table-responsive">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Moisture (g)</th>
            <th scope="col">Protien (g)</th>
            <th scope="col">Fat (g)</th>
            <th scope="col">Minerals (g)</th>
            <th scope="col">Crude Fibre (g)</th>
            <th scope="col">Carbo Hydrates (g)</th>
            <th scope="col">Energy (Kcal)</th>
            <th scope="col">Calcium (mg)</th>
            <th scope="col">Phosphorus (mg)</th>
            <th scope="col">Iron (mg)</th>
            <th scope="col">Quantity (g)</th>
          </tr>
        </thead>
        <tbody>
          {dataCollection.map((item) => {
            return (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.moisture}</td>
                <td>{item.protien}</td>
                <td>{item.fat}</td>
                <td>{item.minerals}</td>
                <td>{item.crudeFibre}</td>
                <td>{item.carboHydrates}</td>
                <td>{item.energy}</td>
                <td>{item.calcium}</td>
                <td>{item.phosphorus}</td>
                <td>{item.iron}</td>
                <td>{parseFloat(item.quantity).toFixed(2)}</td>
              </tr>
            );
          })}
          <tr>
            <td>Total</td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.moisture, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.protien, 0).toFixed(2)}
            </td>
            <td>{dataCollection.reduce((a, b) => a + +b.fat, 0).toFixed(2)}</td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.minerals, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.crudeFibre, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection
                .reduce((a, b) => a + +b.carboHydrates, 0)
                .toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.energy, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.calcium, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.phosphorus, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.iron, 0).toFixed(2)}
            </td>
            <td>
              {dataCollection.reduce((a, b) => a + +b.quantity, 0).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
