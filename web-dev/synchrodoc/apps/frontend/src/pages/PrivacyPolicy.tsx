import {FC} from "react";
import "../index.css";
import "../css/privacy-policy.css";
import {useTranslation} from "react-i18next";

const PrivacyPolicyPage: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="privacy-policy-page fixed-height">
            <div className="content">
                <h1 className="policy-title">
                    {t("privacy-policy.privacy-policy")}
                </h1>

                <h2 className="content__heading">
                    {t("privacy-policy.data-usage.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.data-usage.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.commitment.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.commitment.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.data-collection.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.data-collection.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.data-sharing.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.data-sharing.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.data-protection.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.data-protection.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.your-rights.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.your-rights.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.contact-information.title")}
                </h2>
                <p className="content__paragraph">
                    {t("privacy-policy.contact-information.answer")}
                </p>

                <h2 className="content__heading">
                    {t("privacy-policy.policy-updates.title")}
                </h2>
                <p className="content__paragraph content__paragraph--last">
                    {t("privacy-policy.policy-updates.answer")}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
