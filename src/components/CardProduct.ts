import { getProductTypes } from "../services/productTypes";
import { ProductType } from "../types/ProductsTypes";

class CardProduct extends HTMLElement {
  private productTypes: ProductType[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      this.productTypes = await getProductTypes();
      console.log("Tipos de productos cargados:", this.productTypes);
      this.render();
    } catch (error) {
      console.error("Error al cargar tipos de productos:", error);
    }
  }

  render() {
    const image =
      this.getAttribute("image") || "https://placehold.co/100x100.png";
    const product = this.getAttribute("product") || "Producto desconocido";
    const description = this.getAttribute("description") || "Sin descripción";
    const price = this.getAttribute("price") || "Sin precio";
    const quantity = this.getAttribute("quantity") || "Sin stock";
    const typeId = parseInt(this.getAttribute("typeId") || "0");

    let productTypeName = "Sin tipo";

    switch (typeId) {
      case 1:
        productTypeName = "Electrónica";
        break;
      case 2:
        productTypeName = "Ropa";
        break;
      case 3:
        productTypeName = "Hogar";
        break;
      case 4:
        productTypeName = "Deportes";
        break;
      case 5:
        productTypeName = "Juguetes";
        break;
      default:
        productTypeName = "Otro";
    }

    console.log("Renderizando producto:", { product, typeId, productTypeName });

    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          width: 300px;
          background-color: white;
        }
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 4px;
        }
        .price {
          color: #2ecc71;
          font-weight: bold;
          font-size: 1.2em;
        }
        .quantity {
          color: #7f8c8d;
        }
        .type {
          background-color: #f1f1f1;
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-top: 8px;
          font-size: 0.9em;
        }
        .description {
          color: #666;
          margin: 8px 0;
        }
      </style>
      <div class="card">
        <img src="${image}" alt="${product}" />
        <h2>${product}</h2>
        <p class="description">${description}</p>
        <p class="price">$${price}</p>
        <p class="quantity">Disponibles: ${quantity}</p>
        <span class="type">${productTypeName}</span>
      </div>
    `;
  }
}

export default CardProduct;
