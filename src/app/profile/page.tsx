"use client";

import { useEffect, useMemo, useState } from "react";
import {
    AtSign,
    BadgeCheck,
    CircleUserRound,
    Flame,
    Medal,
    Pencil,
    ShieldCheck,
    Sofa,
    Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const supabase = useMemo(() => createClient(), []);

    const [email, setEmail] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(true);

    // Temporary values until we connect the profiles table
    const [fullName, setFullName] = useState("");
    const [group, setGroup] = useState("");
    const [membershipStatus, setMembershipStatus] = useState("");
    const [tryoutResult, setTryoutResult] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                router.replace("/login");
                return;
            }

            setEmail(user.email ?? "");

            const { data: profile, error } = await supabase
                .from("profiles")
                .select(
                    "full_name, avatar_url, club_group, membership_status, tryout_result, email_verified"
                )
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("Error loading profile:", error);
                setLoading(false);
                return;
            }

            setFullName(profile.full_name ?? "");
            setAvatarUrl(profile.avatar_url ?? null);
            setGroup(profile.club_group ?? "");
            setMembershipStatus(profile.membership_status ?? "Pending");
            setTryoutResult(profile.tryout_result ?? "");
            setEmailVerified(profile.email_verified ?? false);
            setLoading(false);
        };

        getProfile();
    }, [supabase, router]);

    if (loading) {
        return (
            <main className="min-h-[70vh] bg-[#fbf7f4]">
                <div className="mx-auto max-w-[1400px] px-6 py-20">
                    <p className="text-slate-600">Loading profile...</p>
                </div>
            </main>
        );
    }

    const handleSaveProfile = async () => {
        const trimmedName = editedName.trim();

        if (!trimmedName) {
            setSaveError("Please enter your name.");
            return;
        }

        setSaving(true);
        setSaveError("");

        const { error } = await supabase.rpc("update_my_profile", {
            new_full_name: trimmedName,
            new_avatar_url: avatarUrl,
        });

        if (error) {
            console.error(error);
            setSaveError("Unable to update your profile.");
            setSaving(false);
            return;
        }

        setFullName(trimmedName);
        setSaving(false);
        setIsEditing(false);
    };

    return (
        <main className="min-h-screen bg-[#fbf7f4] text-[#07192d]">
            <section className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 lg:py-20">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="font-bebas text-5xl uppercase tracking-wide text-[#07192d] md:text-6xl">
                        My Profile
                    </h1>

                    <p className="mt-3 text-sm text-[#503c35] md:text-base">
                        Manage your club profile and view your membership information.
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[310px_1fr] xl:grid-cols-[330px_1fr]">
                    {/* LEFT PROFILE CARD */}
                    <aside className="rounded-xl bg-white px-7 py-10 shadow-sm">
                        <div className="flex flex-col items-center text-center">
                            {/* Avatar */}
                            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#07192d] shadow-lg">
                                <CircleUserRound className="h-16 w-16 text-white" />
                            </div>

                            {/* Name */}
                            <h2 className="mt-7 text-2xl font-bold text-[#07192d]">
                                {fullName || "Add Your Name"}
                            </h2>

                            {/* Badges */}
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                                <div
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${emailVerified
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-amber-50 text-amber-700"
                                        }`}
                                >
                                    <BadgeCheck className="h-3.5 w-3.5" />
                                    {emailVerified ? "Verified UVA" : "Email Unverified"}
                                </div>

                                {group ? (
                                    <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#E57200]">
                                        <Flame className="h-3.5 w-3.5" />
                                        {group} Group
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-500">
                                        Group Pending
                                    </div>
                                )}
                            </div>

                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() => {
                                    setEditedName(fullName);
                                    setSaveError("");
                                    setIsEditing(true);
                                }}
                                className="mt-12 flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#07192d] transition hover:border-[#E57200] hover:text-[#E57200]"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit Profile
                            </button>
                        </div>
                    </aside>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-7">
                        {/* TRYOUT RESULT HERO */}
                        <section className="relative overflow-hidden rounded-xl bg-[#07192d] px-7 py-9 text-white shadow-lg md:px-10 md:py-10">
                            {/* Decorative diagonal lines */}
                            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                                <div className="absolute left-[28%] top-[-60px] h-[500px] w-px rotate-[-18deg] bg-white/10" />
                                <div className="absolute right-[15%] top-[-80px] h-[700px] w-px rotate-[80deg] bg-white/10" />
                                <div className="absolute right-[10%] top-[110px] h-[700px] w-px rotate-[80deg] bg-white/10" />
                            </div>

                            <div className="relative flex flex-col gap-7 md:flex-row md:items-center">
                                {/* Medal icon */}
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#E57200]">
                                    <Medal className="h-10 w-10 text-white" />
                                </div>

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em]">
                                        <span className="text-[#E57200]">Fall 2026</span>
                                        <span className="mx-2 text-white/50">•</span>
                                        <span className="text-white/70">Tryout Result</span>
                                    </p>

                                    <h2 className="font-bebas mt-3 text-5xl uppercase tracking-wide md:text-6xl">
                                        {tryoutResult || "Result Pending"}
                                    </h2>

                                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200">
                                        {tryoutResult
                                            ? `Your Fall 2026 tryout placement is ${tryoutResult}.`
                                            : "Your tryout result has not been released yet. Check back after results are published."}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ACCOUNT INFORMATION */}
                        <section>
                            {!emailVerified && (
                                <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-800">
                                    Your account is active, but your UVA email is not verified yet.
                                    Check your inbox and click the Supabase confirmation link to
                                    update your account status.
                                </div>
                            )}

                            <div className="mb-4 flex items-center gap-3">
                                <Users className="h-5 w-5 text-[#E57200]" />

                                <h3 className="text-2xl font-bold text-[#07192d]">
                                    Account Information
                                </h3>
                            </div>

                            <div className="grid gap-2 md:grid-cols-2">
                                <InfoCard
                                    icon={<AtSign className="h-4 w-4" />}
                                    label="UVA Email"
                                    value={email || "Not available"}
                                />

                                <InfoCard
                                    icon={<ShieldCheck className="h-4 w-4" />}
                                    label="Account Status"
                                    value={emailVerified ? "Verified" : "Not Verified"}
                                    dotClass={emailVerified ? "bg-emerald-600" : "bg-amber-500"}
                                />

                                <InfoCard
                                    icon={<Users className="h-4 w-4" />}
                                    label="Club Group"
                                    value={group || "Pending"}
                                />

                                <InfoCard
                                    icon={<Sofa className="h-4 w-4" />}
                                    label="Membership Status"
                                    value={membershipStatus || "Pending"}
                                    dotClass={
                                        membershipStatus === "Active"
                                            ? "bg-[#E57200]"
                                            : "bg-slate-400"
                                    }
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            {isEditing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-[#07192d]">
                            Edit Profile
                        </h2>

                        <p className="mt-2 text-sm text-slate-600">
                            Update the name shown on your UVA Pickleball profile.
                        </p>

                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-semibold text-[#07192d]">
                                Full Name
                            </label>

                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-[#E57200]"
                            />
                        </div>

                        {saveError && (
                            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                                {saveError}
                            </div>
                        )}

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                disabled={saving}
                                className="flex-1 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-[#07192d] transition hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveProfile}
                                disabled={saving}
                                className="flex-1 rounded-lg bg-[#E57200] px-4 py-3 font-semibold text-white transition hover:bg-[#c96300] disabled:opacity-60"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

function InfoCard({
    icon,
    label,
    value,
    dotClass,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    dotClass?: string;
}) {
    return (
        <div className="rounded-lg bg-[#fff4eb] px-5 py-5 md:px-6">
            <div className="flex items-center gap-2 text-[#5d493f]">
                {icon}

                <p className="text-[10px] font-bold uppercase tracking-[0.15em]">
                    {label}
                </p>
            </div>

            <div className="mt-3 flex items-center gap-2">
                {dotClass && (
                    <span className={`h-2 w-2 rounded-full ${dotClass}`} />
                )}

                <p className="font-semibold text-[#07192d]">{value}</p>
            </div>
        </div>
    );
}
