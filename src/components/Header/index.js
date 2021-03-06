import React from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../../context";

function Header() {
    const {items, checkIsInCart, setIsShownCart} = React.useContext(AppContext);
    const openCart = () => {
        document.body.style.overflow = "hidden";
        setIsShownCart(true);
    };
    return (
        <header className="d-flex justify-between p-45">
            <Link to="/sneaker-head-shop">
                <div className="headerLeft d-flex">
                    <img width={40} height={40} src="/sneaker-head-shop/img/logo.svg" alt="logo"/>
                    <div className="headerInfo ml-15">
                        <h3>Sneaker Heads</h3>
                        <p>Shop for best sneakers!</p>
                    </div>
                </div>
            </Link>
            <div className="headerRight d-flex align-center">
                <ul className="d-flex">
                    <li className="cart cu-p d-flex align-center mr-30" onClick={openCart}>
                        <img width={18} height={18} src="/sneaker-head-shop/img/cart.svg" alt="cart"/>
                        <span className="ml-10">
                            {
                                `$ ${items.filter(item => checkIsInCart(item.id))
                                    .reduce((a, c) => a + c.price, 0)}`
                            }
                        </span>
                    </li>
                    <li className="d-flex align-center mr-30">
                        <Link to="/sneaker-head-shop/favorites" className="d-flex">
                            <img width={20} height={20} src="/sneaker-head-shop/img/favorites.svg" alt="favorite"/>
                        </Link>
                    </li>
                    <li className="d-flex align-center">
                        <Link to="/sneaker-head-shop/profile" className="d-flex">
                            <img width={20} height={20} src="/sneaker-head-shop/img/profile.svg" alt="profile"/>
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;