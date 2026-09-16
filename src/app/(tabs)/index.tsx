import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import StatCard from '../../components/StatCard';

const stats = [
  { label: 'Total Events', value: '5' },
  { label: 'Joined Events', value: '2' },
  { label: 'Upcoming Events', value: '3' },
];

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const isWide = width > 500;
  const cardWidth = isWide ? '31%' : '100%';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome back, Alex Student!</Text>

      <View style={[styles.statsGrid, { flexDirection: isWide ? 'row' : 'column' }]}> 
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} width={cardWidth} />
        ))}
      </View>

      <Link href="/(tabs)/events" style={styles.button}>
        <Text style={styles.buttonText}>Browse All Events →</Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5FBF7',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#14532D',
    marginBottom: 20,
  },
  statsGrid: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#15803D',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#14532D',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
