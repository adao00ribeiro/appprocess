import Router from "next/router";
import { destroyCookie } from "nookies";

export function SignOut() {
    try {
        destroyCookie(undefined, "@nextauth.token")
        Router.push("/");
    } catch (error) {
        console.log("error ao deslogar")
    }
}