import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EventCard from '../../components/EventCard';
import { EventItem } from '../../types/event';

const EVENTS: EventItem[] = [
  { id: '1', title: 'Hackathon 2026', category: 'Academic', dateTime: 'Oct 12, 10:00 AM', venue: 'Main Auditorium', isJoined: true },
  { id: '2', title: 'Campus Concert', category: 'Entertainment', dateTime: 'Oct 15, 6:00 PM', venue: 'Student Plaza', isJoined: false },
  { id: '3', title: 'Basketball Tournament', category: 'Sports', dateTime: 'Oct 18, 2:00 PM', venue: 'Gymnasium', isJoined: false },
  { id: '4', title: 'AI Workshop', category: 'Academic', dateTime: 'Oct 20, 1:00 PM', venue: 'Lab 302', isJoined: true },
  { id: '5', title: 'Esports League', category: 'Entertainment', dateTime: 'Oct 22, 4:00 PM', venue: 'Student Lounge', isJoined: false },
];

const categories = ['All', 'Academic', 'Entertainment', 'Sports'] as const;

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const router = useRouter();

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return EVENTS;
    return EVENTS.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[styles.filterButton, selectedCategory === category && styles.activeFilterButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.filterText, selectedCategory === category && styles.activeFilterText]}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard item={item} onPress={() => router.push(`/event/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F5F7',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  activeFilterButton: {
    backgroundColor: '#2563EB',
  },
  filterText: {
    fontSize: 13,
    color: '#475569',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
