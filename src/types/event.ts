export type EventItem = {
  id: string;
  title: string;
  category: 'Academic' | 'Entertainment' | 'Sports';
  dateTime: string;
  venue: string;
  description?: string;
  isJoined?: boolean;
};
