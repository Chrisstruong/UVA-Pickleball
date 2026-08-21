import ScrollToProcessButton from "@/components/ScrollToProcessButton";
import {
    ArrowRight,
    Check,
    ChevronDown,
} from "lucide-react";

export default function TryoutDetailsPage() {
    return (
        <main className="bg-white text-[#111827]">
            {/* Hero */}
            <section className="border-b bg-gradient-to-b from-white to-slate-50">
                <div className="mx-auto max-w-[1450px] px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-24">

                    <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">

                        {/* LEFT SIDE */}
                        <div className="max-w-3xl">

                            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#e57200]">
                                Fall 2026 · Tryouts
                            </p>

                            <h1 className="font-bebas mt-4 text-5xl uppercase leading-[0.95] tracking-wide sm:mt-5 sm:text-6xl md:text-7xl lg:text-[88px]">
                                Tryout Details
                            </h1>

                            <div className="mt-8 max-w-xl border-l-2 border-[#e57200] pl-5">
                                <p className="text-sm leading-6 text-slate-700 md:text-base">
                                    UVA Pickleball has three playing groups: General, Social,
                                    and Tournament. Your performance determines your group
                                    for the semester.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=315280905#gid=315280905"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-md bg-[#e57200] px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c95f00]"
                                >
                                    Register for Tryouts
                                    <ArrowRight className="h-4 w-4" />
                                </a>

                                <ScrollToProcessButton />
                            </div>
                        </div>

                        {/* RIGHT SIDE — SCHEDULE */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="w-full max-w-[500px]">

                                <div className="overflow-hidden border border-slate-200 bg-[#232D4B] shadow-sm">
                                    <img
                                        src="/images/2026tryoutschedule.jpg"
                                        alt="Fall 2026 UVA Pickleball tryout schedule"
                                        className="h-auto w-full object-cover"
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Three Ways */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1450px] px-6 py-16 md:px-10 lg:px-16">
                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                            Three Ways To Play
                        </p>

                        <h2 className="font-bebas mt-2 text-4xl uppercase tracking-wide">
                            Find Your Group
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
                            Not sure where you belong? That&apos;s exactly what tryouts are
                            designed to help
                        </p>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
                        <TierCard title="General" highlight />

                        <TierCard
                            title="Social"
                            highlight
                        />

                        <TierCard title="Tournament" highlight />
                    </div>
                </div>
            </section>

            {/* Flow chart */}
            <section id="process" className="w-full bg-white py-16 md:py-24">
                <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-14 text-center">
                        <h2 className="mb-2 text-5xl font-semibold uppercase tracking-[0.2em] text-[#E57200]">
                            Tryout Process
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
                            Every player begins with the same tryout. Your performance
                            determines whether you join General, Social, or advance to
                            callbacks for Tournament Team selection.
                        </p>
                    </div>

                    {/* ====================================================== */}
                    {/* DESKTOP FLOWCHART */}
                    {/* ====================================================== */}

                    <div className="hidden md:block">
                        <div className="mx-auto max-w-5xl">

                            {/* STEP 1 + STEP 2 */}
                            <div className="flex flex-col items-center">

                                <StepLabel>STEP 1</StepLabel>

                                <ProcessBox>
                                    REGISTER FOR TRYOUTS
                                </ProcessBox>

                                <VerticalArrow height={46} />

                                <StepLabel>STEP 2</StepLabel>

                                <ProcessBox>
                                    Main Tryout
                                </ProcessBox>
                            </div>


                            {/* ==================================================
                    FIRST TRYOUT → THREE OUTCOMES
                ================================================== */}

                            <div className="relative mx-auto h-[78px] w-[72%]">

                                {/* Center line down from FIRST TRYOUT */}
                                <div className="absolute left-1/2 top-0 h-7 w-[2px] -translate-x-1/2 bg-black" />

                                {/* Horizontal branching line */}
                                <div className="absolute left-[16.666%] right-[16.666%] top-7 h-[2px] bg-black" />

                                {/* GENERAL vertical branch */}
                                <div className="absolute left-[16.666%] top-7 h-[51px] w-[2px] -translate-x-1/2 bg-black" />

                                {/* SOCIAL vertical branch */}
                                <div className="absolute left-1/2 top-7 h-[51px] w-[2px] -translate-x-1/2 bg-black" />

                                {/* ADVANCE vertical branch */}
                                <div className="absolute left-[83.333%] top-7 h-[51px] w-[2px] -translate-x-1/2 bg-black" />
                            </div>


                            {/* Outcome labels */}
                            <div className="mx-auto grid w-[72%] grid-cols-3">
                                <OutcomeLabel>
                                    GENERAL
                                </OutcomeLabel>

                                <OutcomeLabel>
                                    SOCIAL
                                </OutcomeLabel>

                                <OutcomeLabel orange>
                                    ADVANCE
                                </OutcomeLabel>
                            </div>


                            {/* Arrows from labels to destinations */}
                            <div className="mx-auto grid w-[72%] grid-cols-3">
                                <VerticalArrow height={38} />
                                <VerticalArrow height={38} />
                                <VerticalArrow height={38} />
                            </div>


                            {/* First tryout destinations */}
                            <div className="mx-auto grid w-[72%] grid-cols-3 gap-8">

                                <FinalBox>
                                    GENERAL
                                </FinalBox>

                                <FinalBox>
                                    SOCIAL
                                </FinalBox>

                                <ProcessBox>
                                    CALLBACKS
                                </ProcessBox>
                            </div>


                            {/* ==================================================
                    CALLBACKS → SELECTED → TOURNAMENT TEAM

                    This wrapper uses the SAME grid width as the
                    three destinations above.

                    The content sits only in column 3 so everything
                    stays perfectly centered beneath CALLBACKS.
                ================================================== */}

                            <div className="mx-auto grid w-[72%] grid-cols-3 gap-8">

                                {/* Empty GENERAL column */}
                                <div />

                                {/* Empty SOCIAL column */}
                                <div />

                                {/* ADVANCE / CALLBACK column */}
                                <div className="flex flex-col items-center">

                                    {/* Straight line below CALLBACKS */}
                                    <VerticalLineSimple height={54} />

                                    {/* Selected label */}
                                    <OutcomeLabel>
                                        SELECTED
                                    </OutcomeLabel>

                                    {/* Arrow to Tournament Team */}
                                    <VerticalArrow height={48} />

                                    {/* Final placement */}
                                    <FinalBox>
                                        TOURNAMENT TEAM
                                    </FinalBox>

                                </div>
                            </div>
                        </div>
                    </div>


                    {/* ====================================================== */}
                    {/* MOBILE FLOWCHART */}
                    {/* ====================================================== */}

                    <div className="md:hidden">
                        <div className="flex flex-col items-center">

                            {/* STEP 1 */}
                            <StepLabel>
                                STEP 1
                            </StepLabel>

                            <ProcessBox>
                                REGISTER FOR TRYOUTS
                            </ProcessBox>

                            <VerticalArrow height={36} />


                            {/* STEP 2 */}
                            <StepLabel>
                                STEP 2
                            </StepLabel>

                            <ProcessBox>
                                FIRST TRYOUT
                            </ProcessBox>


                            {/* GENERAL */}
                            <MobileBranchDivider />

                            <MobileBranchLabel>
                                GENERAL
                            </MobileBranchLabel>

                            <VerticalArrow height={30} />

                            <FinalBox>
                                GENERAL
                            </FinalBox>


                            {/* SOCIAL */}
                            <MobileBranchDivider />

                            <MobileBranchLabel>
                                SOCIAL
                            </MobileBranchLabel>

                            <VerticalArrow height={30} />

                            <FinalBox>
                                SOCIAL
                            </FinalBox>


                            {/* ADVANCE */}
                            <MobileBranchDivider />

                            <MobileBranchLabel orange>
                                ADVANCE
                            </MobileBranchLabel>

                            <VerticalArrow height={30} />

                            <ProcessBox>
                                CALLBACKS
                            </ProcessBox>


                            {/* SELECTED */}
                            <VerticalLineSimple height={36} />

                            <MobileBranchLabel>
                                SELECTED
                            </MobileBranchLabel>

                            <VerticalArrow height={30} />

                            <FinalBox>
                                TOURNAMENT TEAM
                            </FinalBox>

                        </div>
                    </div>


                    {/* ====================================================== */}
                    {/* EXPLANATION */}
                    {/* ====================================================== */}

                    <div className="mt-16 border-t border-slate-100 pt-8">
                        <div className="grid gap-8 md:grid-cols-3">

                            {/* General */}
                            <div>
                                <p className="text-[20px] font-bold uppercase tracking-[0.16em] text-[#E57200]">
                                    General
                                </p>

                                <p className="mt-2 text-md leading-6 text-slate-600">
                                    Players may be placed directly into General after
                                    the first tryout.
                                </p>
                            </div>


                            {/* Social */}
                            <div>
                                <p className="text-[20px] font-bold uppercase tracking-[0.16em] text-[#E57200]">
                                    Social
                                </p>

                                <p className="mt-2 text-md leading-6 text-slate-600">
                                    Players may be placed directly into Social after
                                    the first tryout.
                                </p>
                            </div>


                            {/* Tournament */}
                            <div>
                                <p className="text-[20px] font-bold uppercase tracking-[0.16em] text-[#E57200]">
                                    Tournament
                                </p>

                                <p className="mt-2 text-md leading-6 text-slate-600">
                                    Players who advance from the first tryout are invited
                                    to callbacks. Selected players join the Tournament Team.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* FAQ */}
            <section className="bg-white">
                <div className="mx-auto max-w-4xl px-6 py-20 md:px-10">

                    <div className="text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#e57200]">
                            Questions
                        </p>

                        <h2 className="font-bebas mt-3 text-4xl uppercase tracking-wide">
                            Tryout FAQ
                        </h2>
                    </div>

                    <div className="mt-10 space-y-3">

                        <FAQ
                            question="Can everyone try out?"
                            answer="Yes. Tryouts are open to all UVA students, regardless of skill level."
                        />
                        <FAQ
                            question="Do all players attend the same first tryout?"
                            answer="Yes. Everyone starts with the same first tryout. Your performance determines whether you are placed in General, placed in Social, or invited to Tournament Team callbacks."
                        />

                        <FAQ
                            question="What happens after the first tryout?"
                            answer="Players may be placed directly into General or Social. Players who advance will be invited to callbacks for Tournament Team selection."
                        />

                        <FAQ
                            question="What are callbacks?"
                            answer="Callbacks are an additional evaluation for players who advance from the first tryout and are being considered for the Tournament Team."
                        />

                        <FAQ
                            question="What happens if I'm selected at callbacks?"
                            answer="Players selected at callbacks will join the UVA Pickleball Tournament Team."
                        />

                        <FAQ
                            question="What happens if I'm not selected at callbacks?"
                            answer="You directly become a social member."
                        />



                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="bg-[#111827]">
                <div className="mx-auto max-w-[1450px] px-6 py-16 text-center text-white md:px-10 lg:px-16">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e57200]">
                        Fall 2026 Tryouts
                    </p>

                    <h2 className="font-bebas mt-3 text-5xl uppercase tracking-wide">
                        Ready To Get On The Court?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70">
                        Choose the tryout pathway that fits your goals and find your place
                        in UVA Pickleball.
                    </p>

                    <a
                        href="https://docs.google.com/spreadsheets/d/1qt90UR_xtAeMSM6AJRSKwr4VOrTozdMEPMNmA7wGLqk/edit?gid=315280905#gid=315280905"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#e57200] px-7 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#c95f00]"
                    >
                        Register for Tryouts
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </section>
        </main>
    );
}

/* ---------------------------------- */
/* Tier Card                          */
/* ---------------------------------- */

function TierCard({
    title,
    highlight = false,
}: {
    title: string;
    highlight?: boolean;
}) {
    return (
        <div
            className={`rounded-lg border px-6 py-6 text-center ${highlight
                ? "border-[#e57200]/30 bg-[#fff8f2]"
                : "border-slate-200 bg-white"
                }`}
        >
            <p className="text-sm font-bold uppercase tracking-wide">
                {title}
            </p>
        </div>
    );
}

/* ---------------------------------- */
/* Summary Card                       */
/* ---------------------------------- */

function SummaryCard({
    title,
    flow,
}: {
    title: string;
    flow: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#e57200]">
                {title}
            </h3>

            <p className="mt-3 text-lg font-semibold">
                {flow}
            </p>
        </div>
    );
}

/* ---------------------------------- */
/* Check Item                         */
/* ---------------------------------- */

function CheckItem({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e57200]/10">
                <Check className="h-3 w-3 text-[#e57200]" />
            </div>

            <p className="text-sm text-slate-700">
                {children}
            </p>
        </div>
    );
}

/* ---------------------------------- */
/* FAQ                                */
/* ---------------------------------- */

function FAQ({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    return (
        <details className="group rounded-lg border border-slate-200 bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                <span className="text-sm font-semibold">
                    {question}
                </span>

                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t border-slate-100 px-5 py-4">
                <p className="text-sm leading-6 text-slate-600">
                    {answer}
                </p>
            </div>
        </details>
    );
}


/* ========================================================= */
/* FLOWCHART COMPONENTS                                      */
/* ========================================================= */

function StepLabel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#E57200]">
            {children}
        </p>
    );
}


/* --------------------------------------------------------- */
/* Gray process box                                          */
/* --------------------------------------------------------- */

function ProcessBox({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex
                min-h-[78px]
                w-full
                max-w-[250px]
                items-center
                justify-center
                border
                border-neutral-300
                bg-[#F3F3F3]
                px-5
                py-4
                text-center
                shadow-[0_2px_8px_rgba(0,0,0,0.05)]
            "
        >
            <span className="font-bebas text-xl uppercase tracking-[0.04em] text-black lg:text-2xl">
                {children}
            </span>
        </div>
    );
}


/* --------------------------------------------------------- */
/* Orange final placement box                                */
/* --------------------------------------------------------- */

function FinalBox({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                flex
                min-h-[78px]
                w-full
                items-center
                justify-center
                bg-[#E57200]
                px-5
                py-4
                text-center
                shadow-[0_3px_10px_rgba(0,0,0,0.10)]
            "
        >
            <span className="font-bebas text-xl uppercase tracking-[0.04em] text-white lg:text-2xl">
                {children}
            </span>
        </div>
    );
}


/* --------------------------------------------------------- */
/* Branch labels                                             */
/* --------------------------------------------------------- */

function OutcomeLabel({
    children,
    orange = false,
}: {
    children: React.ReactNode;
    orange?: boolean;
}) {
    return (
        <div className="flex justify-center px-2">
            <span
                className={`
                    text-center
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    lg:text-sm
                    ${orange
                        ? "text-[#E57200]"
                        : "text-neutral-700"
                    }
                `}
            >
                {children}
            </span>
        </div>
    );
}


/* --------------------------------------------------------- */
/* Vertical line + arrowhead                                 */
/* --------------------------------------------------------- */

function VerticalArrow({
    height,
}: {
    height: number;
}) {
    return (
        <div
            className="relative mx-auto flex justify-center"
            style={{
                height: `${height}px`,
            }}
        >
            {/* Line */}
            <div className="h-[calc(100%-8px)] w-[2px] bg-black" />

            {/* Arrowhead */}
            <div
                className="
                    absolute
                    bottom-0
                    left-1/2
                    h-0
                    w-0
                    -translate-x-1/2
                    border-l-[5px]
                    border-r-[5px]
                    border-t-[8px]
                    border-l-transparent
                    border-r-transparent
                    border-t-black
                "
            />
        </div>
    );
}


/* --------------------------------------------------------- */
/* Straight vertical connector — NO arrow                    */
/* --------------------------------------------------------- */

function VerticalLineSimple({
    height,
}: {
    height: number;
}) {
    return (
        <div
            className="mx-auto w-[2px] bg-black"
            style={{
                height: `${height}px`,
            }}
        />
    );
}


/* --------------------------------------------------------- */
/* Mobile branch label                                       */
/* --------------------------------------------------------- */

function MobileBranchLabel({
    children,
    orange = false,
}: {
    children: React.ReactNode;
    orange?: boolean;
}) {
    return (
        <p
            className={`
                mt-7
                text-xs
                font-bold
                uppercase
                tracking-[0.14em]
                ${orange
                    ? "text-[#E57200]"
                    : "text-neutral-700"
                }
            `}
        >
            {children}
        </p>
    );
}


/* --------------------------------------------------------- */
/* Mobile visual separator                                   */
/* --------------------------------------------------------- */

function MobileBranchDivider() {
    return (
        <div className="mt-8 h-px w-28 bg-neutral-200" />
    );
}
