import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { Firebase } from "../../firebase/config";
import { AuthContext } from "../../contextStore/AuthContext";
import { useHistory } from "react-router";
import GoLoading from "../Loading/GoLoading";

const Create = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [billUrl, setBillUrl] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    const date = new Date().toDateString();

    Firebase.storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          Firebase.storage()
            .ref(`/bill/${bill.name}`)
            .put(bill)
            .then(({ ref }) => {
              ref.getDownloadURL().then((pdfUrl) => {
                setBillUrl(billUrl);

                Firebase.firestore()
                  .collection("approvedProducts")
                  .add({
                    name,
                    category,
                    price,
                    description,
                    url,
                    pdfUrl,
                    userId: user.uid,
                    createdAt: date,
                  })
                  .then(() => {
                    history.push("/");
                  });
              });
            });
        });
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleBillChange = (e) => {
    const file = e.target.files[0];
    setBill(file);
  };

  return (
    <Fragment>
      <Header />
      {loading && <GoLoading />}
      <div className="centerDiv">
        <label>Name</label>
        <br />
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Category</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        >
          <option value="">Select Category</option>
          <option value="Cars">Cars</option>
          <option value="Cameras & Lenses">Cameras & Lenses</option>
          <option value="Computers & Laptops">Computers & Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Motorcycles">Motorcycles</option>
          <option value="Tablets">Tablets</option>
        </select>
        <br />
        <label>Price</label>
        <br />
        <input
          className="input"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Description</label>
        <br />
        <input
          className="input"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label>Image</label>
        <br />
        <input type="file" onChange={handleImageChange} />
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Product"
            width="200"
            height="200"
          />
        )}
        <br />
        <label>Bill (PDF)</label>
        <br />
        <input type="file" onChange={handleBillChange} />
        <br />
        <button className="uploadBtn" onClick={handleSubmit}>
          Upload and Submit
        </button>
      </div>
    </Fragment>
  );
};

export default Create;