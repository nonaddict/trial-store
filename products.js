// products.js
const products = async () => {
    try {
      const response = await fetch('https://backend-1-4kyz.onrender.com/products', {
        method: 'GET',
        mode: 'cors'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  
  export default products;
  