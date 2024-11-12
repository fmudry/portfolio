import {FC} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {Input} from "@/components/ui/input";
import clsx from "clsx";
import "./registerForm.css";
import {registrationValidationSchema} from "validation-schemas/src/forms";
import {PasswordInput} from "@/components/ui/inputPassword";
import {RegistrationDetails} from "@/types/forms";
import {InfoIcon} from "lucide-react";
import {useTranslation} from "react-i18next";
import BaseApi from "@/api/baseApi";
import {useNavigate} from "react-router-dom";

interface RegistrationFromProps {
    className?: string;
}

const RegistrationForm: FC<RegistrationFromProps> = ({
    className,
}: RegistrationFromProps) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const form = useForm<RegistrationDetails>({
        resolver: zodResolver(registrationValidationSchema),
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const onSubmit = async (data: RegistrationDetails) => {
        const res = await BaseApi.post("/auth/register", {
            email: data.email,
            password: data.password,
            confirmPassword: data.passwordConfirm,
        });
        if (res.status === 201) {
            navigate("/sign-in");
            return;
        }
        return false;
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-2", className)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="username"
                                    placeholder="joe@mama.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>
                                <div className="flex gap-3 items-center align-baseline">
                                    {t("register.password")}
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            {" "}
                                            <InfoIcon />
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <>
                                                {t(
                                                    "register.password-criteria"
                                                )}
                                                <ul className="mt-4">
                                                    <li>
                                                        -{" "}
                                                        {t(
                                                            "register.password-rule1"
                                                        )}
                                                    </li>
                                                </ul>
                                            </>
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    autoComplete="new-password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passwordConfirm"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>
                                {t("register.confirm-password")}
                            </FormLabel>
                            <FormControl>
                                <PasswordInput
                                    autoComplete="new-password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    variant={"default"}
                    className="form__button"
                    type="submit"
                >
                    {t("register.submit")}
                </Button>
            </form>
        </Form>
    );
};

export default RegistrationForm;
