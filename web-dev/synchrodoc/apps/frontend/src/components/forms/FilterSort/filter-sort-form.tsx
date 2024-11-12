import {FC, ReactNode} from "react";
import {FilterSortDetails} from "@/types/forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import clsx from "clsx";
import "./filter-sort-form.css";
import {filterValidationSchema} from "validation-schemas/src/forms";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {useTranslation} from "react-i18next";
import {Button} from "@/components/ui/button";
import {CalendarIcon, InfoIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";

interface FilterSortFormProps {
    children: ReactNode;
    className?: string;
}

const FilterSortForm: FC<FilterSortFormProps> = ({
    className,
    children,
}: FilterSortFormProps) => {
    const {t} = useTranslation();

    const form = useForm<FilterSortDetails>({
        resolver: zodResolver(filterValidationSchema),
        mode: "onSubmit",
        defaultValues: {
            filterTags: "",
        },
    });

    const onSubmit = (data: FilterSortDetails) => {
        // TODO, use hook

        console.log("hihii: " + data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8", className)}
            >
                <FormField
                    control={form.control}
                    name="filterTags"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>
                                <div className="flex gap-3 items-center align-baseline">
                                    {t("docs-forms.filter-by-tags")}
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <InfoIcon />
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <>
                                                {t(
                                                    "docs-forms.filter-tags-rule"
                                                )}
                                                <ul className="mt-4">
                                                    <li>
                                                        {t(
                                                            "docs-forms.filter-tags-example"
                                                        )}
                                                    </li>
                                                </ul>
                                            </>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="tag1, tag2, tag3"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="filterFromDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                {t("docs-forms.filter-from-date")}
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={clsx(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                field.value.toLocaleDateString()
                                            ) : (
                                                <span>
                                                    {t(
                                                        "docs-forms.pick-a-date"
                                                    )}
                                                </span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="filterToDate"
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                {t("docs-forms.filter-to-date")}
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={clsx(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                field.value.toLocaleDateString()
                                            ) : (
                                                <span>
                                                    {t(
                                                        "docs-forms.pick-a-date"
                                                    )}
                                                </span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() ||
                                            date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {children}
            </form>
        </Form>
    );
};

export default FilterSortForm;
