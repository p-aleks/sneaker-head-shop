import React from "react";
import ProductCard from "../ProductCard";
import style from "./Profile.module.scss"

function OrderCard({id, items, price}) {
    return (
        <div className={style.orderCard}>
            <h4 className={style.orderTitle}>
                {`Order #${id}`}
            </h4>
            <p>{`Total price (with tax): $${price}`}</p>
            <div className={`d-flex flex-wrap justify-center mt-20 ` + style.orderItems}>
                {
                    items.map(item => {
                        return (
                            <ProductCard
                                key={item.id}
                                id={item.id}
                                imgUrl={item.imgUrl}
                                price={item.price}
                                title={item.title}
                            />
                        )
                    })
                }

            </div>
        </div>
    );
}

export default OrderCard;