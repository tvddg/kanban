import Link from "next/link";

export default function NotFound() {
    return <div className="flex flex-col gap-4 h-dvh items-center">
        <h1 className="mt-52 text-8xl text-gray-300 font-medium">404</h1>
        <h2 className="mt-5 text-3xl text-center max-w-10/12">The page you are trying to access does not exist</h2>
        <Link 
            href="/"
            className="text-xl opacity-45 hover:scale-103 hover:opacity-100 active:scale-95 transition-all duration-200"
        >
            To the home page
        </Link>
    </div>
}