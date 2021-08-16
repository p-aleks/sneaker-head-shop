import React from "react";
import {useHistory} from 'react-router-dom';
import {AppContext} from "../../context";
import ProductCard from "../../components/ProductCard";
import styles from './Favorites.module.scss';
import Info from "../../components/Info";

function Favorites({onAddFavorite, onRemoveFavorite, onAddToCart}) {
    const {items, favoriteItems} = React.useContext(AppContext);

    const history = useHistory();

    return (
        <main>
            {
                !favoriteItems.length ?
                    <Info
                        style={styles.favoritesEmpty + ' text-center'}
                        imgUrl={Math.floor(Math.random() * 2) + 1 === 1 ? '/img/emoji1.png' : '/img/emoji2.png'}
                        imgAlt={"Emoji"}
                        heading={"You don't have any favorites :("}
                        info={"You didn't add anything to favorites yet"}
                        backBtnHandler={() => history.push('/')}
                    />
                    :
                    <div>
                        <div className="d-flex align-center justify-between">
                            <h2>My favorites</h2>
                        </div>
                        <div className="cards d-flex flex-wrap justify-center mt-40">
                            {
                                items.filter(item => {
                                    return favoriteItems.some(obj => {
                                        return Number(item.id) === Number(obj.id);
                                    })
                                }).map(item => {
                                    return (
                                        <ProductCard
                                            key={item.id}
                                            id={Number(item.id)}
                                            title={item.title}
                                            imgUrl={item.imgUrl}
                                            price={item.price}
                                            isInFavorites={!!favoriteItems.filter(obj => Number(obj.id) === Number(item.id)).length}
                                            onAddFavorite={onAddFavorite}
                                            onRemoveFavorite={onRemoveFavorite}
                                            onAddToCart={onAddToCart}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
            }
        </main>
    );
}

export default Favorites;