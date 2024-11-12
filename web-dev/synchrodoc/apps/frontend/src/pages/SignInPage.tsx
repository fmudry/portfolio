import {FC} from "react";
import "../index.css";
import "../css/form.css"
import "../css/sign-in-page.css";
import SignInForm from "@/components/forms/SignIn/signInForm";
import {Separator} from "@/components/ui/separator";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const SignInPage: FC = () => {
    const {t} = useTranslation();

    return (
        <div className="sign-in-page fixed-height">
            <div className="page-content">
                <h1 className="content__title">{t("sign-in.sign-in")}</h1>
                <SignInForm className="form" />
                <Separator className="content__separator" />
                <h2 className="register__text">
                    {t("sign-in.without-acc-question")} <br />{" "}
                    {t("sign-in.register")}{" "}
                    <Link to="/register" className="register-link">
                        {t("sign-in.here")}
                    </Link>
                </h2>
                {/* <Loading version="no-dick" /> */}
            </div>
        </div>
    );
};

export default SignInPage;
