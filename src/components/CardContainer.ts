import getInfoApiProducts from "../services/getInfoApi";
import { Products } from "../types/ProductsTypes";

class CardContainer extends HTMLElement {
  private products: Products[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      this.products = await getInfoApiProducts();
      this.render();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          .container {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            justify-content: center;
          }
        </style>
        
        <div class="container">
          ${this.products
            .map((product) => {
              const image = product.image || "https://placehold.co/100x100.png";
              const name = product.product || "Producto desconocido";
              const description = product.description || "Sin descripción";
              const price = product.price ?? "Sin precio";
              const quantity = product.quantity ?? "Sin stock";

              return `
                <card-product 
                  image="${image}" 
                  product="${name}"
                  description="${description}"
                  price="${price}"
                  quantity="${quantity}">
                </card-product>
              `;
            })
            .join("")}
        </div>
      `;
    }
  }
}

export default CardContainer;
