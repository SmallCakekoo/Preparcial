import { getProductTypes } from "../services/productTypes";
import { ProductType } from "../types/ProductsTypes";

class CardProduct extends HTMLElement {
  private productTypes: ProductType[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.productTypes = await getProductTypes();
    this.render();
  }

  render() {
    const image =
      this.getAttribute("image") || "https://placehold.co/100x100.png";
    const product = this.getAttribute("product") || "Producto desconocido";
    const description = this.getAttribute("description") || "Sin descripción";
    const price = this.getAttribute("price") || "Sin precio";
    const quantity = this.getAttribute("quantity") || "Sin stock";
    const typeId = parseInt(this.getAttribute("typeId") || "0");

    const productType = this.productTypes.find((type) => type.id === typeId);

    this.shadowRoot!.innerHTML = `
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          margin: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        img {
          width: 100%;
          height: auto;
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
      </style>
      <div class="card">
        <img src="${image}" alt="${product}" />
        <h2>${product}</h2>
        <p>${description}</p>
        <p class="price">${price}</p>
        <p class="quantity">Disponibles: ${quantity}</p>
        ${productType ? `<span class="type">${productType.type}</span>` : ""}
      </div>
    `;
  }
}

export default CardProduct;
