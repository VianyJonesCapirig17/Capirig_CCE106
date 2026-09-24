import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getCurrentUser, loginUser, SessionRejectedError, type UserProfile } from '@/services/auth-service';
import { deleteToken, getToken, saveToken } from '@/storage/token-storage';

export default function HomeScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function restoreSession() {
      try {
        const token = await getToken();
        if (token) {
          const user = await getCurrentUser(token);
          if (isActive) setProfile(user);
        }
      } catch (cause) {
        if (cause instanceof SessionRejectedError) {
          try {
            await deleteToken();
          } catch {
            // Leave the login form available even if secure storage cannot be cleared.
          }
        } else if (isActive) {
          setError(cause instanceof Error ? cause.message : 'Could not restore your session.');
        }
      } finally {
        if (isActive) setCheckingSession(false);
      }
    }

    void restoreSession();
    return () => {
      isActive = false;
    };
  }, []);


  async function handleLogin() {
    Keyboard.dismiss();
    setError('');
    setLoading(true);
    try {
      const user = await loginUser(username, password);
      await saveToken(user.accessToken);
      setProfile(user);
      setPassword('');
      setShowPassword(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to sign in. Try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();
    setProfile(null);
    setPassword('');
    setError('');
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <View style={styles.brandMark}><Text style={styles.brandMarkText}>S</Text></View>
        <Text style={styles.eyebrow}>SECURE PROFILE</Text>
        <Text style={styles.title}>{checkingSession ? 'Secure Profile' : profile ? 'Your profile' : 'Welcome back'}</Text>
        <Text style={styles.subtitle}>
          {checkingSession
            ? 'Checking your saved session...'
            : profile
              ? 'You are securely signed in.'
              : 'Sign in to access your secure profile.'}
        </Text>

        {checkingSession ? (
          <View accessibilityLiveRegion="polite" style={styles.sessionLoading}>
            <ActivityIndicator color="#2E8B57" size="large" />
            <Text style={styles.sessionLoadingText}>Restoring your secure session</Text>
          </View>
        ) : profile ? (
          <View style={styles.profilePanel}>
            {profile.image ? (
              <Image accessibilityLabel={`${profile.firstName ?? profile.username}'s profile photo`} source={{ uri: profile.image }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileAvatarFallback}>
                <Text style={styles.profileAvatarText}>ID {profile.id}</Text>
              </View>
            )}
            <Text style={styles.profileName}>
              {[profile.firstName, profile.lastName].filter(Boolean).join(' ') || profile.username}
            </Text>
            <Text style={styles.profileLabel}>@{profile.username}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
            {profile.image && <Text style={styles.profileId}>User ID: {profile.id}</Text>}
            <Pressable accessibilityRole="button" onPress={handleLogout} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Sign out</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.form}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              accessibilityLabel="Username"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading && !checkingSession}
              onChangeText={setUsername}
              onSubmitEditing={handleLogin}
              placeholder="Enter your username"
              placeholderTextColor="#829589"
              returnKeyType="next"
              style={styles.input}
              value={username}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordField}>
              <TextInput
                accessibilityLabel="Password"
                autoCapitalize="none"
                editable={!loading && !checkingSession}
                onChangeText={setPassword}
                onSubmitEditing={handleLogin}
                placeholder="Enter your password"
                placeholderTextColor="#829589"
                returnKeyType="go"
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                value={password}
              />
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                accessibilityHint="Toggles password visibility"
                disabled={loading || checkingSession}
                hitSlop={10}
                onPress={() => setShowPassword((visible) => !visible)}
                style={styles.visibilityToggle}
              >
                <View style={styles.eyeIcon}>
                  <View style={styles.eyePupil} />
                  {showPassword && <View style={styles.eyeSlash} />}
                </View>
              </Pressable>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Fill the DummyJSON demo username and password"
              onPress={() => {
                setUsername('emilys');
                setPassword('emilyspass');
                setShowPassword(false);
                setError('');
              }}
              style={({ pressed }) => [styles.demoAccount, pressed && styles.pressed]}
            >
              <Text style={styles.demoAccountTitle}>Demo account · Tap to fill</Text>
              <Text style={styles.demoAccountDetails}>Username: emilys  ·  Password: emilyspass</Text>
            </Pressable>
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: loading || checkingSession }}
              disabled={loading || checkingSession}
              onPress={handleLogin}
              style={({ pressed }) => [styles.primaryButton, pressed && !loading && styles.pressed, (loading || checkingSession) && styles.disabled]}
            >
              {loading || checkingSession ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.primaryButtonText}>{checkingSession ? 'Checking session...' : 'Signing in...'}</Text>
                </View>
              ) : <Text style={styles.primaryButtonText}>Sign in</Text>}
            </Pressable>
            <Text style={styles.secureNote}>Your session token is stored securely on this device.</Text>
          </View>
        )}
      </View>
      <Text style={styles.footer}>PRIVATE BY DESIGN | SECURE PROFILE</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, justifyContent: 'center', backgroundColor: '#F1F6F1', padding: 24 },
  card: { width: '100%', maxWidth: 440, alignSelf: 'center', padding: 28, borderRadius: 24, backgroundColor: '#FFFFFF', shadowColor: '#183326', shadowOpacity: 0.08, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 4 },
  brandMark: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  brandMarkText: { color: '#2E7D46', fontSize: 24, fontWeight: '800' },
  eyebrow: { color: '#2E7D46', fontSize: 11, fontWeight: '800', letterSpacing: 1.8, marginBottom: 8 },
  title: { color: '#183326', fontSize: 30, fontWeight: '800', letterSpacing: -0.7 },
  subtitle: { color: '#65796B', fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 28 },
  form: { gap: 12 },
  label: { color: '#294233', fontSize: 13, fontWeight: '700', marginTop: 4 },
  input: { height: 54, borderWidth: 1, borderColor: '#D9E5DB', borderRadius: 12, paddingHorizontal: 15, color: '#183326', fontSize: 15, backgroundColor: '#FCFEFC' },
  passwordField: { minHeight: 54, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D9E5DB', borderRadius: 12, backgroundColor: '#FCFEFC' },
  passwordInput: { flex: 1, height: 52, paddingHorizontal: 15, color: '#183326', fontSize: 15 },
  visibilityToggle: { minWidth: 48, height: 52, alignItems: 'center', justifyContent: 'center' },
  eyeIcon: { width: 20, height: 13, borderWidth: 1.5, borderColor: '#718273', borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  eyePupil: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#718273' },
  eyeSlash: { position: 'absolute', width: 24, height: 1.5, backgroundColor: '#718273', transform: [{ rotate: '-35deg' }] },
  demoAccount: { borderWidth: 1, borderColor: '#A7D9B2', borderRadius: 12, backgroundColor: '#EAF7ED', padding: 13, gap: 5 },
  demoAccountTitle: { color: '#21683A', fontSize: 13, fontWeight: '700' },
  demoAccountDetails: { color: '#426B4D', fontSize: 12 },
  primaryButton: { height: 54, borderRadius: 12, backgroundColor: '#2E8B57', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sessionLoading: { alignItems: 'center', gap: 14, paddingVertical: 28 },
  sessionLoadingText: { color: '#506456', fontSize: 14, fontWeight: '600' },
  pressed: { opacity: 0.86 },
  disabled: { opacity: 0.7 },
  error: { color: '#B42318', fontSize: 13, lineHeight: 18 },
  secureNote: { color: '#788A7B', textAlign: 'center', fontSize: 12, lineHeight: 18, marginTop: 8 },
  profilePanel: { backgroundColor: '#F3F8F4', padding: 18, borderRadius: 16, marginTop: 4 },
  profileLabel: { color: '#718273', fontSize: 11, fontWeight: '700', letterSpacing: 1.2 },
  profileName: { color: '#183326', fontSize: 20, fontWeight: '700', marginTop: 7, marginBottom: 18 },
  profileImage: { width: 76, height: 76, borderRadius: 38, alignSelf: 'center', marginBottom: 12, backgroundColor: '#E8F5E9' },
  profileAvatarFallback: { width: 76, height: 76, borderRadius: 38, alignSelf: 'center', marginBottom: 12, backgroundColor: '#E8F5E9', alignItems: 'center', justifyContent: 'center' },
  profileAvatarText: { color: '#2E7D46', fontSize: 14, fontWeight: '800' },
  profileEmail: { color: '#506456', fontSize: 14, marginTop: 8 },
  profileId: { color: '#788A7B', fontSize: 12, marginTop: 6, marginBottom: 18 },
  secondaryButton: { height: 48, borderRadius: 12, borderWidth: 1, borderColor: '#D7E3D9', alignItems: 'center', justifyContent: 'center' },
  secondaryButtonText: { color: '#35533F', fontSize: 14, fontWeight: '700' },
  footer: { alignSelf: 'center', color: '#8A9A8E', fontSize: 10, fontWeight: '700', letterSpacing: 1.1, marginTop: 22 },
});
