import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EventItem } from '../../types/event';

const EVENTS: EventItem[] = [
  { id: '1', title: 'Hackathon 2026', category: 'Academic', dateTime: 'Oct 12, 10:00 AM', venue: 'Main Auditorium', description: 'Join us for a 24-hour coding challenge!', isJoined: true },
  { id: '2', title: 'Campus Concert', category: 'Entertainment', dateTime: 'Oct 15, 6:00 PM', venue: 'Student Plaza', description: 'Live music performances from local student bands.', isJoined: false },
  { id: '3', title: 'Basketball Tournament', category: 'Sports', dateTime: 'Oct 18, 2:00 PM', venue: 'Gymnasium', description: 'Inter-departmental basketball championship.', isJoined: false },
  { id: '4', title: 'AI Workshop', category: 'Academic', dateTime: 'Oct 20, 1:00 PM', venue: 'Lab 302', description: 'Introduction to machine learning and AI tools.', isJoined: true },
  { id: '5', title: 'Esports League', category: 'Entertainment', dateTime: 'Oct 22, 4:00 PM', venue: 'Student Lounge', description: 'Valorant and Mobile Legends tournament.', isJoined: false },
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(() => {
    const matchedEvent = EVENTS.find((item) => item.id === id);
    return matchedEvent?.isJoined ?? false;
  });

  const event = EVENTS.find((item) => item.id === id);

  if (!event) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Event Not Found</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.category}>{event.category}</Text>

        <View style={styles.divider} />

        <Text style={styles.meta}>{event.dateTime}</Text>
        <Text style={styles.meta}>{event.venue}</Text>
        <Text style={styles.metaStatus}>{isJoined ? 'Status: Joined' : 'Status: Available'}</Text>

        <Text style={styles.sectionTitle}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            isJoined ? styles.leaveButton : styles.joinButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => setIsJoined((current) => !current)}
        >
          <Text style={styles.buttonText}>{isJoined ? 'Leave Event' : 'Join Event'}</Text>
        </Pressable>

        <Text style={styles.statusText}>
          {isJoined ? 'You are attending this event.' : 'You have not joined this event.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F5F7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  category: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  meta: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  metaStatus: {
    fontSize: 13,
    color: '#0F766E',
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 24,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#16A34A',
  },
  leaveButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  statusText: {
    marginTop: 12,
    fontSize: 13,
    textAlign: 'center',
    color: '#64748B',
  },
  notFoundContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
});
