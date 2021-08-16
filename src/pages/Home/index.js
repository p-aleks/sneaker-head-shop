import React from "react";
import {AppContext} from "../../context";
import ProductCard from "../../components/ProductCard";
import styles from "./Home.module.scss";

function Home({ onAddFavorite, onRemoveFavorite, onAddToCart }) {
    const { items, favoriteItems, isDataLoaded } = React.useContext(AppContext);
    const [searchValue, setSearchValue] = React.useState('');
    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const renderCards = () => {
        return isDataLoaded ?
            items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map(item => {
                return (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        imgUrl={item.imgUrl}
                        price={item.price}
                        isInFavorites={!!favoriteItems.filter(obj => obj.id === item.id).length}
                        onAddFavorite={onAddFavorite}
                        onRemoveFavorite={onRemoveFavorite}
                        onAddToCart={onAddToCart}
                    />
                );
            })
            :
            [...Array(16)]
                .map((item, idx) => {
                    return <ProductCard key={idx * 7.5} isLoading={true} />;
                });

    }

    return  (
        <main>
            <div className={`${styles.heading} d-flex align-center justify-between`}>
                <h2>{searchValue ? `Search results by query: "${searchValue}"` : 'All sneakers'}</h2>
                <div className="searchBlock d-flex align-center">
                    <img src="/img/search-icn.svg" alt="search"/>
                    <input className="searchInput" placeholder="Search..." type="text" value={searchValue}
                           onChange={onChangeSearchInput}/>
                </div>
            </div>

            <div className="cards d-flex flex-wrap justify-center mt-40">
                { renderCards() }
            </div>
        </main>
    );
}

export default Home;