import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  // Your Firebase config here
  apiKey: "AIzaSyDJWss3thnqCUIb4b_SfjS07iZs5FBSors",
  authDomain: "shopzonee-new.firebaseapp.com",
  projectId: "shopzonee-new",
  storageBucket: "shopzonee-new.appspot.com",
  messagingSenderId: "590968759958",
  appId: "1:590968759958:web:00a9457933904ab541c4b7"
  // ...
});

const firestore = firebase.firestore();
const storage = firebase.storage();
const productsRef = firestore.collection('products');
const approvedProductsRef = firestore.collection('approvedProducts');

function App() {
  const [products, loading, error] = useCollectionData(approvedProductsRef, { idField: 'userId' });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchPDFUrl = async (product) => {
      try {
        const storageRef = storage.ref(product.pdfPath);
        const url = await storageRef.getDownloadURL();
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          pdfUrl: url,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedProduct && selectedProduct.pdfPath && !selectedProduct.pdfUrl) {
      fetchPDFUrl(selectedProduct);
    }
  }, [selectedProduct]);

  const approveProduct = async (product) => {
    try {
      await productsRef.add(product);
      await approvedProductsRef.doc(product.userId).delete();
      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productsRef.doc(productId).delete();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewPDF = (pdfUrl) => {
    const newWindow = window.open();
    newWindow.document.write(`<iframe src="${pdfUrl}" width="100%" height="100%"></iframe>`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      {selectedProduct && (
        <div className="card">
          <img src={selectedProduct.url} alt={selectedProduct.name} />
          <h3>{selectedProduct.name}</h3>
          <p>{selectedProduct.description}</p>
          <span>{selectedProduct.price}</span>
          <button onClick={() => approveProduct(selectedProduct)}>Approve</button>
          <button onClick={() => setSelectedProduct(null)}>Cancel</button>
          {selectedProduct.pdfUrl && (
            <button onClick={() => handleViewPDF(selectedProduct.pdfUrl)}>View PDF</button>
          )}
        </div>
      )}
      <div className="product-list">
        {products.map((product) => (
          <div key={product.userId} className="card">
            <img src={product.url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span>{product.price}</span>
            <button onClick={() => setSelectedProduct(product)}>Approve</button>
            <button onClick={() => deleteProduct(product.userId)}>Delete</button>
            {product.pdfUrl ? (
              <button onClick={() => handleViewPDF(product.pdfUrl)}>View Bill</button>
            ) : (
              <span>No PDF</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
