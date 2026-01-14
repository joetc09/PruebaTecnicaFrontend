const btnLoadProducts = document.getElementById("btnLoadProducts");
const productsContainer = document.getElementById("productsContainer");

const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");
const modalImages = document.getElementById("modalImages");

const productModal = new bootstrap.Modal(
  document.getElementById("productModal")
);

// Evento click
btnLoadProducts.addEventListener("click", loadProducts);

// Función principal
function loadProducts() {
  fetch("https://api.escuelajs.co/api/v1/products")
    .then(response => response.json())
    .then(products => {
      renderProducts(products.slice(0, 41));
    })
    .catch(error => console.error(error));
}

// Crear cards
function renderProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const descriptionShort =
      product.description.length > 100
        ? product.description.substring(0, 100) + "..."
        : product.description;

    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${product.images[0]}" 
             class="card-img-top" 
             style="height:225px; object-fit:contain;"
             alt="${product.title}">
        <div class="card-body">
          <h6>${product.title}</h6>
          <p class="card-text">${descriptionShort}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary btn-view">
                View
              </button>
            </div>
            <small class="text-body-secondary">$ ${product.price}</small>
          </div>
        </div>
      </div>
    `;

    col.querySelector(".btn-view").addEventListener("click", () => {
      showModal(product);
    });

    productsContainer.appendChild(col);
  });
}

// Mostrar modal
function showModal(product) {
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;
  modalCategory.textContent = product.category.name;

  modalImages.innerHTML = "";

  product.images.slice(1, 3).forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "150px";
    image.style.objectFit = "contain";
    modalImages.appendChild(image);
  });

  productModal.show();
}