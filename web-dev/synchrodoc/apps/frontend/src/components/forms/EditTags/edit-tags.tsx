import {FC} from "react";
import {FieldArrayWithId, UseFormReturn} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import clsx from "clsx";
import "./edit-tags.css";
import {EditTagsDetails, NewDocumentDetails} from "@/types/forms";
import {useTranslation} from "react-i18next";
import {PlusIcon, DeleteIcon, ChevronsUpDown, Check} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {ScrollArea} from "@/components/ui/scroll-area";
import ColorTextCouple from "@/components/ui/color-text-couple";

interface EditTagsProps {
    form: UseFormReturn<EditTagsDetails | NewDocumentDetails>;
    tags: FieldArrayWithId<EditTagsDetails, "tags">[];
    appendTag: (value: Partial<{name: string; color: string}>) => void;
    removeTag: (index: number) => void;
    className?: string;
}

const tagColors = [
    {label: "black", value: "#000000"}, // default color - do not delete
    {label: "orange", value: "orange"},
    {label: "blue", value: "blue"},
    {label: "yellow", value: "yellow"},
    {label: "purple", value: "purple"},
    {label: "cyan", value: "cyan"},
];

const EditTags: FC<EditTagsProps> = ({
    className,
    form,
    tags,
    appendTag,
    removeTag,
}: EditTagsProps) => {
    const {t} = useTranslation();

    return (
        <div className={clsx("flex flex-col gap-8 mt-4", className)}>
            {tags.map((item, index) => (
                <div className="flex flex-col gap-4" key={item.id}>
                    <FormField
                        key={item.id}
                        control={form.control}
                        name={`tags.${index}.name`}
                        render={({field}) => (
                            <FormItem className="form__item">
                                <FormLabel htmlFor={item.id}>
                                    <div className="flex gap-3 items-center align-baseline">
                                        {t("docs-forms.tag-attributes")}
                                    </div>
                                </FormLabel>
                                <FormControl className="flex gap-4">
                                    <div className="flex gap-2">
                                        <Input
                                            id={item.id}
                                            {...field}
                                            placeholder="Joe"
                                        />
                                        <Button
                                            variant={"destructive"}
                                            onClick={() => removeTag(index)}
                                        >
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        key={`${item.id}-color`}
                        control={form.control}
                        name={`tags.${index}.color`}
                        render={({field}) => (
                            <FormItem className="form__item">
                                {/* <FormLabel htmlFor={`${item.id}-color`}>
                    <div className="flex gap-3 items-center align-baseline">
                      {t('docs-forms.tag-color')}
                    </div>
                  </FormLabel> */}
                                <FormControl className="flex gap-4">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    className={clsx(
                                                        "w-full justify-between",
                                                        !field.value &&
                                                            "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        <ColorTextCouple
                                                            color={
                                                                tagColors.find(
                                                                    (color) =>
                                                                        color.value ===
                                                                        field.value
                                                                )?.value ||
                                                                "black"
                                                            }
                                                            name={
                                                                tagColors.find(
                                                                    (color) =>
                                                                        color.value ===
                                                                        field.value
                                                                )?.label ||
                                                                "black"
                                                            }
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[220px] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder={t(
                                                        "docs-forms.search-color"
                                                    )}
                                                />
                                                <CommandEmpty>
                                                    {t(
                                                        "docs-forms.no-color-found"
                                                    )}
                                                </CommandEmpty>
                                                <ScrollArea className="h-[150px] rounded-md px-2 mr-1">
                                                <CommandGroup >                                                    
                                                        {tagColors.map(
                                                            (color) => (
                                                                <CommandList
                                                                    key={
                                                                        color.value
                                                                    }
                                                                >
                                                                    <CommandItem
                                                                        value={
                                                                            color.value
                                                                        }
                                                                        key={
                                                                            color.value
                                                                        }
                                                                        onSelect={() => {
                                                                            form.setValue(
                                                                                `tags.${index}.color`,
                                                                                color.value
                                                                            );
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={clsx(
                                                                                "mr-2 h-4 w-4",
                                                                                color.value ===
                                                                                    field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        <ColorTextCouple
                                                                            name={
                                                                                color.label
                                                                            }
                                                                            color={
                                                                                color.value
                                                                            }
                                                                        />
                                                                    </CommandItem>
                                                                </CommandList>
                                                            )
                                                        )}
                                                </CommandGroup>
                                                </ScrollArea>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ))}
            <Button
                title={t("docs-forms.add-tag")}
                onClick={() => appendTag({name: "", color: "orange"})}
                className="w-full flex gap-2"
                type="button"
            >
                <PlusIcon />
                {t("docs-forms.add-tag")}
            </Button>
        </div>
    );
};

export default EditTags;
