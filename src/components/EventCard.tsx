import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';
import { EventItem } from '../types/event';

type EventCardProps = {
  item: EventItem;
  onPress: () => void;
};

export default function EventCard({ item, onPress }: EventCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.eventCard, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.eventCategory}>{item.category.toUpperCase()}</Text>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventInfo}>{item.dateTime}  ·  {item.venue}</Text>
      <Text style={[styles.eventStatus, item.isJoined && styles.joinedStatus]}>
        {item.isJoined ? 'Joined' : 'Available'}
      </Text>
      <Ionicons name="arrow-forward" size={20} color="#087443" style={styles.arrow} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DCE9DF',
    shadowColor: '#173B2E',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  eventTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#12251D',
    marginTop: 6,
  },
  eventCategory: {
    fontSize: 11,
    color: '#0B6B4F',
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  eventStatus: {
    fontSize: 12,
    color: '#9A6B0D',
    backgroundColor: '#FFF5D9',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 8,
    marginTop: 12,
    fontWeight: '600',
  },
  joinedStatus: {
    color: '#0B6B4F',
    backgroundColor: '#E5F3EA',
  },
  eventInfo: {
    fontSize: 13,
    color: '#61716A',
    marginTop: 8,
  },
  arrow: {
    position: 'absolute',
    right: 18,
    bottom: 18,
  },
});
