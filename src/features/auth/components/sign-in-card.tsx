import React, {useState} from "react";
import {useAuthActions} from "@convex-dev/auth/react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Separator} from "@/components/ui/separator";
import {FaGithub} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import {SignInFlow} from "../types";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export default function SignInCard({setState}: Readonly<SignInCardProps>) {
    const {signIn} = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    /**
     *
     * @Description
     * Kode tersebut adalah sebuah fungsi yang menangani proses masuk (sign-in) menggunakan email dan password.
     * Berikut penjelasan sederhananya:
     * e.preventDefault();
     * Mencegah perilaku default dari form submission agar halaman tidak direfresh.
     * setPending(true);
     * Mengatur status pending menjadi true untuk menunjukkan bahwa proses sign-in sedang berlangsung.
     * signIn("password", {email, password, flow: "signUp"});
     * Memanggil fungsi signIn dengan metode "password" dan mengirimkan objek yang berisi email, password, dan flow "signUp".
     * .catch(() => { // Handle error });
     * Menangani kesalahan jika proses sign-in gagal.
     * .finally(() => { setPending(false); });
     * Mengatur status pending kembali menjadi false setelah proses sign-in selesai, baik berhasil maupun gagal.
     *
     */
    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPending(true);
        signIn("password", {email, password, flow: "signUp"})
            .catch(() => {
                // Handle error
            })
            .finally(() => {
                setPending(false);
            });
    }

    const onProviderSignIn = (value: "github" | "google") => {
        setPending(true);
        signIn(value).finally(() => {
            setPending(false);
        });
    };

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>Login to continue</CardTitle>
                <CardDescription>
                    Use your email or another service to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator/>
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onClick={() => {
                            onProviderSignIn("google");
                        }}
                        variant="outline"
                        size="lg"
                        className="w-full relative"
                    >
                        <FcGoogle className="size-5 absolute top-3 left-2.5"/>
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => {
                            onProviderSignIn("github");
                        }}
                        variant="outline"
                        size="lg"
                        className="w-full relative"
                    >
                        <FaGithub className="size-5 absolute top-3 left-2.5"/>
                        Continue with Github
                    </Button>
                </div>
                <p>
                    Don&apos;t have account?{" "}
                    <button
                        className="text-sky-700 hover:underline cursor-pointer"
                        onClick={() => setState("signUp")}
                    >
                        Sign Up
                    </button>
                </p>
            </CardContent>
        </Card>
    );
}
