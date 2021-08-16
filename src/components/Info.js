import React from "react";

const Info = ({style, imgUrl, imgAlt, heading, info, backBtnHandler}) => {
    return (
        <div className={style}>
            <img width={120} src={imgUrl} alt={imgAlt}/>
            <h4 className="mt-20 mb-10">{heading}</h4>
            <p className="mt-5 mb-15">{info}</p>
            <button className="btnGreen btnBack mt-25" onClick={backBtnHandler}>
                <span>
                    Back
                </span>
                <img src="/img/arrow-left.svg" alt="arrow"/>
            </button>
        </div>
    )
};

export default Info;