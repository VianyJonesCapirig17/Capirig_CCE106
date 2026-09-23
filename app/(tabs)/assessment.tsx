import { ScrollView, StyleSheet, Text, View, useWindowDimensions, type ViewStyle } from 'react-native';

const requirements = [
  {
    number: '1',
    title: 'Login',
    description: 'Email and password inputs, validation, loading indicator, and invalid-credential message.',
    color: '#079BC5',
  },
  {
    number: '2',
    title: 'Session',
    description: 'Save token securely, restore it on launch, and handle expiration or unauthorized responses.',
    color: '#D0A510',
  },
  {
    number: '3',
    title: 'Protected UI',
    description: 'Profile data, role-aware interface, protected API request, and working logout.',
    color: '#079A70',
  },
];

export default function AssessmentScreen() {
  const { width, height } = useWindowDimensions();
  const horizontalPadding = width * 0.052;
  const contentWidth = width - horizontalPadding * 2;
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const gap = Math.max(16, width * 0.035);
  const cardWidth: ViewStyle['width'] = columns === 1
    ? '100%'
    : `${(contentWidth - gap * (columns - 1)) / contentWidth * 100}%`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.page, { paddingHorizontal: horizontalPadding, paddingTop: height < 650 ? 16 : 28, paddingBottom: 20 }]}>
      <Text style={styles.eyebrow}>PRACTICAL ASSESSMENT</Text>
      <Text style={[styles.heading, { fontSize: Math.min(52, Math.max(30, width * 0.034)) }]}>Mini project: Authenticated Student Portal</Text>

      <View style={[styles.grid, { gap, marginTop: columns === 3 ? 'auto' : 28, marginBottom: columns === 3 ? 'auto' : 24 }]}>
        {requirements.map((item) => (
          <View key={item.number} style={[styles.card, { width: cardWidth, minHeight: Math.max(235, height * 0.48) }]}>
            <View style={[styles.accent, { backgroundColor: item.color }]} />
            <View style={[styles.numberBadge, { backgroundColor: item.color }]}>
              <Text style={styles.number}>{item.number}</Text>
            </View>
            <View style={styles.copy}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.demoFlow}>Demonstrate login → protected profile → app restart → logout.</Text>

      <View style={styles.footer}>
        <Text style={styles.footerLabel}>CCE106 · React Native</Text>
        <Text style={styles.pageNumber}>39</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E6EFF1' },
  page: { flexGrow: 1 },
  eyebrow: { color: '#087B9B', fontSize: 15, fontWeight: '900', letterSpacing: 1.1 },
  heading: { color: '#10223E', fontWeight: '900', letterSpacing: 0.4, lineHeight: 1.18, marginTop: 25 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { position: 'relative', flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#E7F0F2', borderWidth: 1, borderColor: '#B5C5CD', borderRadius: 14, paddingVertical: 25, paddingHorizontal: 24, paddingLeft: 32, overflow: 'hidden', shadowColor: '#203A50', shadowOpacity: 0.12, shadowRadius: 4, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 12, borderTopLeftRadius: 14, borderBottomLeftRadius: 14 },
  numberBadge: { width: 58, height: 58, borderRadius: 29, alignItems: 'center', justifyContent: 'center', marginRight: 22, marginTop: 3 },
  number: { color: '#D9EAF0', fontSize: 25, fontWeight: '900' },
  copy: { flex: 1 },
  cardTitle: { color: '#132641', fontSize: 25, lineHeight: 31, fontWeight: '800' },
  description: { color: '#30465F', fontSize: 18, lineHeight: 27, marginTop: 12 },
  demoFlow: { color: '#132641', fontSize: 19, lineHeight: 28, fontWeight: '800', textAlign: 'center', marginTop: 22, marginBottom: 34 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  footerLabel: { color: '#657A89', fontSize: 13 },
  pageNumber: { color: '#087B9B', fontSize: 14, fontWeight: '800' },
});
