import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import SignInApi from "@/api/signInApi";

const useSignIn = () => {
    return useQuery({
        queryKey: ["signIn"],
    });
};

export default useSignIn;
