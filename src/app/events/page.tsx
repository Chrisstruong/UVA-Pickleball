import { events } from "../../data/events";

export default function EventsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-4xl font-bold">Events</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((event) => (
          <div key={event.title} className="rounded-xl border p-6">
            <p className="text-sm text-gray-500">{event.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">{event.title}</h2>
            <p className="mt-2 text-gray-600">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}