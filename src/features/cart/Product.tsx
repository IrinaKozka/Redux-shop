import { useAppDispatch } from "../../app/hooks";
import { addNotification } from "../notification/notificationsSlice";
import { ProductModel } from "../Product/productsSlice";
import { addItem, Item } from "./cartSlice";
import "./Product.css";

export interface ProductProps {
  product: ProductModel
}

export function Product(props: ProductProps) {
  const dispatch = useAppDispatch();
const {product} =props;
//to jest to samo co
//const product = props.product
  const item: Item = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  };

  const handleClick = () => {
    dispatch(addItem(item));
    dispatch(addNotification({ message: `Produkt ${item.name} zostal dodany do koszyka`, type: 'success'}))
  }

  return (
    <div className="card">
      <img className="card-img-top" src={product.image} alt={product.name} />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>

        <span className="product-price">{product.price}</span>
        <button className="btn btn-primary" onClick={handleClick}>
          Add product
        </button>
        <button
          onClick={() =>
            dispatch(
              addNotification({
                message: `Produkt ${item.name} zostal dodany do koszyka`,
                type: "",
              })
            )
          }
        ></button>
      </div>
    </div>
  );
}
