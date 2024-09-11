import "./globals.css";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";


export default function NotFound() {
    return (
        <div className="text-center p-6">
            <h1 className="text-xl font-bold">Not Found</h1>
            <p>The requested path doesn't exists</p>
            <p>Did you written it correctly?</p>
            <Link href="/" className="mt-3 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition-all ease-in-out w-fit mx-auto flex items-center gap-1">
                <ArrowLeftIcon />
                Go Home
            </Link>
        </div>
    );
}
