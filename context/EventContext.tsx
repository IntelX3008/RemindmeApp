// context/EventContext.tsx
import React, { createContext, useState, useContext } from 'react';

type Event = {
    id: string;
    date: string;
    title: string;
};

type EventContextType = {
    events: Event[];
    addEvent: (event: { date: string; title:string }) => void;
};

export const EventContext = createContext<EventContextType>({
    events: [],
    addEvent: () => {},
});

export const useEvents = () => useContext(EventContext);

export const EventProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: { date: string; title: string }) => {
        const newEventObject: Event = {
            id: Date.now().toString(),
            date: event.date,
            title: event.title,
        };
        setEvents(prevEvents => [newEventObject, ...prevEvents]);
    };

    return (
        <EventContext.Provider value={{ events, addEvent }}>
            {children}
        </EventContext.Provider>
    );
};