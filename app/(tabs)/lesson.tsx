import { ScrollView, StyleSheet, Text, View, useWindowDimensions, type ViewStyle } from 'react-native';

const concepts = [
  { title: 'Login', detail: 'proves identity' },
  { title: 'Token', detail: 'represents the session' },
  { title: 'Bearer', detail: 'authorizes requests' },
  { title: 'SecureStore', detail: 'persists the token' },
  { title: '401 / 403', detail: 'explain denial' },
  { title: 'Logout', detail: 'clears the session' },
];

export default function LessonScreen() {
  const { width, height } = useWindowDimensions();
  const horizontalPadding = width * 0.058;
  const contentWidth = width - horizontalPadding * 2;
  const gap = Math.max(18, width * 0.038);
  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth: ViewStyle['width'] = columns === 1
    ? '100%'
    : `${(contentWidth - gap * (columns - 1)) / contentWidth * 100}%`;
  const cardHeight = Math.max(112, height * 0.176);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.page, { paddingHorizontal: horizontalPadding, paddingTop: height < 650 ? 14 : 27, paddingBottom: 18 }]}>
      <Text style={styles.eyebrow}>LESSON SUMMARY</Text>

      <View style={[styles.grid, { gap, marginTop: columns === 3 ? 'auto' : 28, marginBottom: columns === 3 ? 'auto' : 24 }]}>
        {concepts.map((concept) => (
          <View key={concept.title} style={[styles.card, { width: cardWidth, minHeight: cardHeight }]}>
            <Text style={styles.cardTitle}>{concept.title}</Text>
            <Text style={styles.cardDetail}>{concept.detail}</Text>
          </View>
        ))}
      </View>

      <View style={styles.bottom}>
        <View style={styles.flow}>
          <Text style={styles.flowText}>IDENTITY  →  TOKEN  →  SECURE STORAGE  →  PROTECTED DATA</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>CCE106 · React Native</Text>
          <Text style={styles.pageNumber}>42</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#E6EFF1' },
  page: { flexGrow: 1 },
  eyebrow: { color: '#087B9B', fontSize: 15, fontWeight: '900', letterSpacing: 1.2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#07559D', borderColor: '#087DAE', borderWidth: 1, borderRadius: 13, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  cardTitle: { color: '#D0C960', fontSize: 27, fontWeight: '900', textAlign: 'center', letterSpacing: 0.4 },
  cardDetail: { color: '#E4F0F6', fontSize: 20, textAlign: 'center', marginTop: 16, letterSpacing: 0.2 },
  bottom: { marginTop: 'auto' },
  flow: { alignSelf: 'center', width: '60%', minWidth: 320, backgroundColor: '#079BC5', borderColor: '#42B6D0', borderWidth: 1, borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 26 },
  flowText: { color: '#DFF5F6', fontSize: 15, fontWeight: '900', letterSpacing: 1.1, textAlign: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerText: { color: '#657A89', fontSize: 13 },
  pageNumber: { color: '#087B9B', fontSize: 14, fontWeight: '800' },
});
