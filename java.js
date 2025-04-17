import products from './products.js';

products()
  .then(data => data.data)
  .then(allProducts => {
    const resultsContainer = document.getElementById('results');
    const input = document.querySelector('.search');
    const searchButton = document.querySelector('.searchButton');

    // Function to display product cards
    function displayNames(list) {
      resultsContainer.innerHTML = ''; // Clear previous results

      list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'item-card';

        const productImage = product.image || 'path_to_default_image.jpg'; // Fallback if image is missing

        card.innerHTML = `
          <img src="${productImage}" alt="${product.name}" />
          <div class="info">
            <div class="title">${product.name}</div>
            <div class="price">${product.price}$</div>
            <a href="${product.link}" target="_blank">View Product</a>
          </div>
        `;

        resultsContainer.appendChild(card);
      });
    }

    displayNames(allProducts);

    // Filter function (live search)
    function toFilter() {
      return allProducts.filter(product =>
        product.name.toLowerCase().includes(input.value.toLowerCase())
      );
    }

    // Search function (returns only the first match)
    function toSearch() {
      const filteredNames = toFilter();
      return filteredNames.length > 0 ? [filteredNames[0]] : [];
    }

    // Listen for typing
    input.addEventListener('input', () => {
      displayNames(toFilter());
    });

    // Listen for Enter key
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        displayNames(toSearch());
      }
    });

    // Listen for search button click
    searchButton.addEventListener('click', () => {
      displayNames(toSearch());
    });
  });
