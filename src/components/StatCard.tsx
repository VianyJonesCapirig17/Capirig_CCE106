import { Ionicons } from '@expo/vector-icons';
import { DimensionValue, StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: string;
  width?: DimensionValue;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function StatCard({ label, value, width = '100%', icon }: StatCardProps) {
  return (
    <View style={[styles.card, { width }]}>
      <View style={styles.iconBadge}>
        <Ionicons name={icon} size={18} color="#0B6B4F" />
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#DCE9DF',
    shadowColor: '#173B2E',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5F3EA',
  },
  value: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#12251D',
  },
  label: {
    fontSize: 12,
    color: '#61716A',
    marginTop: 2,
  },
});
