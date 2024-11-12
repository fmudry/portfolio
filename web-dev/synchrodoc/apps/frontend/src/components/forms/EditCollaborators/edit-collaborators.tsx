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
import "./edit-collaborators.css";
import {editCollaboratorsDetails, NewDocumentDetails} from "@/types/forms";
import {useTranslation} from "react-i18next";
import {PlusIcon, DeleteIcon} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

interface EditCollaboratorsProps {
    form: UseFormReturn<editCollaboratorsDetails | NewDocumentDetails>;
    collaborators: FieldArrayWithId<
        editCollaboratorsDetails,
        "collaborators"
    >[];
    appendCollaborator: (
        value: Partial<{email: string; permission: "READ" | "WRITE"}>
    ) => void;
    removeCollaborator: (index: number) => void;
    className?: string;
}

const EditCollaborators: FC<EditCollaboratorsProps> = ({
    className,
    form,
    collaborators,
    appendCollaborator,
    removeCollaborator,
}: EditCollaboratorsProps) => {
    const {t} = useTranslation();

    return (
        <div className={clsx("flex flex-col gap-5 mt-4", className)}>
            {collaborators.map((item, index) => (
                <div key={item.id} className="flex flex-col gap-2 mt-4">
                    <FormField
                        key={`${item.id}-email`}
                        control={form.control}
                        name={`collaborators.${index}.email`}
                        render={({field}) => (
                            <FormItem className="form__item">
                                <FormLabel htmlFor={item.id}>
                                    <div className="flex gap-3 items-center align-baseline">
                                        {t("docs-forms.collaborator")}
                                    </div>
                                </FormLabel>
                                <FormControl className="flex gap-4">
                                    <div className="flex gap-2">
                                        <Input
                                            id={item.id}
                                            {...field}
                                            placeholder="joe@mama.com"
                                        />
                                        <Button
                                            variant={"destructive"}
                                            onClick={() =>
                                                removeCollaborator(index)
                                            }
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
                        key={`${item.id}-permission`}
                        control={form.control}
                        name={`collaborators.${index}.permission`}
                        render={({field}) => (
                            <FormItem className="space-y-3">
                                <span className="text-sm font-medium mt-2">
                                    {t("docs-forms.permission")}
                                </span>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        className="flex flex-col space-y-1"
                                        defaultValue={item.permission}
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    id={`${field.name}-read`}
                                                    value="READ"
                                                />
                                            </FormControl>
                                            <FormLabel
                                                htmlFor={`${field.name}-read`}
                                                className="font-normal"
                                            >
                                                {t("docs-forms.read")}
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem
                                                    id={`${field.name}-write`}
                                                    value="WRITE"
                                                />
                                            </FormControl>
                                            <FormLabel
                                                htmlFor={`${field.name}-write`}
                                                className="font-normal"
                                            >
                                                {t("docs-forms.write")}
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            ))}
            <Button
                title={t("docs-forms.add-collaborator")}
                onClick={() =>
                    appendCollaborator({email: "", permission: "READ"})
                }
                className="w-full flex gap-2"
                type="button"
            >
                <PlusIcon />
                {t("docs-forms.add-collaborator")}
            </Button>
        </div>
    );
};

export default EditCollaborators;
