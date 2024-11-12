import {FC} from "react";
import {SignInDetails} from "@/types/forms";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {signInValidationSchema} from "validation-schemas";
import {Button} from "@/components/ui/button";
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
import {PasswordInput} from "@/components/ui/inputPassword";
import "./signInForm.css";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/hooks/AuthProvider";
import {useNavigate} from "react-router-dom";

interface SignInFormProps {
    className?: string;
}

const SignInForm: FC<SignInFormProps> = ({className}: SignInFormProps) => {
    const {t} = useTranslation();
    const auth = useAuth();
    const navigate = useNavigate();

    const form = useForm<SignInDetails>({
        resolver: zodResolver(signInValidationSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: SignInDetails) => {
        console.log(auth);
        const isAuth = await auth.loginAction(data);
        if (isAuth) {
            navigate("/");
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={clsx("space-y-8", className)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem className="form__item">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="joe@mama.com" autoComplete="username" {...field} />
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
                            <FormLabel>{t("sign-in.password")}</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    autoComplete="current-password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className="form__button"
                    variant={"default"}
                    type="submit"
                >
                    {t("sign-in.submit")}
                </Button>
            </form>
        </Form>
    );
};

export default SignInForm;
