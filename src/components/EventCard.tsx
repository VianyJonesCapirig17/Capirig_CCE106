import { Pressable, StyleSheet, Text } from 'react-native';
import { EventItem } from '../types/event';

type EventCardProps = {
  item: EventItem;
  onPress: () => void;
};

export default function EventCard({ item, onPress }: EventCardProps) {
  return (
    <Pressable style={styles.eventCard} onPress={onPress}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventCategory}>{item.category}</Text>
      <Text style={styles.eventStatus}>{item.isJoined ? 'Joined' : 'Available'}</Text>
      <Text style={styles.eventInfo}>{item.dateTime} • {item.venue}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    shadowColor: '#166534',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#14532D',
  },
  eventCategory: {
    fontSize: 12,
    color: '#15803D',
    fontWeight: '600',
    marginTop: 4,
  },
  eventStatus: {
    fontSize: 12,
    color: '#15803D',
    marginTop: 6,
    fontWeight: '600',
  },
  eventInfo: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 8,
  },
});
