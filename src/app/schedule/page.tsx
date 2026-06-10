import { schedule } from "../data/schedule";

export default function SchedulePage() {
    return (
        <section className="mx-auto max-w-6xl px-6 py-16">
            <h1 className="mb-8 text-4xl font-bold">Practice Schedule</h1>

            <div className="grid gap-4 md:grid-cols-2">
                {schedule.map((item) => (
                    <div key={item.day} className="rounded-xl border p-6">
                        <h2 className="text-2xl font-semibold">{item.day}</h2>
                        <p className="mt-2">{item.time}</p>
                        <p className="text-gray-600">{item.location}</p>
                        <p className="mt-2 text-sm">{item.levels}</p>
                    </div>
                ))} 
            </div>

        </section>
    );
}   