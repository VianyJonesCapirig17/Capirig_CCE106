import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { fetchRandomQuote, type Quote } from '@/services/quotes';

export default function QuotesScreen() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const loadQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsEmpty(false);

    try {
      const data = await fetchRandomQuote();
      if (!data) {
        setQuote(null);
        setIsEmpty(true);
        return;
      }
      setQuote(data);
    } catch {
      setError('Could not load a quote. Check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadQuote();
  }, [loadQuote]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topGlow} />
        <View style={styles.content}>
          <View>
            <Text style={styles.eyebrow}>DAILY INSPIRATION</Text>
            <Text style={styles.title}>Quote of the day</Text>
            <Text style={styles.subtitle}>A small thought for a brighter day.</Text>
          </View>

          <View style={styles.quoteCard}>
            <Text style={styles.mark}>“</Text>
            {isLoading ? (
              <View style={styles.stateContainer}>
                <ActivityIndicator size="large" color="#16A34A" />
                <Text style={styles.stateText}>Finding a great quote...</Text>
              </View>
            ) : error ? (
              <View style={styles.stateContainer}>
                <Text style={styles.errorTitle}>Something went wrong</Text>
                <Text style={styles.stateText}>{error}</Text>
              </View>
            ) : isEmpty ? (
              <View style={styles.stateContainer}>
                <Text style={styles.errorTitle}>No quote available</Text>
                <Text style={styles.stateText}>Please try a new quote in a moment.</Text>
              </View>
            ) : (
              <View style={styles.quoteContent}>
                <Text style={styles.quoteText}>{quote?.quote}</Text>
                <View style={styles.authorRow}>
                  <View style={styles.authorLine} />
                  <Text style={styles.author}> {quote?.author}</Text>
                </View>
              </View>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Get a new quote"
            disabled={isLoading}
            onPress={() => void loadQuote()}
            style={({ pressed }) => [
              styles.button,
              (pressed || isLoading) && styles.buttonPressed,
            ]}>
            <Text style={styles.buttonText}>{isLoading ? 'LOADING...' : 'NEW QUOTE'}</Text>
          </Pressable>
          <Text style={styles.footer}>Tap for a fresh perspective</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4FBF6' },
  safeArea: { flex: 1 },
  topGlow: { position: 'absolute', top: -120, right: -80, width: 310, height: 310, borderRadius: 155, backgroundColor: '#86EFAC', opacity: 0.48 },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 36, paddingBottom: 28 },
  eyebrow: { color: '#15803D', fontSize: 13, fontWeight: '800', letterSpacing: 1.8 },
  title: { color: '#14532D', fontSize: 36, lineHeight: 43, fontWeight: '800', marginTop: 8 },
  subtitle: { color: '#4B6B55', fontSize: 16, marginTop: 8 },
  quoteCard: { flex: 1, minHeight: 300, marginTop: 42, padding: 30, borderRadius: 28, justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BBF7D0', shadowColor: '#14532D', shadowOpacity: 0.15, shadowRadius: 20, shadowOffset: { width: 0, height: 12 }, elevation: 5 },
  mark: { color: '#16A34A', fontSize: 64, lineHeight: 56, fontWeight: '800', opacity: 0.9 },
  quoteContent: { marginTop: 10 },
  quoteText: { color: '#14532D', fontSize: 26, lineHeight: 36, fontWeight: '700' },
  authorRow: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
  authorLine: { width: 28, height: 2, backgroundColor: '#22C55E', borderRadius: 4 },
  author: { color: '#15803D', fontSize: 17, fontWeight: '600' },
  stateContainer: { minHeight: 160, alignItems: 'center', justifyContent: 'center', gap: 14 },
  stateText: { color: '#4B6B55', fontSize: 16, lineHeight: 23, textAlign: 'center' },
  errorTitle: { color: '#B91C1C', fontSize: 20, fontWeight: '700' },
  button: { alignItems: 'center', justifyContent: 'center', height: 58, marginTop: 28, borderRadius: 29, backgroundColor: '#16A34A', shadowColor: '#15803D', shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  buttonPressed: { opacity: 0.65, transform: [{ scale: 0.98 }] },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900', letterSpacing: 1.3 },
  footer: { color: '#4B6B55', textAlign: 'center', fontSize: 13, marginTop: 16 },
});
