import React from "react";
import { useCart } from "react-use-cart";

const Itemcard = (props) => {
    const { addItem } = useCart();
    return (
        <div class="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div class="card p-0 overflow-hidden h-100 shadow">
                <img src={props.img} class="card-img-top" alt="Product" />
                <div class="card-body">
                    <h5 class="card-title">{props.titlle}</h5>
                    <h5 class="card-title">$ {props.price}</h5>
                    <p class="card-text">{props.desc}</p>
                    <button class="btn btn-success" onClick={() => addItem(props.item)}>
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Itemcard;
