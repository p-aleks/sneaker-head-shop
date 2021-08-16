import React from "react";
import axios from "axios";
import ContentLoader from "react-content-loader"
import {useHistory} from "react-router-dom";
import Info from "../Info";
import OrderCard from "./OrderCard";
import styles from "./Profile.module.scss";

function Profile() {
    const [orders, setOrders] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            try {
                setIsLoaded(false);
                const ordersRes = await axios.get('http://60f2e6966d44f300177887fa.mockapi.io/orders');

                setOrders(ordersRes.data);
                setIsLoaded(true);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const history = useHistory();

    return (
        <main>
            <div className="d-flex align-center justify-between">
                <h2>My orders</h2>
            </div>
            {
                isLoaded ?
                    !orders.length ?
                        <Info
                            style={styles.ordersEmpty + ' text-center'}
                            imgUrl={Math.floor(Math.random() * 2) + 1 === 1 ? 'img/emoji1.png' : 'img/emoji2.png'}
                            imgAlt={"Emoji"}
                            heading={"You don't have any orders yet :("}
                            info={"Order soon and enjoy your new sneakers!"}
                            backBtnHandler={() => history.push('/')}
                        />
                        :
                        <div className={styles.orderCards + " mt-40"}>
                            {
                                orders.map(order =>
                                    <OrderCard
                                        key={`order${order.objID}`}
                                        className={styles.orderCard}
                                        id={order.objID}
                                        items={order.items}
                                        timeOrdered={order.timeOrdered}
                                        price={order.price}
                                    />
                                )
                            }
                        </div>
                    :
                    <div className={styles.orderCardsLoading + " mt-40"}>
                        {
                            [...Array(3)].map((item, idx) => {
                                return <div key={"orderLoader" + idx} className={styles.orderLoader + " mt-40"}>
                                    <ContentLoader
                                        speed={2}
                                        width={250}
                                        height={70}
                                        viewBox="0 0 250 70"
                                        backgroundColor="#f3f3f3"
                                        foregroundColor="#ecebeb"
                                    >
                                        <rect x="0" y="0" rx="0" ry="0" width="108" height="25" />
                                        <rect x="0" y="47" rx="0" ry="0" width="239" height="19" />
                                    </ContentLoader>

                                    <div className={styles.orderLoaderItems + " mt-15"}>
                                        {
                                            [...Array(4)].map((item, idx) => {
                                                return <ContentLoader
                                                    key={"orderItem" + idx}
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
                                                </ContentLoader>
                                            })
                                        }
                                    </div>

                                </div>
                            })
                        }
                    </div>
            }
        </main>
    );
}

export default Profile;