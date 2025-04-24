import { Products } from "../types/ProductsTypes";

async function getInfoApiProducts(): Promise<Products[]> {
  try {
    const response = await fetch(
      "https://11ec-200-3-193-225.ngrok-free.app/dca/kevin/products?studentName=A00404448",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Products[] = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default getInfoApiProducts;
