import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchProducts } from "./productsAPI";
import { fetchSortProducts } from "./productsAPI";

export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
}

export interface ProductsState {
  products: ProductModel[];
  searchResults: ProductModel[];
  loading: boolean;
  sort: boolean;
}

const productsList = [
  {
    id: "1",
    name: "Call of Duty",
    price: 150,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "2",
    name: "Fifa 2022",
    price: 100,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "3",
    name: "Cyberpunk",
    price: 100,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "4",
    name: "God of War",
    price: 199,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "5",
    name: "NBA 2k22",
    price: 99,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "6",
    name: "Crash Bandicoot",
    price: 149,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "7",
    name: "Horizon",
    price: 169,
    description: "Super gra",
    currency: "PLN",
  },
  {
    id: "8",
    name: "Minecraft",
    price: 80,
    description: "Super gra",
    currency: "PLN",
  },
];
const initialState: ProductsState = {
  products: [],
  searchResults: [],
  loading: false,
  sort: false,
};



export const loadProducts = createAsyncThunk(
  "products/getProducts",
  async (): Promise<ProductModel[]> => {

    const productsResponse = await fetchProducts();
console.log(productsResponse)
    return productsResponse.map((product)=> {
      return {
        id: product.id.toString(),
        name: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        currency: 'PLN'
      }
    });
  }
);

export const sortProducts = createAsyncThunk(
 'products/getSortProducts',
 async (sort: 'asc' | 'desc'): Promise<ProductModel[]> => {

  const productsResponse = await fetchSortProducts(sort);
   return productsResponse.map((product)=> {
  return {
    
       id: product.id.toString(),
        name: product.title,
        description: product.description,
        price: product.price,
        image: product.image,
        currency: 'PLN',
 }
  })
}
)

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    searchProducts: (
      state: ProductsState,
      action: PayloadAction<{ query: string }>
    ) => {
      const { query } = action.payload;
      state.searchResults = state.products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      //wyszukiwanie ttylko duzej litery: c Call of duty i minecraft wyszuka tylko Call
    },
  },
  extraReducers: (builder)=> {
    builder
    .addCase(loadProducts.fulfilled, (state, action)=> {
   state.products = action.payload;
   state.searchResults = action.payload;
   state.loading = false;
    })
    .addCase(loadProducts.pending, (state, action) => {
   state.loading =true;
    })
    .addCase(sortProducts.pending, (state, action ) =>{
    state.sort = false;  
    })
    .addCase(sortProducts.fulfilled, (state, action) => {
      state.products =action.payload;
      state.searchResults =action.payload;
    state.sort = true;
    })
  }
  
});

export const selectProducts = (rootState: RootState) => rootState.products.products;
export const selectSearchResults = (rootState: RootState) =>
  rootState.products.searchResults;
export const selcetLoading = (rootState: RootState) => rootState.products.loading;

export const productsReducer = productsSlice.reducer;
export const { searchProducts } = productsSlice.actions;
