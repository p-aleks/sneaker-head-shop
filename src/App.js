import React from "react";
import axios from 'axios';
import {Route, Switch} from "react-router-dom";
import {AppContext} from "./context";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Profile from "./components/Profile";


function App() {
    const [isShownCart, setIsShownCart] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [cartItemsRes, favoritesRes, itemsRes] = await Promise.all([
                    axios.get('https://60f2e6966d44f300177887fa.mockapi.io/cart/0'),
                    axios.get('https://60f2e6966d44f300177887fa.mockapi.io/favorites'),
                    axios.get('https://60f2e6966d44f300177887fa.mockapi.io/products')
                ]);


                setCartItems(cartItemsRes.data.items);
                setFavoriteItems(favoritesRes.data);
                setItems(itemsRes.data);
                setIsDataLoaded(true);
            } catch (e) {
                console.error(e);
            }
        }

        fetchData();
    }, []);

    const checkIsInCart = (id) => {
        return !!cartItems.filter(obj => obj.itemId === id).length;
    }

    const onAddToCart = (id) => {
        if (cartItems.filter(obj => Number(obj.itemID) === Number(id)).length) {
            return;
        }

        async function postData() {
            try {
                const newCart = [...cartItems, {itemId: id}];
                const newCartItems = await axios.put('https://60f2e6966d44f300177887fa.mockapi.io/cart/0', {items: newCart});

                setCartItems(newCartItems.data.items);
            } catch (e) {
                console.error(e);
            }
        }

        postData();
    };

    const onRemoveFromCart = ([cartItem]) => {
        if (!cartItems.filter(obj => obj.itemId === cartItem.itemId).length) {
            return;
        }

        async function postData() {
            try {
                const newCart = cartItems.filter(obj => obj.itemId !== cartItem.itemId);
                const newCartItems = await axios.put('https://60f2e6966d44f300177887fa.mockapi.io/cart/0', {items: newCart});

                setCartItems(newCartItems.data.items);
            } catch (e) {
                console.error(e);
            }
        }

        postData();
    };

    const onAddFavorite = async (id) => {
        try {
            await axios.post('https://60f2e6966d44f300177887fa.mockapi.io/favorites', {id})
                .then(res => setFavoriteItems(prev => [res.data, ...prev]));
        } catch (e) {
            console.error(e);
        }
    }

    const onRemoveFavorite = async ([favoriteItem]) => {
        try {
            setFavoriteItems(prev => prev.filter(item => item.id !== favoriteItem.id));
            await axios.delete(`https://60f2e6966d44f300177887fa.mockapi.io/favorites/${favoriteItem.objID}`);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favoriteItems,
                setCartItems,
                orders,
                setOrders,
                checkIsInCart,
                isDataLoaded,
                setIsShownCart,
            }}>
            <div className="wrapper pb-15 clear">

                <CartDrawer
                    onRemoveFromCart={onRemoveFromCart}
                    isOpen={isShownCart}
                />


                <Header/>


                <Switch>
                    <Route path="/sneaker-head-shop/favorites">
                        <Favorites
                            onAddFavorite={onAddFavorite}
                            onRemoveFavorite={onRemoveFavorite}
                            onAddToCart={onAddToCart}
                        />
                    </Route>
                    <Route path="/sneaker-head-shop/profile">
                        <Profile/>
                    </Route>
                    <Route path="/sneaker-head-shop">
                        <Home
                            onAddFavorite={onAddFavorite}
                            onRemoveFavorite={onRemoveFavorite}
                            onAddToCart={onAddToCart}
                        />
                    </Route>
                </Switch>
            </div>
        </AppContext.Provider>
    );
}

export default App;
