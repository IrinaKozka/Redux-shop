import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Cart } from "./Cart";
import { loadProducts, ProductModel, sortProducts, selectSearchResults } from '../Product/productsSlice'
import './Shop.css'
import { Product} from "./Product"
import { AlertList } from "../notification/AlertList";
import { useEffect } from "react";


export function Shop() {
  const isLoading: boolean = useAppSelector(selcetLoading);
  const products: ProductModel[] = useAppSelector(selectSearchResults);
  

 const dispatch = useAppDispatch()
 useEffect(()=> {
  dispatch(loadProducts());
 }, []);

  //  */Zadanie 1: Utwórz komponent Cart, który wyświetli informacje o statnie
  // koszyka * Zadanie 2: Utwórz komponent Produkt który z opcja dodania do
  // koszyka ** Zadanie 3: Wyświetl w koszyku dostępne produktu *** Zadanie 4:
  // Dodaj stylowanie i ikonkę koszyka/*
  return (
    <div className="position-relative">
      <i className="bi bi-sort-alpha-down"></i>
      <Cart />

      <div className="container pt-5">
        {isLoading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"> </span>
          </div>
        ) : (
          <div>
            <button className="btn btn-light" onClick={()=> dispatch(sortProducts('asc'))}> 
            
              <i className="bi bi-sort-alpha-down-alt"></i>
            </button>
            <div className="products-list">
              {products.map((product, key) => (
                <Product key={key} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      <AlertList />
    </div>
  );
  
}
