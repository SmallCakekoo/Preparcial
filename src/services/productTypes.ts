import { ProductType } from "../types/ProductsTypes";
export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(
      "https://8eb0-200-3-193-225.ngrok-free.app/dca/kevin/types",
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Error al obtener los tipos de productos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
