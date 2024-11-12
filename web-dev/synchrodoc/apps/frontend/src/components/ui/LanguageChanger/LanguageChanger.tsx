import {FC} from "react";
import "./language-changer.css";
import i18n from "i18next";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Check} from "lucide-react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import clsx from "clsx";
import {ScrollArea} from "../scroll-area";

interface LanguageChangerProps {
    className?: string;
}

const LanguageChanger: FC<LanguageChangerProps> = ({
    className,
}: LanguageChangerProps) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(i18n.language);
    const {t} = useTranslation();

    const languages = [
        {
            value: "cs",
            label: i18n.t('languages.czech'),
        },
        {
            value: "en",
            label: i18n.t('languages.english'),
        },
        {
            value: "sk",
            label: i18n.t('languages.slovak'),
        },
        {
            value: "hu",
            label: i18n.t('languages.hungarian'),
        }
    ];    

    return (
        <div className="language-changer">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        role="combobox"
                        aria-expanded={open}
                        className={clsx("w-[200px] justify-center", className)}
                    >
                        {t("navbar.language-changer")}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[100%] p-0">
                    <Command>
                        <CommandInput
                            placeholder={t(
                                "navbar.language-changer__search-languages"
                            )}
                        />
                        <CommandGroup>
                            <ScrollArea className="h-[150px] w-[350px] rounded-md p-4">
                                {languages.map((language, key) => (
                                    <CommandList key={key}>
                                        <CommandItem
                                            key={language.value}
                                            value={language.value}
                                            onSelect={(currentValue) => {
                                                setValue(
                                                    currentValue === value
                                                        ? ""
                                                        : currentValue
                                                );
                                                setOpen(false);
                                                i18n.changeLanguage(
                                                    language.value
                                                );
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    value === language.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {language.label}
                                        </CommandItem>
                                    </CommandList>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default LanguageChanger;
