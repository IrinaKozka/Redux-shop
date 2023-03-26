import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  discreaseQuantity,
  increaseQuantity,
  removeItem,
  selectItems,
  selectItemsQuantity,
  selectTotal,
  selectIsDisplayed,
} from "./cartSlice";
import "./Cart.css";
import { Item } from "./cartSlice";
import { addNotification } from "../notification/notificationsSlice";

export function Cart() {
  // const quantity: number = useAppSelector(selectItemsQuantity);
  const items: Item[] = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const total: number = useAppSelector(selectTotal);
  const isDisplayed: boolean = useAppSelector(selectIsDisplayed);

  const handleRemoveClick = (id: string) => {
    dispatch(removeItem(id));
    dispatch(
      addNotification({
        message: `Produkt zostal usuniety z koszyka`,
        type: "info",
      })
    );
    //wysylamy akcje
  };

  const renderRemoveButton = (id: string) => {
    return (
      <button className="delete-button" onClick={() => handleRemoveClick(id)}>
        Remove
      </button>
    );
  };

  return (
    <div
      id="cart"
      className={
        "card position-absolute top-0 end-0 z-index-1 w-25" +
        (isDisplayed ? "d-block" : "d-none")
      }
    >
      <ul className="list-group list-group-flush">
        {items.map((item, index) => (
          <li key={index} className="list-group-item">
            {item.name} {item.price}
            <button onClick={() => dispatch(discreaseQuantity(item.id))}>
              -
            </button>
            ({item.quantity})
            <button onClick={() => dispatch(increaseQuantity(item.id))}>
              +
            </button>
            {renderRemoveButton(item.id)}
          </li>
        ))}
      </ul>
      <div>Total: {total}</div>
    </div>
  );
}
