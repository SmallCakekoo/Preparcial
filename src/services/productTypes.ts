import { ProductType } from "../types/ProductsTypes";
export const getProductTypes = async (): Promise<ProductType[]> => {
  try {
    const response = await fetch(
      "https://11ec-200-3-193-225.ngrok-free.app/dca/kevin/types"
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
