export type EventItem = {
  id: string;
  title: string;
  category: 'Academic' | 'Entertainment' | 'Sports';
  dateTime: string;
  venue: string;
  isJoined: boolean;
  description?: string;
};
