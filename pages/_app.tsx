import "../app/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps }: AppProps) {
    const { session, ...rest } = pageProps;
    return (
        <SessionProvider session={session}>
            <Component {...rest} />
        </SessionProvider>
    );
}

export default MyApp;
