

export interface ProductResponse {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

export const fetchProducts = async (): Promise<ProductResponse[]> => {
  return fetch("https://fakestoreapi.com/products")
  .then(
    (response) => response.json()
  );
};

export const fetchSortProducts = async ( sort: string ): Promise<ProductResponse[]> => {
    return fetch("https://fakestoreapi.com/products?sort=desc" + sort)
    .then(
      (res) => res.json()
    );
}
// Stwórz funkcje która pobierze posortowane produkty ( productsAPI )
// Na podstawie loadProducts stwórz akcję asynchroniczną sortProducts , która pobierze posortowane produkty
// Zaktualizuj stan w momencie kiedy sortProducts jest wykonywane ( pending ) oraz kiedy już zostanie wykonane ( fulfilled )
// Po kliknięciu w odpowiedni przycisk sort wykonaj akcję sortProducts