import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayjs from "dayjs";


const BookingCalendar = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: "",
        start: "",
        end: "",
    });

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/bookings/calendar-view");
                const data = await res.json();
                setEvents(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);


    const returnDays = (start, end) => {
        const startDate = dayjs(start);
        const endDate = dayjs(end);
        const days = endDate.diff(startDate, 'day') + 1; // +1 to include the end date
        return days;
    };


    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
    };

    const handleDelete = () => {
        selectedEvent.remove();
        setSelectedEvent(null);
    };

    const handleAddEvent = () => {
        if (!newEvent.title || !newEvent.start || !newEvent.end) {
            alert("Please fill in all fields.");
            return;
        }

        const createdEvent = {
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            color: "#3563e9", // Tailwind orange
        };

        setEvents((prev) => [...prev, createdEvent]);
        setNewEvent({ title: "", start: "", end: "" });
        setShowAddModal(false);
    };

    const handleDateClick = (info) => {
        const clickedDate = info.dateStr;

        // Auto-set start and end time to full day
        setNewEvent({
            title: "",
            start: `${clickedDate}T09:00`,
            end: `${clickedDate}T18:00`,
        });

        setShowAddModal(true);
    };

    return (
        <div className="p-4 bg-white shadow-md w-full md:w-2/3 xl:w-1/2 h-auto rounded-xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-blue-700">Scheduler</h2>
                <button onClick={() => { setNewEvent({ title: "", start: "", end: "" }); setShowAddModal(true); }} className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 py-2 rounded">Create Event</button>
            </div>

            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev",
                    center: "title",
                    right: "next"
                }}
                events={events}
                displayEventTime={false}
                eventClick={handleEventClick}
                dateClick={handleDateClick} // 🎯 Enable date click for quick add
                eventContent={events => returnDays(events.event.start, events.event.end) > 0 ? (
                    <div>{events.event.title} booked for {returnDays(events.event.start, events.event.end)} days</div>
                ) : (
                    <div>No duration</div>
                )}
                height="auto"
                className="rounded-md"
            />

            {/* View Event Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">Booking Info</h3>
                        <p><strong>Title:</strong> {selectedEvent.title}</p>
                        <p><strong>From:</strong> {new Date(selectedEvent.start).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true, })}</p>
                        <p><strong>To:</strong> {new Date(selectedEvent.end).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true, })}</p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
                                onClick={handleDelete} disabled={new Date(selectedEvent.end) < new Date() ? false : true}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setSelectedEvent(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Event Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800">New Note</h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="datetime-local"
                                value={newEvent.start}
                                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                            <input
                                type="datetime-local"
                                value={newEvent.end}
                                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                                className="w-full border px-3 py-2 rounded"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                                onClick={handleAddEvent} disabled={!newEvent.title || !newEvent.start || !newEvent.end}
                            >
                                Add
                            </button>
                            <button
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                onClick={() => setShowAddModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingCalendar;
