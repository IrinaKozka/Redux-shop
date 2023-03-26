import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: Item[];
  isDisplayed: boolean;
}

const initialState: CartState = {
  items: [],
  isDisplayed: false,
};

const remove = (items: Item[], id: string) => {
  items = items.filter((i) => i.id !== id);
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
   //zamiast Item {id: string, name:string } na dole
    addItem: (state, action: PayloadAction<Item>) => {
      const item = state.items.find((i)=> i.id === action.payload.id);
      //szukamy czy el znajduje sie w koszyku
      if(item) {
            item.quantity++;
      } else {
            state.items.push(action.payload);
      }
   
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const itemsWithoutGivenItem = state.items.filter((item) => item.id !== id);

      state.items = itemsWithoutGivenItem
      //zamiast id action.payload
    },
    increaseQuantity: (state, action : PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id)
    if (item) {
      item.quantity++;
    }
      
    },

    discreaseQuantity: (state, action : PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id)
    if (item) {
      if (item.quantity > 1) {
         item.quantity--;
      } else {
            state.items = state.items.filter((i) => i.id !== id)
         }
      }
    },
    toogleCart: (state) => {

    state.isDisplayed = !state.isDisplayed;
    },
  },
});



export const { addItem, removeItem, increaseQuantity, discreaseQuantity, toogleCart } = cartSlice.actions;

export const selectIsDisplayed = (state: RootState) => {
   return state.cart.isDisplayed;
};

export const selectItemsQuantity = (state: RootState) => {
// let total = 0

// for(let i=0; i<state.cart.items.length; i++) {
//    total += state.cart.items[i].quantity;
// }

// state.cart.items.forEach(item =>{
//    total += item.quantity;
// })

///// REDUCE
// Reduce zamieniamy teblice w inny obiekt
// acc = 0 (acc = prev)
// Quantity: 2, quantiry: 3
// acc = 0 => 2; acc = 2 => + 3 = 5
const total = state.cart.items.reduce((acc, item) => {
acc += item.quantity;
return acc;
}, 0);


  return total;
};

export const selectTotal = (state: RootState) => {
let total = 0;
state.cart.items.forEach(item => {
   total += (item.price * item.quantity)
});
return total;
};

export const selectItems = (state: RootState) => {
  return state.cart.items;
};

// Sposób 2 ( Ten lepszy )
export const cartReducer = cartSlice.reducer;

// Sposób 1
// export default cartSlice.reducer;
