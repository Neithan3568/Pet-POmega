import React from "react";
import { useCart } from "react-use-cart";

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (isEmpty) return <h1 className="text-center">Tu carrito está vacío</h1>;

  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h5>Carrito ({totalUniqueItems}) - Total de artículos: {totalItems}</h5>
          <table className="table table-light table-hover m-0">
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.img} style={{ height: '6rem' }} alt={item.title} />
                  </td>
                  <td>{item.title}</td>
                  <td>${item.price}</td>
                  <td>Cantidad: {item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-info ms-2"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button className="btn btn-info ms-2" onClick={() => removeItem(item.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-end mt-3">
            <h5>Total del carrito: ${cartTotal.toFixed(2)}</h5>
            <button className="btn btn-danger" onClick={() => emptyCart()}>
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
      <div className="col-auto ms-auto">
        <h2>Total Precio: ${cartTotal}</h2>
      </div>
      <div className="col-auto">
        <button 
        className="btn btn-danger m-2"
        >Clear Cart</button>
        <button className="btn btn-primary m-2">Comprar Ahora</button>

      </div>
    </section>
  );
};

export default Cart;
