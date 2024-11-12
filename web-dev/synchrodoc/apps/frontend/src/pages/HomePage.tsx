import { FC } from "react";
import "../index.css";
import "../css/homepage.css";
import { Button } from "@/components/ui/button";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import collaborationTeam from "../assets/collaboration-team.svg";
import growth from "../assets/growth.svg";
import communication from "../assets/communication.svg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage: FC = () => {
    const { t } = useTranslation();

    const images = [collaborationTeam, growth, communication];
    const slideTexts = ["main.collaboration", "main.growth", "main.communication"];

    const properties = {
        prevArrow: <button></button>,
        nextArrow: <button></button>,
        easing: "cubic",
        duration: 2500,
        canSwipe: false,
        transitionDuration: 750,
        pauseOnHover: false,
    };

    const cardData = [
        {
            imgSrc: "https://www.svgrepo.com/show/226626/network-group.svg",
            header: "main.card1.header",
            description: "main.card1.description",
        },
        {
            imgSrc: "https://www.svgrepo.com/show/226634/boss-scheme.svg",
            header: "main.card2.header",
            description: "main.card2.description",
        },
    ];

    const faqItems = [
        "data-secure",
        "access-shared",
        "resolve-edit",
        "support",
        "notify-changes"
    ];

    return (
        <div className="homepage">
            <div className="margin-container">
                <div className="homepage__animated">
                    <Slide {...properties}>
                        {images.map((image, index) => (
                            <div key={index} className="each-slide-effect">
                                <div
                                    className="animated__background-picture"
                                    style={{ backgroundImage: `url(${image})` }}
                                >
                                    <span className="slide__text">{t(slideTexts[index])}</span>
                                </div>
                            </div>
                        ))}
                    </Slide>
                    <h1 className="animated__text">SynchroDoc</h1>
                </div>
                <div className="homepage__content">
                    <div className="homepage__content-buttons">
                        <Link to="/sign-in">
                            <Button
                                className="content__sign-in-button"
                                variant="secondary"
                                size="lg"
                            >
                                {t("main.sign-in-btn")}
                            </Button>
                        </Link>
                        <Link to="/docs">
                            <Button
                                className="content__docs-button"
                                variant="secondary"
                                size="lg"
                            >
                                {t("main.my-docs")}
                            </Button>
                        </Link>
                    </div>
                    <h2 className="content__description">{t("main.description")}</h2>
                    <div className="content__cards">
                        {cardData.map((card, index) => (
                            <Card key={index} className="card">
                                <CardContent className="card__content">
                                    <img alt="card image" src={card.imgSrc} />
                                </CardContent>
                                <CardHeader className="card__details">
                                    <CardTitle className="card__title">
                                        {t(card.header)}
                                    </CardTitle>
                                    <CardDescription>
                                        {t(card.description)}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    <div className="content__faq">
                        <h2 className="faq__header">FAQ</h2>
                        <Accordion className="faq__accordion" type="single" collapsible>
                            {faqItems.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index + 1}`}>
                                    <AccordionTrigger>{t(`faq.${item}.question`)}</AccordionTrigger>
                                    <AccordionContent>{t(`faq.${item}.answer`)}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
