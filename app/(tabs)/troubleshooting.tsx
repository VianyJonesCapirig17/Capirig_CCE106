import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const mistakes = [
  { title: 'Token is undefined', detail: 'Check the exact response field name', color: '#D94F5C' },
  { title: '401 on every request', detail: 'Confirm Bearer header and token value', color: '#D2A50B' },
  { title: 'Login screen flashes', detail: 'Wait for session restoration to finish', color: '#079BC5' },
  { title: 'Logout does not work', detail: 'Clear both storage and React state', color: '#079A70' },
  { title: 'Infinite redirect', detail: 'Separate auth loading from logged-out state', color: '#6657D9' },
];

export default function TroubleshootingScreen() {
  const { width, height } = useWindowDimensions();
  const horizontalPadding = width * 0.056;
  const compact = width < 600;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.page,
        { paddingHorizontal: horizontalPadding, paddingTop: height < 650 ? 18 : 34, paddingBottom: 22 },
      ]}>
      <Text style={styles.eyebrow}>TROUBLESHOOTING</Text>
      <Text style={[styles.heading, { fontSize: Math.min(48, Math.max(30, width * 0.034)) }]}>
        Common student mistakes
      </Text>

      <View style={[styles.list, { marginTop: compact ? 28 : 24, gap: compact ? 14 : 18 }]}>
        {mistakes.map((item) => (
          <View key={item.title} style={[styles.row, { minHeight: compact ? 92 : 84 }]}>
            <View style={[styles.accent, { backgroundColor: item.color }]} />
            <Text style={[styles.rowTitle, compact && styles.mobileTitle]}>{item.title}</Text>
            <Text style={[styles.detail, compact && styles.mobileDetail]}>{item.detail}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>CCE106 {'\u00B7'} React Native</Text>
        <Text style={styles.pageNumber}>40</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E6EFF1' },
  page: { flexGrow: 1 },
  eyebrow: { color: '#087B9B', fontSize: 15, fontWeight: '900', letterSpacing: 1.1 },
  heading: { color: '#10223E', fontWeight: '900', letterSpacing: 0.35, lineHeight: 1.18, marginTop: 24 },
  list: { width: '100%' },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F0F2',
    borderWidth: 1,
    borderColor: '#B5C5CD',
    borderRadius: 10,
    paddingVertical: 16,
    paddingLeft: 46,
    paddingRight: 24,
    shadowColor: '#203A50',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 12, borderTopLeftRadius: 9, borderBottomLeftRadius: 9 },
  rowTitle: { width: '35%', color: '#132641', fontSize: 20, lineHeight: 27, fontWeight: '800' },
  mobileTitle: { width: '44%', fontSize: 16, lineHeight: 21 },
  detail: { flex: 1, color: '#30465F', fontSize: 19, lineHeight: 27, marginLeft: 14 },
  mobileDetail: { fontSize: 15, lineHeight: 21, marginLeft: 6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 28 },
  footerLabel: { color: '#657A89', fontSize: 13 },
  pageNumber: { color: '#087B9B', fontSize: 14, fontWeight: '800' },
});
