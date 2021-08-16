import React from "react";
import ContentLoader from "react-content-loader"
import {AppContext} from "../../context";
import styles from './ProductCard.module.scss';

function ProductCard(
    {
        id,
        imgUrl,
        price,
        title,
        isInFavorites,
        onAddFavorite,
        onRemoveFavorite,
        onAddToCart,
        isLoading = false
    }) {

    const {checkIsInCart, favoriteItems} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(isInFavorites);

    const onClickAddFavorite = () => {
        onAddFavorite(id);
        setIsFavorite(true);
    };

    const onClickRemoveFavorite = () => {
        onRemoveFavorite(favoriteItems.filter(item => Number(item.id) === id));
        setIsFavorite(false);
    };

    const onClickAddToCart = () => {
        onAddToCart(id);
    };

    return (
        <div className={styles.card + ' m-10'}>
            <div className={styles.cardContent + ' pos-r'}>
                {
                    isLoading
                        ?
                        <ContentLoader
                            speed={2}
                            width={150}
                            height={207}
                            viewBox="0 0 150 187"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="10" ry="10" width="150" height="91"/>
                            <rect x="0" y="126" rx="3" ry="3" width="93" height="15"/>
                            <rect x="0" y="107" rx="3" ry="3" width="150" height="15"/>
                            <rect x="0" y="163" rx="8" ry="8" width="80" height="24"/>
                            <rect x="64" y="192" rx="0" ry="0" width="0" height="1"/>
                            <rect x="118" y="155" rx="8" ry="8" width="32" height="32"/>
                        </ContentLoader>
                        :
                        <div>
                            {
                                onAddFavorite
                                &&
                                <button className={styles.addFavoriteBtn + ' pos-a'}
                                        onClick={isFavorite ? onClickRemoveFavorite : onClickAddFavorite}>
                                    <img
                                        width={32}
                                        height={32}
                                        src={isFavorite ? "/sneaker-head-shop/img/added-favorite.svg" : "/sneaker-head-shop/img/add-favorite.svg"}
                                        alt={isFavorite ? "added to favorites" : "add to favorites"}/>
                                </button>
                            }
                            <img width={133} height={112} src={imgUrl} alt="shoes"/>
                            <h4 className={styles.cardProductName}>{title}</h4>
                            <div className="d-flex flex-column">
                                <span className={styles.cardPriceLabel}>Price:</span>
                                <span className={styles.cardPrice}>${price}</span>
                            </div>
                            {
                                onAddToCart
                                &&
                                <button className={styles.addToCartBtn + ' pos-a'}
                                        onClick={!checkIsInCart(id) ? onClickAddToCart : null}>
                                    <img
                                        width={32}
                                        height={32}
                                        src={checkIsInCart(id) ? "/sneaker-head-shop/img/added-cart.svg" : "/sneaker-head-shop/img/add-cart.svg"}
                                        alt={checkIsInCart(id) ? "added to cart" : "add to cart"}/>
                                </button>
                            }
                        </div>
                }
            </div>
        </div>
    );
}

export default ProductCard;