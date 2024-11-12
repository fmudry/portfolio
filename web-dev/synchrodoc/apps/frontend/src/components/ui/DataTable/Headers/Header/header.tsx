import {FC} from "react";
import {useTranslation} from "react-i18next";
import "./header.css";
import clsx from "clsx";

interface HeaderProps {
  translation: string;
  disappearing: boolean;
  className?: string;
}

const Header: FC<HeaderProps> = ({
  className,
  disappearing,
  translation,
}: HeaderProps) => {
    const {t} = useTranslation();

    return <div className={clsx("table-header", disappearing ? "table-header__disappearing" : null, className)}>{t(translation)}</div>;
};

export default Header;
