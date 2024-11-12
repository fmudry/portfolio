import {FC} from "react";
import "./docs-navbar.css";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import clsx from "clsx";

import {HomeIcon} from "lucide-react";
import {Share2Icon} from "lucide-react";
import {Trash2Icon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {SquarePlusIcon} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import NewDocumentForm from "@/components/forms/NewDocument/new-document-form";
import DataTableFormFooter from "@/components/ui/DataTable/forms-footer";
import {Link} from "react-router-dom";

interface DocsNavbarProps {
    className?: string;
}

const DocsNavbar: FC<DocsNavbarProps> = ({className}: DocsNavbarProps) => {
    const {t} = useTranslation();

    // CONNECT THIS COMPONENT WITH DATA TABLE

    return (
        <nav className={clsx("docs-navbar", className)}>
            <Sheet>
                <SheetTrigger className="flex" asChild>
                    <Button
                        name={t("docs-navbar.new")}
                        variant={"default"}
                        className="docs-navbar__button docs-navbar__button--add-button"
                    >
                        <SquarePlusIcon />
                        <span className="docs-navbar__text">
                            {t("docs-navbar.new")}
                        </span>
                    </Button>
                </SheetTrigger>
                <SheetContent className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>{t("docs.create-new")}</SheetTitle>
                        <SheetDescription>
                            {t("docs.create-new-description")}
                        </SheetDescription>
                    </SheetHeader>

                    <NewDocumentForm
                        children={
                            <DataTableFormFooter
                                acceptButtonTranslation="docs.create"
                                rejectButtonTranslation="docs.cancel"
                            />
                        }
                    />
                </SheetContent>
            </Sheet>
            <Separator className="docs-navbar__separator" />
            <Button
                name={t("docs-navbar.home")}
                variant={"link"}
                className="docs-navbar__button"
                onClick={() => {}}
            >
                <Link to="/docs" className="flex justify-center items-center">
                    <HomeIcon />{" "}
                    <span className="docs-navbar__text">
                        {t("docs-navbar.home")}
                    </span>
                </Link>
            </Button>
            <Button
                name={t("docs-navbar.shared")}
                variant={"link"}
                className="docs-navbar__button"
                onClick={() => {}}
            >
                <Link
                    to="/docs-shared"
                    className="flex justify-center items-center"
                >
                    <Share2Icon />{" "}
                    <span className="docs-navbar__text">
                        {t("docs-navbar.shared")}
                    </span>
                </Link>
            </Button>
            <Button
                name={t("docs-navbar.trash-bin")}
                variant={"link"}
                className="docs-navbar__button"
                onClick={() => {}}
            >
                <Link
                    to="/docs-bin"
                    className="flex justify-center items-center"
                >
                    <Trash2Icon />{" "}
                    <span className="docs-navbar__text">
                        {t("docs-navbar.trash-bin")}
                    </span>
                </Link>
            </Button>
        </nav>
    );
};

export default DocsNavbar;
