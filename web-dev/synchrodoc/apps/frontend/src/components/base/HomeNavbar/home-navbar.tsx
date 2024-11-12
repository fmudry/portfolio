import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FC} from "react";
import "./home-navbar.css";
import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageChanger from "@/components/ui/LanguageChanger/LanguageChanger";
import ModeToggle from "@/components/ui/mode-toggle";
import {useAuth} from "@/hooks/AuthProvider";

const HomeNavbar: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <nav className="home-navbar">
            <Link className="home-navbar__link" to="/">
                <img
                    id="logo"
                    src="https://www.svgrepo.com/show/226656/check-mark-notepad.svg"
                    alt="logo"
                />
                <p className="home-navbar__text">SynchroDoc</p>
            </Link>
            <Popover>
                <PopoverTrigger className="home-navbar__button">
                    ...
                </PopoverTrigger>
                <PopoverContent className="home-navbar__popover">
                    <Link to="/privacy-policy">
                        <Button className="popover__link">
                            {t("navbar.privacy-policy")}
                        </Button>
                    </Link>
                    <a
                        target="_blank"
                        href="https://cs.wikipedia.org/wiki/Miroslav_Žbirka"
                    >
                        <Button className="popover__link">
                            {t("navbar.user-guide")}
                        </Button>
                    </a>
                    <LanguageChanger className="popover__link" />
                    <ModeToggle className="popover__link" />
                    {auth.isAuth && (
                        <Button
                            onClick={async () => {
                                await auth.logOut();
                                navigate("/");
                            }}
                        >
                            {t('navbar.logout')}
                        </Button>
                    )}
                </PopoverContent>
            </Popover>
        </nav>
    );
};

export default HomeNavbar;
