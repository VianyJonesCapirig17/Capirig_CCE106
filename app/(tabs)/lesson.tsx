import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

const topics = [
  { title: 'API', description: 'connects systems', color: '#10a4c5' },
  { title: 'REST', description: 'organizes resources', color: '#d0a813' },
  { title: 'JSON', description: 'carries data', color: '#09a27d' },
  { title: 'fetch()', description: 'sends requests', color: '#10a4c5' },
  { title: 'State', description: 'drives the UI', color: '#d0a813' },
  { title: 'Errors', description: 'must be handled', color: '#7253cb' },
];

export default function ApiLessonScreen() {
  const { width } = useWindowDimensions();
  const cardWidth = width >= 900 ? '31.5%' : width >= 600 ? '48%' : '100%';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>LESSON SUMMARY</Text>

      <View style={styles.grid}>
        {topics.map((topic) => (
          <View key={topic.title} style={[styles.card, { width: cardWidth }]}>
            <View style={[styles.accent, { backgroundColor: topic.color }]} />
            <Text style={styles.cardTitle}>{topic.title}</Text>
            <Text style={styles.cardDescription}>{topic.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reminder}>
        <Text style={styles.reminderText}>
          <Text style={styles.remember}>REMEMBER: </Text>
          useState remembers · useEffect reacts · APIs connect
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>CCE106 · React Native</Text>
        <Text style={styles.footerText}>44</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#e7f2f5' },
  content: { flexGrow: 1, paddingHorizontal: '6%', paddingTop: 28, paddingBottom: 22 },
  eyebrow: { color: '#168b9a', fontSize: 13, fontWeight: '800', letterSpacing: 1.2, marginBottom: 26 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 24 },
  card: { minHeight: 150, borderRadius: 14, borderWidth: 1, borderColor: '#b4c5d1', backgroundColor: '#eaf4f7', alignItems: 'center', justifyContent: 'center', padding: 20, overflow: 'hidden' },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 8 },
  cardTitle: { color: '#d9cf79', fontSize: 26, fontWeight: '800', marginBottom: 14, textAlign: 'center' },
  cardDescription: { color: '#23364f', fontSize: 18, textAlign: 'center' },
  reminder: { alignSelf: 'center', marginTop: 'auto', marginBottom: 26, paddingVertical: 10, paddingHorizontal: 22, borderRadius: 24, backgroundColor: '#149dbd' },
  reminderText: { color: '#e8f4fa', fontSize: 14, fontWeight: '700', textAlign: 'center' },
  remember: { fontWeight: '900' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 },
  footerText: { color: '#75848b', fontSize: 11 },
});
