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
      console.log("Productos cargados:", this.products);
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
            padding: 20px;
          }
        </style>
        
        <div class="container">
          ${this.products
            .map((product) => {
              console.log("Procesando producto:", product);
              const image = product.image || "https://placehold.co/100x100.png";
              const name = product.product || "Producto desconocido";
              const description = product.description || "Sin descripción";
              const price = product.price ?? "Sin precio";
              const quantity = product.quantity ?? "Sin stock";
              const typeId = product.type?.[0]?.typeId || 0;

              return `
                <card-product 
                  image="${image}" 
                  product="${name}"
                  description="${description}"
                  price="${price}"
                  quantity="${quantity}"
                  typeId="${typeId}">
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
