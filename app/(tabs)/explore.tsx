import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

type Quote = { text: string; author: string };
type ApiQuote = { q?: unknown; a?: unknown };

async function fetchRandomQuote(): Promise<Quote> {
  const response = await fetch('https://zenquotes.io/api/random');
  if (!response.ok) throw new Error('The quote service is unavailable. Please try again.');

  const data: unknown = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('The quote service returned an invalid response.');
  }

  const item = data[0] as ApiQuote;
  if (typeof item.q !== 'string' || typeof item.a !== 'string' || !item.q.trim() || !item.a.trim()) {
    throw new Error('The quote service returned an invalid quote.');
  }
  return { text: item.q.trim(), author: item.a.trim() };
}

export default function QuotesScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 850;
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQuote = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setQuote(await fetchRandomQuote());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not load a quote. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadQuote(); }, [loadQuote]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.eyebrow}>DAILY INSPIRATION</Text>
      <Text style={[styles.pageTitle, !isWide && styles.pageTitleSmall]}>
        Quotes
      </Text>

      <View style={styles.main}>
        <View style={styles.quoteCard}>
          <Text style={styles.quoteLabel}>QUOTE OF THE DAY</Text>
          {loading && !quote ? (
            <View style={styles.messageArea}>
              <ActivityIndicator size="large" color="#12a6c8" />
              <Text style={styles.messageText}>Loading a quote…</Text>
            </View>
          ) : quote ? (
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>“{quote.text}”</Text>
              <Text style={styles.author}>— {quote.author}</Text>
            </View>
          ) : (
            <View style={styles.messageArea}>
              <Text style={styles.errorText}>{error || 'No quote is available.'}</Text>
            </View>
          )}
          {!!error && !!quote && <Text style={styles.inlineError}>{error}</Text>}
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={loadQuote}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>NEW QUOTE</Text>}
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://zenquotes.io/')}>
          <Text style={styles.attribution}>Quotes provided by ZenQuotes</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>CCE106 · React Native</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#e7f2f5' },
  content: { flexGrow: 1, paddingHorizontal: '6%', paddingTop: 26, paddingBottom: 20 },
  eyebrow: { color: '#168b9a', fontSize: 13, fontWeight: '800', letterSpacing: 1.2, marginBottom: 18 },
  pageTitle: { color: '#122d57', fontSize: 42, lineHeight: 50, fontWeight: '800', marginBottom: 34 },
  pageTitleSmall: { fontSize: 29, lineHeight: 36 },
  main: { width: '100%', maxWidth: 760, alignSelf: 'center' },
  quoteCard: { minHeight: 390, borderRadius: 22, backgroundColor: '#082c68', padding: 30, alignItems: 'center', justifyContent: 'space-between' },
  quoteLabel: { color: '#11b1c7', fontSize: 19, fontWeight: '800', letterSpacing: 0.6, textAlign: 'center' },
  quoteContent: { flex: 1, justifyContent: 'center', paddingVertical: 26 },
  quoteText: { color: '#e8f1f5', fontSize: 27, lineHeight: 35, fontWeight: '700', textAlign: 'center' },
  author: { color: '#e3d878', fontSize: 19, marginTop: 24, textAlign: 'center' },
  messageArea: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: 28 },
  messageText: { color: '#e8f1f5', marginTop: 14, fontSize: 16 },
  errorText: { color: '#ffd2d2', fontSize: 16, textAlign: 'center' },
  inlineError: { color: '#ffd2d2', fontSize: 14, textAlign: 'center', marginBottom: 12 },
  button: { width: '65%', minHeight: 48, borderRadius: 26, backgroundColor: '#10a6c8', alignItems: 'center', justifyContent: 'center' },
  buttonDisabled: { opacity: 0.75 },
  buttonText: { color: '#e8f1f5', fontSize: 16, fontWeight: '800', letterSpacing: 0.4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: 'auto', paddingTop: 30 },
  attribution: { color: '#168b9a', fontSize: 11 },
  footerText: { color: '#75848b', fontSize: 11 },
});
