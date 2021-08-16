import React from "react";
import {AppContext} from "../../context";
import styles from './CartDrawer.module.scss';
import Info from "../Info";
import axios from "axios";

function CartDrawer({onRemoveFromCart, isOpen}) {
    const {items, cartItems, setCartItems, setOrders, checkIsInCart, setIsShownCart} = React.useContext(AppContext);

    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onOrder = () => {
        async function postData() {
            try {
                setIsLoading(true);
                const newOrder = await axios.post(
                    'https://60f2e6966d44f300177887fa.mockapi.io/orders',
                    {
                        items: items.filter(item => checkIsInCart(item.id)),
                        price: totalPrice + taxAmount,
                        timeOrdered: new Date()
                    });
                const newCartItems = await axios.put('https://60f2e6966d44f300177887fa.mockapi.io/cart/0', {items: []});

                setCartItems(newCartItems.data.items);
                setOrders(perv => [...perv, newOrder.data]);
                setOrderId(newOrder.data.objID);
                setIsOrderComplete(true);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        }

        postData();
    };
    const closeCart = () => {
        document.body.style.overflow = 'visible';
        setIsShownCart(false);
    };

    const cartItemsData = items.filter(item => checkIsInCart(item.id));
    const totalPrice =
        items.filter(item => checkIsInCart(item.id))
            .reduce((a, c) => a + c.price, 0);
    const taxAmount = totalPrice / 20;


    return (
        <div className={`${styles.drawerBackdrop} ${isOpen ? styles.open : ''}`} onClick={closeCart}>
            <div className={styles.drawer + ' d-flex flex-column p-30'} onClick={(e) => e.stopPropagation()}>
                <div className={styles.heading + ' d-flex'}>
                    <h4>Cart</h4>
                    <button className={styles.closeCartBtn} onClick={closeCart}>
                        <img src="/sneaker-head-shop/img/remove.svg" alt="close"/>
                    </button>
                </div>
                {
                        cartItemsData.length
                            ?
                            <div className={styles.body}>
                                <div className={styles.products + ' mb-40'}>
                                    {
                                        cartItemsData.map(item => (
                                            <div key={item.id}
                                                 className={styles.card + ' d-flex align-center mb-20'}>
                                                <img className={styles.productImg} src={item.imgUrl} alt={item.title}/>
                                                <div className="ml-20 mr-15">
                                                    <p className={styles.productName}>{item.title}</p>
                                                    <p className={styles.productPrice}>{`$${item.price}`}</p>
                                                </div>
                                                <button
                                                    onClick={() => onRemoveFromCart(cartItems.filter(obj => obj.itemId === item.id))}>
                                                    <img src="/sneaker-head-shop/img/remove.svg" alt="remove product"/>
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.cartInfo}>
                                    <div className={styles.cartTotal + ' d-flex mb-20'}>
                                        <span>Total: </span>
                                        <div className={styles.dashedLine}></div>
                                        <b>
                                            {`$${totalPrice + taxAmount}`}
                                        </b>
                                    </div>
                                    <div className={styles.cartTax + ' d-flex'}>
                                        <span>Tax 5%: </span>
                                        <div className={styles.dashedLine}></div>
                                        <b>{`$ ${taxAmount}`}</b>
                                    </div>
                                    <button disabled={isLoading} className="btnGreen btnForward mt-25" onClick={onOrder}>
                                        <span>
                                            Order
                                        </span>
                                        <img src="/sneaker-head-shop/img/arrow-right.svg" alt="arrow"/>
                                    </button>
                                </div>
                            </div>
                            :
                            isOrderComplete
                                ?
                                <Info
                                    style={`${styles.body} ${styles.empty}`}
                                    imgUrl={"/sneaker-head-shop/img/orderComplete.jpg"}
                                    imgAlt={"Order is complete"}
                                    heading={"Order complete!"}
                                    info={`Your order #${orderId} will be soon shipped.`}
                                    backBtnHandler={closeCart}
                                />
                                :
                                <Info
                                    style={`${styles.body} ${styles.empty}`}
                                    imgUrl={"/sneaker-head-shop/img/cartEmpty.png"}
                                    imgAlt={"Cart is empty"}
                                    heading={"Cart is empty"}
                                    info={"Add at least one pair to make an order."}
                                    backBtnHandler={closeCart}
                                />

                }
            </div>
        </div>
    );
}

export default CartDrawer;