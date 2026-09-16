import { DimensionValue, StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
  width?: DimensionValue;
};

export default function StatCard({ label, value, width = '100%' }: StatCardProps) {
  return (
    <View style={[styles.card, { width }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    shadowColor: '#166534',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#15803D',
  },
  label: {
    fontSize: 13,
    color: '#4B5563',
    marginTop: 4,
  },
});
