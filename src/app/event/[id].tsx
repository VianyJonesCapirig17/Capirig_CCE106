import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEvents } from '../../context/EventContext';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { events, toggleJoined } = useEvents();
  const event = events.find((item) => item.id === id);

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
        <View style={styles.categoryRow}>
          <Text style={styles.category}>{event.category.toUpperCase()}</Text>
          <Ionicons name="calendar-outline" size={22} color="#0B6B4F" />
        </View>
        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={20} color="#0B6B4F" />
          <Text style={styles.meta}>{event.dateTime}</Text>
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={20} color="#0B6B4F" />
          <Text style={styles.meta}>{event.venue}</Text>
        </View>
        <Text style={styles.metaStatus}>{event.isJoined ? 'Status: Joined' : 'Status: Available'}</Text>

        <Text style={styles.sectionTitle}>About this event</Text>
        <Text style={styles.description}>{event.description}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            event.isJoined ? styles.leaveButton : styles.joinButton,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => toggleJoined(event.id)}
        >
          <Text style={styles.buttonText}>{event.isJoined ? 'Leave Event' : 'Join Event'}</Text>
          <Ionicons name={event.isJoined ? 'close-outline' : 'add'} size={22} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.statusText}>
          {event.isJoined ? 'You are attending this event.' : 'You have not joined this event.'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#F4F7F2',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#DCE9DF',
    shadowColor: '#173B2E',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#12251D',
    lineHeight: 36,
    marginTop: 12,
  },
  category: {
    fontSize: 11,
    color: '#0B6B4F',
    fontWeight: '600',
    letterSpacing: 1.3,
  },
  divider: {
    height: 1,
    backgroundColor: '#DCE9DF',
    marginVertical: 16,
  },
  meta: {
    fontSize: 14,
    color: '#50615A',
    marginLeft: 10,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  metaStatus: {
    fontSize: 13,
    color: '#0B6B4F',
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#12251D',
    marginTop: 16,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#61716A',
    lineHeight: 20,
  },
  actionButton: {
    marginTop: 24,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  joinButton: {
    backgroundColor: '#0B6B4F',
  },
  leaveButton: {
    backgroundColor: '#DC2626',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  statusText: {
    marginTop: 12,
    fontSize: 13,
    textAlign: 'center',
    color: '#61716A',
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
