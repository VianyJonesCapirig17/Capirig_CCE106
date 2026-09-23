import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const criteria = [
  ['Login request works', '15'],
  ['Validation and error handling', '10'],
  ['Token captured correctly', '10'],
  ['Secure token storage', '15'],
  ['Session restoration', '10'],
  ['Protected API request', '15'],
  ['401 / expiration handling', '10'],
  ['Logout', '5'],
  ['UI organization', '5'],
  ['Code organization', '5'],
  ['TOTAL', '100'],
];

export default function RubricScreen() {
  const { width, height } = useWindowDimensions();
  const padding = width * 0.06;
  const compact = width < 600;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.page,
        { paddingHorizontal: padding, paddingTop: height < 650 ? 18 : 34, paddingBottom: 22 },
      ]}>
      <Text style={styles.eyebrow}>100-POINT RUBRIC</Text>
      <Text style={[styles.heading, { fontSize: Math.min(48, Math.max(32, width * 0.034)) }]}>
        Grading criteria
      </Text>

      <View style={[styles.table, { width: compact ? '100%' : '74%', alignSelf: 'center', marginTop: compact ? 28 : 22 }]}>
        <View style={[styles.headerRow, compact && styles.compactRow]}>
          <Text style={[styles.headerCell, styles.criteriaColumn]}>Criteria</Text>
          <Text style={[styles.headerCell, styles.pointsColumn]}>Points</Text>
        </View>
        {criteria.map(([label, points], index) => {
          return (
            <View
              key={label}
              style={[
                styles.row,
                compact && styles.compactRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}>
              <Text style={[styles.cell, styles.criteriaColumn, compact && styles.compactCell]}>{label}</Text>
              <Text style={[styles.cell, styles.pointsColumn, compact && styles.compactCell]}>{points}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>CCE106 {'\u00B7'} React Native</Text>
        <Text style={styles.pageNumber}>41</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E6EFF1' },
  page: { flexGrow: 1 },
  eyebrow: { color: '#087B9B', fontSize: 15, fontWeight: '900', letterSpacing: 1.1 },
  heading: { color: '#10223E', fontWeight: '900', letterSpacing: 0.35, lineHeight: 1.18, marginTop: 24 },
  table: { borderWidth: 1, borderColor: '#152941' },
  headerRow: { flexDirection: 'row', minHeight: 43, backgroundColor: '#123B84' },
  row: { flexDirection: 'row', minHeight: 42, borderTopWidth: 1, borderTopColor: '#152941' },
  compactRow: { minHeight: 48 },
  evenRow: { backgroundColor: '#E7F0F2' },
  oddRow: { backgroundColor: '#DDE9EC' },
  headerCell: { color: '#E6EFF1', fontSize: 18, lineHeight: 24, fontWeight: '800', paddingHorizontal: 10, paddingVertical: 7, borderRightWidth: 1, borderRightColor: '#152941' },
  cell: { color: '#1D2E43', fontSize: 17, lineHeight: 24, paddingHorizontal: 10, paddingVertical: 7, borderRightWidth: 1, borderRightColor: '#152941' },
  compactCell: { fontSize: 14, lineHeight: 20, paddingHorizontal: 8, paddingVertical: 9 },
  criteriaColumn: { flex: 1 },
  pointsColumn: { width: '23%' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 28 },
  footerLabel: { color: '#657A89', fontSize: 13 },
  pageNumber: { color: '#087B9B', fontSize: 14, fontWeight: '800' },
});
