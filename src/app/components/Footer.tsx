export default function Footer() {
    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-6xl px-6 py-4 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} UVA Pickleball Club. All rights reserved.
            </div>
        </footer>
    );
}