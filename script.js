// document.addEventListener('DOMContentLoaded', () => {
//     const searchBar = document.getElementById('search-bar');
//     const gridLayoutButton = document.getElementById('grid-layout');
//     const listLayoutButton = document.getElementById('list-layout');
//     let productList = document.getElementById('product-list');
//     let products = []; 

//     function fetchProducts() {
//         const apiUrl = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093';
    
//         fetch(apiUrl)
//             .then(response => response.json())
//             .then(data => {
//                 displayProducts(data);
//             })
//             .catch(error => console.error('Error fetching products:', error));
//     }
    
//     function displayProducts(products) {
//         console.log('Products:', products);
//         productList = document.getElementById('product-list');
//         if (!productList) {
//             console.error('Product list element not found');
//             return;
//         }
//         productList.innerHTML = '';
    
//         if (Array.isArray(products)) {
            
//             for (const product of products) {
//                 const productElement = document.createElement('div');
//                 productElement.classList.add('product');
                
//                 const name = product.product_title || 'title Not Available';
//                 const description = product.description || 'Description Not Available';
//                 const price = product.price !== undefined ? product.price : 'Price Not Available';
                
//                 productElement.innerHTML = `
//                     <h2>${name}</h2>
//                     <p>${description}</p>
//                     <p>${price}</p>
//                 `;
//                 productList.appendChild(productElement);
//             }
//         } else if (typeof products === 'object') {
            
//             const productElement = document.createElement('div');
//             productElement.classList.add('product');
            
//             const name = products.product_title || 'title Not Available';
//             const description = products.description || 'Description Not Available';
//             const price = products.price !== undefined ? products.price : 'Price Not Available';
            
//             productElement.innerHTML = `
//                 <h2>${name}</h2>
//                 <p>${description}</p>
//                 <p>${price}</p>
//             `;
//             productList.appendChild(productElement);
//         } else {
//             console.error('Invalid data format for products');
//         }
//     }

//     function filterProducts(searchText) {
//         const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
//         displayProducts(filteredProducts);
//     }

//     function toggleLayout(layout) {
//         if (layout === 'grid') {
//             productList.classList.add('grid-layout');
//             productList.classList.remove('list-layout');
//         } else {
//             productList.classList.add('list-layout');
//             productList.classList.remove('grid-layout');
//         }
//     }

//     searchBar.addEventListener('input', event => {
//         filterProducts(event.target.value);
//     });

//     gridLayoutButton.addEventListener('click', () => {
//         toggleLayout('grid');
//     });

//     listLayoutButton.addEventListener('click', () => {
//         toggleLayout('list');
//     });

//     fetchProducts();
// });
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const gridLayoutButton = document.getElementById('grid-layout');
    const listLayoutButton = document.getElementById('list-layout');
    const searchBar = document.getElementById('search-bar');

    fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data from API:',data);
        if (Array.isArray(data.data)) {
          
          displayProducts(data.data);
        } else if (typeof data === 'object') {
         
          displayProduct(data);
        } else {
          throw new Error('Data is not in the expected format');
        }
      })
      .catch(error => {
        console.error('Error fetching/displaying products:', error);
      });
  
    function displayProducts(products) {
      productList.innerHTML = ''; 
  
      products.forEach(product => {
        
        displayProduct(product);
      });
    }
  
    function displayProduct(product) {
      const productElement = document.createElement('div');
      productElement.classList.add('product');
  
      const imageUrl = product.product_image || 'image Not Available';
      const title = product.product_title || 'title Not Available';
      const badge = product.product_badge || 'badge not available';
      const variant=product.product_variants || {};

      let variantHTML = '<p>Variants:</p>';
      let counter = 1; // Custom counter for variants
      for (const key in variant) {
        if (variant.hasOwnProperty(key)) {
          variantHTML += `<p>v${counter}: ${variant[key]}</p>`;
          counter++;
        }
      }
    
  
      productElement.innerHTML = `
        <h2>${title}</h2>
        <img src="${imageUrl}" alt="${title}"/>
        <p>${badge}</p>
        ${variantHTML}
        
      `;
      productList.appendChild(productElement);
    }
    searchBar.addEventListener('input', event => {
        const searchText = event.target.value.toLowerCase();
        filterProducts(searchText);
    });

    function filterProducts(searchText) {
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const title = product.querySelector('h2').textContent.toLowerCase();
            const description = product.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchText) || description.includes(searchText)) {
                product.classList.add('highlighted'); // Add a class for highlighting
            } else {
                product.classList.remove('highlighted'); // Remove the class if not matching
            }
        });
    }

  gridLayoutButton.addEventListener('click', () => {
        productList.classList.remove('list-layout');
        productList.classList.add('grid-layout');
    });

    listLayoutButton.addEventListener('click', () => {
        productList.classList.remove('grid-layout');
        productList.classList.add('list-layout');
    });
    
});
  
