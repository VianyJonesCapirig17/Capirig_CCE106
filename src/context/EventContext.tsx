import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { EventItem } from '../types/event';

const initialEvents: EventItem[] = [
  {
    id: '1',
    title: 'Hackathon 2026',
    category: 'Academic',
    dateTime: 'Oct 12, 10:00 AM',
    venue: 'Main Auditorium',
    description: 'Join us for a 24-hour coding challenge with student teams from across campus.',
    isJoined: true,
  },
  {
    id: '2',
    title: 'Campus Concert',
    category: 'Entertainment',
    dateTime: 'Oct 15, 6:00 PM',
    venue: 'Student Plaza',
    description: 'Live music performances from local student bands under the campus lights.',
    isJoined: false,
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    category: 'Sports',
    dateTime: 'Oct 18, 2:00 PM',
    venue: 'Gymnasium',
    description: 'Support your department at the inter-departmental basketball championship.',
    isJoined: false,
  },
  {
    id: '4',
    title: 'AI Workshop',
    category: 'Academic',
    dateTime: 'Oct 20, 1:00 PM',
    venue: 'Lab 302',
    description: 'A practical introduction to machine learning concepts and AI tools.',
    isJoined: true,
  },
  {
    id: '5',
    title: 'Esports League',
    category: 'Entertainment',
    dateTime: 'Oct 22, 4:00 PM',
    venue: 'Student Lounge',
    description: 'Compete in the campus Valorant and Mobile Legends tournament.',
    isJoined: false,
  },
];

type EventContextValue = {
  events: EventItem[];
  joinedEvents: EventItem[];
  toggleJoined: (eventId: string) => void;
};

const EventContext = createContext<EventContextValue | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState(initialEvents);
  const joinedEvents = useMemo(() => events.filter((event) => event.isJoined), [events]);

  const toggleJoined = (eventId: string) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId ? { ...event, isJoined: !event.isJoined } : event,
      ),
    );
  };

  return (
    <EventContext.Provider value={{ events, joinedEvents, toggleJoined }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used inside EventProvider');
  }
  return context;
}
