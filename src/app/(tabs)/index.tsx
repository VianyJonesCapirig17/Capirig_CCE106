import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import StatCard from '../../components/StatCard';
import { useEvents } from '../../context/EventContext';

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { events, joinedEvents } = useEvents();
  const isWide = width > 500;
  const cardWidth = isWide ? (width - 40 - 36) / 4 : '100%';
  const stats = [
    { label: 'Total events', value: String(events.length), icon: 'calendar-outline' as const },
    { label: 'Joined events', value: String(joinedEvents.length), icon: 'checkmark-circle-outline' as const },
    { label: 'Open spots', value: String(events.length - joinedEvents.length), icon: 'sparkles-outline' as const },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <View style={styles.heroCopy}>
          <Text style={styles.appTitle}>EVENTMATE</Text>
          <Text style={styles.title}>Find your next campus moment.</Text>
          <Text style={styles.subtitle}>A calm place to discover what is happening around you.</Text>
        </View>
      </View>

      <View style={[styles.statsGrid, { flexDirection: isWide ? 'row' : 'column' }]}> 
        {stats.map((item) => (
          <StatCard key={item.label} icon={item.icon} label={item.label} value={item.value} width={cardWidth} />
        ))}
        <Pressable
          style={({ pressed }) => [styles.attendanceCard, { width: cardWidth }, pressed && styles.buttonPressed]}
          onPress={() => router.push('/attendance')}
        >
          <View style={styles.attendanceIcon}>
            <Text style={styles.attendanceIconText}>✓</Text>
          </View>
          <View style={styles.attendanceCopy}>
            <Text style={styles.attendanceTitle}>Attendance</Text>
            <Text style={styles.attendanceSubtitle}>Mark today&apos;s attendance</Text>
          </View>
          <Text style={styles.attendanceArrow}>→</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => router.push('/(tabs)/events')}
      >
        <Text style={styles.buttonText}>Explore Events  →</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F4F7F2',
    gap: 20,
  },
  hero: {
    backgroundColor: '#0B6B4F',
    borderRadius: 24,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 178,
    shadowColor: '#0B6B4F',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  heroCopy: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 29,
    fontWeight: '700',
    color: '#F8FBF7',
    lineHeight: 34,
    marginTop: 12,
  },
  appTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#BCE3C9',
  },
  subtitle: {
    color: '#D9EFE0',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  statsGrid: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#0B6B4F',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 17,
  },
  attendanceCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE9DF',
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 74,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#0B6B4F',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  attendanceIcon: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#E4F3E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceIconText: {
    color: '#0B6B4F',
    fontSize: 23,
    fontWeight: '800',
  },
  attendanceCopy: {
    flex: 1,
  },
  attendanceTitle: {
    color: '#12352A',
    fontSize: 15,
    fontWeight: '800',
  },
  attendanceSubtitle: {
    color: '#819088',
    fontSize: 11,
    marginTop: 3,
  },
  attendanceArrow: {
    color: '#0B6B4F',
    fontSize: 23,
    fontWeight: '700',
  },
});
