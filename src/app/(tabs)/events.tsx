import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EventCard from '../../components/EventCard';
import { useEvents } from '../../context/EventContext';

const categories = ['All', 'Academic', 'Entertainment', 'Sports'] as const;

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>('All');
  const router = useRouter();
  const { events } = useEvents();

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return events;
    return events.filter((event) => event.category === selectedCategory);
  }, [events, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.eyebrow}>CAMPUS EVENTS</Text>
          <Text style={styles.title}>What&apos;s happening</Text>
        </View>
      </View>
      <View style={styles.filterContainer}>
        {categories.map((category) => (
          <Pressable
            key={category}
            style={({ pressed }) => [styles.filterButton, selectedCategory === category && styles.activeFilterButton, pressed && styles.filterPressed]}
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
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No events in this category yet.</Text>}
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
    padding: 20,
    backgroundColor: '#EAF5ED',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyebrow: {
    color: '#087443',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: {
    color: '#12251D',
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#D0EBD8',
  },
  activeFilterButton: {
    backgroundColor: '#087443',
  },
  filterPressed: {
    opacity: 0.75,
  },
  filterText: {
    fontSize: 15,
    color: '#35624A',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyText: {
    paddingTop: 32,
    textAlign: 'center',
    color: '#61716A',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
});
