import {FC} from "react";
import "../index.css";
import "../css/not-found.css";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import notFoundAnimation from "../assets/loading-pic.png";

const NotFound: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="not-found-page fixed-height">
            {/* <img src="https://www.svgrepo.com/show/310967/location-not-found.svg" className="content__image"/> */}
            <img
                alt="not found page image"
                src={notFoundAnimation}
                className="loading-picture loading-picture--margined"
            />
            <h1 className="content__header">404 {t("not-found.not-found")}</h1>
            <p className="content__link-back">
                {t("not-found.go-to")}{" "}
                <Link to="/">
                    <b>{t("not-found.homepage")}</b>
                </Link>
            </p>
        </div>
    );
};

export default NotFound;
