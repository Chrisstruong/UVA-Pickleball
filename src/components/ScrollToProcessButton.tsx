// components/ScrollToProcessButton.tsx

"use client";

export default function ScrollToProcessButton() {
    const handleClick = () => {
        document.getElementById("process")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate-700 transition hover:border-[#e57200] hover:text-[#e57200]"
        >
            How Tryouts Work
        </button>
    );
}