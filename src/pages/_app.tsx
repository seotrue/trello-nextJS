import wrapper from "@/store";
import type { AppProps } from "next/app";

import "@/styles/App.css"
import "@/styles/Board.css"
import "@/styles/Card.css"
import "@/styles/CardEditor.css"
import "@/styles/EditButtons.css"
import "@/styles/List.css"
import "@/styles/ListEditor.css"

function MyApp({ Component, pageProps }:AppProps) {
    return (
        <div className="App">
            <Component {...pageProps} />
        </div>
    );
}

export default wrapper.withRedux(MyApp)