import {FC} from "react";
import "./loading.css";
import {useTranslation} from "react-i18next";
import ReactLoading from "react-loading";
import loadingPicture from "../../../assets/loading-pic.png";

interface LoadingProps {
    chance: number;
}

const Loading: FC<LoadingProps> = ({chance}: LoadingProps) => {
    const {t} = useTranslation();

    const version =  Math.random() < chance / 100 ? "with-dick" : "no-dick";

    return (
        <div className="loading">
            <p className="loading-text">{t("loading")}</p>
            {version === "no-dick" ? (
                <ReactLoading
                    type="spinningBubbles"
                    color="#686D76"
                    height={"10%"}
                    width={"10%"}
                />
            ) : (
                <img
                    alt="loading..."
                    src={loadingPicture}
                    className="loading-picture"
                />
            )}
        </div>
    );
};

export default Loading;
