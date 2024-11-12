import {FC} from "react";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {SheetClose, SheetFooter} from "../sheet";
import {Button} from "../button";

interface DataTableFormFooterProps {
    rejectButtonTranslation: string;
    acceptButtonTranslation: string;
    acceptButtonIsDestructive?: boolean;
    className?: string;
    documentId?: string;
}

const DataTableFormFooter: FC<DataTableFormFooterProps> = ({
    className,
    rejectButtonTranslation,
    acceptButtonTranslation,
    acceptButtonIsDestructive,
}: DataTableFormFooterProps) => {
    const {t} = useTranslation();

    return (
        <SheetFooter
            className={clsx(
                "flex-row justify-between mt-16 gap-2 md:justify-end",
                className
            )}
        >
            <SheetClose asChild>
                <Button className="w-full md:w-min" variant={"secondary"}>
                    {t(rejectButtonTranslation)}
                </Button>
            </SheetClose>
            <Button
                className="w-full md:w-min"
                type="submit"
                variant={acceptButtonIsDestructive ? "destructive" : "default"}
            >
                {t(acceptButtonTranslation)}
            </Button>
        </SheetFooter>
    );
};

export default DataTableFormFooter;
