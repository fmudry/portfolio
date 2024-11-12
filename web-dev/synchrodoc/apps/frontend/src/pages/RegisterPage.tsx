import {FC} from "react";
import "../index.css";
import "../css/form.css"
import "../css/register-page.css";
import {Separator} from "@/components/ui/separator";
import RegistrationForm from "@/components/forms/Register/RegisterForm";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const RegisterPage: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="register-page fixed-height">
            <div className="page-content">
                <h1 className="content__title">{t("register.register")}</h1>
                <RegistrationForm className="form" />
                <Separator className="content__separator" />
                <h2 className="sign-in__text">
                    {t("register.have-acc-question")} <br />{" "}
                    {t("register.sign-in")}{" "}
                    <Link to="/sign-in" className="sign-in-link">
                        {t("register.here")}
                    </Link>
                </h2>
            </div>
        </div>
    );
};

export default RegisterPage;
