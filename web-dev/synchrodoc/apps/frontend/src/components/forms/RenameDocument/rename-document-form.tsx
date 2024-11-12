import {FC, ReactNode} from "react";
import {RenameDocumentDetails} from "@/types/forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {renameDocumentValidationSchema} from "validation-schemas/src/forms";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import clsx from "clsx";
import "./rename-document-form.css";
import {useTranslation} from "react-i18next";
import {useDocEdit} from "@/hooks/useDocs";

interface RenameDocumentProps {
    children: ReactNode;
    className?: string;
    documentId: string;
}

const RenameDocumentForm: FC<RenameDocumentProps> = ({
    className,
    children,
    documentId,
}: RenameDocumentProps) => {
    const {t} = useTranslation();

    const form = useForm<RenameDocumentDetails>({
        resolver: zodResolver(renameDocumentValidationSchema),
        defaultValues: {
            title: "",
        },
    });
    const {mutateAsync: editDoc} = useDocEdit(documentId);

    const onSubmit = (data: RenameDocumentDetails) => {
        try {
            if (documentId === undefined) throw new Error();
            // TS gives us error because types are incorrect, but this works atm
            editDoc({newTitle: data.title});
        } catch (e) {
            console.log(e);
        }
        // TODO - USE TOAST HERE

        console.log("hi: " + data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8 mt-4", className)}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>{t("docs-forms.title")}</FormLabel>
                            <FormControl>
                                <Input placeholder="Joe mama" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {children}
            </form>
        </Form>
    );
};

export default RenameDocumentForm;
