import { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'student_portal_token';
const API_URL = 'https://dummyjson.com';

type StudentProfile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

type LoginResponse = {
  accessToken?: string;
  message?: string;
  [key: string]: unknown;
};

async function readResponse<T>(response: Response): Promise<T> {
  return await response.json() as T;
}

function ProfileRow({ label, value, icon }: { label: string; value: string; icon: React.ComponentProps<typeof MaterialIcons>['name'] }) {
  return (
    <View style={styles.profileRow}>
      <View style={styles.rowCopy}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
      <View style={styles.rowIcon}><MaterialIcons name={icon} size={21} color="#718497" /></View>
    </View>
  );
}

function DashboardContent({ profile, onLogout, onTest401, onTest403 }: { profile: StudentProfile; onLogout: () => void; onTest401: () => void; onTest403: () => void }) {
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <View style={styles.dashboard}>
      <StatusBar barStyle="dark-content" backgroundColor="#F1F7F8" />
      <View pointerEvents="none" style={styles.dashboardGlow} />
      <ScrollView contentContainerStyle={styles.dashboardContent} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <View style={styles.brandIcon}><Text style={styles.brandIconText}>C</Text></View>
          <View style={styles.brandCopy}>
            <Text style={styles.brandTitle}>CCE 106</Text>
            <Text style={styles.brandSubtitle}>STUDENT PORTAL</Text>
          </View>
          <View style={styles.secureBadge}><View style={styles.secureDot} /><Text style={styles.secureText}>SECURE</Text></View>
        </View>

        <View style={styles.welcomeBlock}>
          <Text style={styles.eyebrow}>STUDENT DASHBOARD</Text>
          <Text style={styles.welcomeTitle}>Welcome back, {profile.firstName}.</Text>
          <Text style={styles.welcomeSubtitle}>Your authenticated student profile is ready.</Text>
        </View>

        <View style={styles.sessionCard}>
          <View style={styles.sessionIcon}><MaterialIcons name="verified-user" size={27} color="#13856C" /></View>
          <View style={styles.sessionCopy}>
            <Text style={styles.sessionTitle}>Protected session active</Text>
            <Text style={styles.sessionDescription}>Your profile was loaded with an authenticated request.</Text>
          </View>
          <View style={styles.sessionDot} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileCardTop}>
            <Text style={styles.cardEyebrow}>PROFILE</Text>
            <View style={styles.studentPill}><Text style={styles.studentPillText}>STUDENT</Text></View>
          </View>
          <View style={styles.nameBlock}>
            <Text style={styles.studentName}>{fullName}</Text>
            <Text style={styles.studentEmail}>{profile.email}</Text>
          </View>
          <View style={styles.divider} />
          <ProfileRow label="STUDENT ID" value={String(profile.id)} icon="badge" />
          <ProfileRow label="PROGRAM" value="BS Information Technology" icon="school" />
          <ProfileRow label="ACCESS LEVEL" value="Student account" icon="verified-user" />
          <View style={styles.statusDemoButtons}>
            <TouchableOpacity style={[styles.statusDemoButton, styles.unauthorizedButton]} onPress={onTest401}>
              <MaterialIcons name="lock-outline" size={18} color="#A33F4A" />
              <Text style={[styles.statusDemoText, styles.unauthorizedText]}>Demonstrate 401</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.statusDemoButton, styles.forbiddenButton]} onPress={onTest403}>
              <MaterialIcons name="gpp-bad" size={18} color="#985238" />
              <Text style={[styles.statusDemoText, styles.forbiddenText]}>Demonstrate 403</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
          <Text style={styles.signOutText}>SIGN OUT</Text>
          <MaterialIcons name="logout" size={22} color="#708396" />
        </TouchableOpacity>
        <Text style={styles.savedSession}>Your session is saved securely on this device.</Text>
      </ScrollView>
    </View>
  );
}

export default function DashboardScreen() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [readyForLogin, setReadyForLogin] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    void SecureStore.getItemAsync(SESSION_KEY)
      .then(value => {
        if (mounted) setSavedToken(value?.trim() && value !== 'undefined' ? value.trim() : null);
      })
      .catch(() => undefined)
      .finally(() => { if (mounted) setReadyForLogin(true); });
    return () => { mounted = false; };
  }, []);

  async function continueSavedSession() {
    if (!savedToken || loading) return;
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${savedToken}` },
      });
      if (response.status === 401) {
        await SecureStore.deleteItemAsync(SESSION_KEY);
        setSavedToken(null);
        Alert.alert('401 Unauthorized', 'Your saved session has expired. Please sign in again.');
        return;
      }
      if (response.status === 403) {
        await SecureStore.deleteItemAsync(SESSION_KEY);
        setSavedToken(null);
        Alert.alert('403 Forbidden', 'Your account cannot access this profile. Please sign in with an authorized account.');
        return;
      }
      if (!response.ok) throw new Error('Could not restore the saved profile.');
      const savedProfile = await readResponse<StudentProfile>(response);
      setToken(savedToken);
      setProfile(savedProfile);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not restore the saved session.');
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    if (!readyForLogin) return;
    setError('');
    if (!username.trim() || !password) {
      setError('Enter your username and password.');
      return;
    }

    setLoading(true);
    try {
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password, expiresInMins: 30 }),
      });
      const response = await readResponse<LoginResponse>(loginResponse);
      if (loginResponse.status === 401) {
        Alert.alert('401 Unauthorized', 'The username or password is incorrect.');
        setError('Invalid username or password.');
        return;
      }
      if (loginResponse.status === 403) {
        Alert.alert('403 Forbidden', 'This account is not allowed to sign in.');
        return;
      }
      if (!loginResponse.ok) throw new Error(response.message ?? 'Sign in failed. Please try again.');
      if (!response.accessToken) throw new Error('The login response did not include an access token.');

      const newToken = response.accessToken;
      const profileResponse = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${newToken}` },
      });
      if (profileResponse.status === 401) {
        Alert.alert('401 Unauthorized', 'The server did not accept the token returned at sign in.');
        return;
      }
      if (profileResponse.status === 403) {
        Alert.alert('403 Forbidden', 'You are signed in, but this account cannot access the profile.');
        return;
      }
      if (!profileResponse.ok) throw new Error('The protected profile request failed.');
      const studentProfile = await readResponse<StudentProfile>(profileResponse);
      await SecureStore.setItemAsync(SESSION_KEY, newToken);
      setSavedToken(newToken);
      setToken(newToken);
      setProfile(studentProfile);
      setPassword('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await SecureStore.deleteItemAsync(SESSION_KEY);
    } finally {
      setToken(null);
      setProfile(null);
      setSavedToken(null);
      setUsername('');
      setPassword('');
      setError('');
    }
  }

  async function testForbiddenResponse() {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/http/403/Forbidden`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 403) {
        Alert.alert('403 Forbidden', 'The server denied access to this resource. This mock endpoint demonstrates the app’s 403 handling.');
        return;
      }
      Alert.alert('Unexpected response', `The demo endpoint returned HTTP ${response.status} instead of 403.`);
    } catch {
      Alert.alert('Request failed', 'Could not reach the 403 demo endpoint. Check your internet connection.');
    }
  }

  async function testUnauthorizedResponse() {
    if (!token) return;
    try {
      const response = await fetch(`${API_URL}/http/401/Unauthorized`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        Alert.alert('401 Unauthorized', 'The server rejected this request as unauthenticated. This mock endpoint demonstrates the app’s 401 handling.');
        return;
      }
      Alert.alert('Unexpected response', `The demo endpoint returned HTTP ${response.status} instead of 401.`);
    } catch {
      Alert.alert('Request failed', 'Could not reach the 401 demo endpoint. Check your internet connection.');
    }
  }

  if (token && profile) {
    return <View style={authStyles.protected}><DashboardContent profile={profile} onLogout={() => void logout()} onTest401={() => void testUnauthorizedResponse()} onTest403={() => void testForbiddenResponse()} /></View>;
  }

  return (
    <View style={authStyles.loginScreen}>
      <View pointerEvents="none" style={authStyles.loginGlow} />
      <ScrollView contentContainerStyle={authStyles.loginScroll} keyboardShouldPersistTaps="handled">
        <View style={authStyles.brandRow}>
          <View style={authStyles.brandIcon}><Text style={authStyles.brandIconText}>C</Text></View>
          <View style={authStyles.brandCopy}>
            <Text style={authStyles.brandTitle}>CCE 106</Text>
            <Text style={authStyles.brandSubtitle}>STUDENT PORTAL</Text>
          </View>
          <View style={authStyles.secureBadge}><View style={authStyles.secureDot} /><Text style={authStyles.secureText}>SECURE</Text></View>
        </View>

        <View style={authStyles.loginIntro}>
          <Text style={authStyles.eyebrow}>WELCOME BACK</Text>
          <Text style={authStyles.title}>Student Login</Text>
          <Text style={authStyles.introText}>Sign in to continue to your dashboard.</Text>
        </View>

        <View style={authStyles.card}>
          <Text style={authStyles.fieldLabel}>USERNAME</Text>
          <View style={authStyles.inputShell}>
            <MaterialIcons name="person-outline" size={21} color="#708396" />
            <TextInput style={authStyles.input} placeholder="Enter your username" placeholderTextColor="#94A3B1" value={username} onChangeText={setUsername} autoCapitalize="none" autoComplete="username" editable={!loading && readyForLogin} returnKeyType="next" />
          </View>

          <Text style={[authStyles.fieldLabel, authStyles.passwordLabel]}>PASSWORD</Text>
          <View style={authStyles.inputShell}>
            <MaterialIcons name="lock-outline" size={20} color="#708396" />
            <TextInput style={authStyles.input} placeholder="Enter your password" placeholderTextColor="#94A3B1" value={password} onChangeText={setPassword} secureTextEntry={!isPasswordVisible} autoComplete="password" editable={!loading && readyForLogin} onSubmitEditing={login} returnKeyType="go" />
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'} onPress={() => setIsPasswordVisible(current => !current)} style={authStyles.eyeButton}>
              <MaterialIcons name={isPasswordVisible ? 'visibility-off' : 'visibility'} size={22} color="#708396" />
            </TouchableOpacity>
          </View>

          {!!error && <Text style={authStyles.error}>{error}</Text>}
          <TouchableOpacity style={[authStyles.button, (loading || !readyForLogin) && { opacity: 0.7 }]} onPress={login} disabled={loading || !readyForLogin}>
            {loading ? <ActivityIndicator color="#fff" /> : <><Text style={authStyles.buttonText}>{readyForLogin ? 'SIGN IN' : 'LOADING...'}</Text>{readyForLogin && <MaterialIcons name="arrow-forward" size={20} color="#fff" />}</>}
          </TouchableOpacity>

          {savedToken && (
            <>
              <View style={authStyles.separator}><View style={authStyles.separatorLine} /><Text style={authStyles.separatorText}>OR RESTORE SAVED SESSION</Text><View style={authStyles.separatorLine} /></View>
              <TouchableOpacity accessibilityRole="button" style={[authStyles.demoButton, authStyles.restoreButton]} onPress={() => void continueSavedSession()} disabled={loading || !readyForLogin}>
                {loading ? <ActivityIndicator color="#087E8B" /> : <><MaterialIcons name="lock-open" size={18} color="#087E8B" /><Text style={authStyles.demoButtonText}>Continue saved session</Text></>}
              </TouchableOpacity>
            </>
          )}

          <View style={authStyles.separator}><View style={authStyles.separatorLine} /><Text style={authStyles.separatorText}>OR USE A TEST ACCOUNT</Text><View style={authStyles.separatorLine} /></View>
          <TouchableOpacity accessibilityRole="button" style={[authStyles.demoButton, !readyForLogin && { opacity: 0.6 }]} disabled={!readyForLogin} onPress={() => { setUsername('emilys'); setPassword('emilyspass'); setError(''); }}>
            <MaterialIcons name="bolt" size={18} color="#087E8B" />
            <Text style={authStyles.demoButtonText}>Fill test account</Text>
          </TouchableOpacity>
          <Text style={authStyles.demoHint}>Fills the username and password for you.</Text>
        </View>

        <View style={authStyles.loginFooter}>
          <Text style={authStyles.footerText}>CCE106 {'\u00B7'} REACT NATIVE</Text>
          <Text style={authStyles.footerSecure}>ENCRYPTED SESSION</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const dashboardStyles = StyleSheet.create({
  dashboard: { flex: 1, backgroundColor: '#F1F7F8', overflow: 'hidden' },
  dashboardGlow: { position: 'absolute', width: 360, height: 360, borderRadius: 190, right: -150, top: -185, backgroundColor: '#D8F1EF' },
  dashboardContent: { flexGrow: 1, paddingHorizontal: 26, paddingTop: 38, paddingBottom: 26 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { width: 62, height: 62, borderRadius: 18, backgroundColor: '#078A91', alignItems: 'center', justifyContent: 'center', shadowColor: '#056F77', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  brandIconText: { color: '#FFFFFF', fontSize: 36, fontWeight: '900' },
  brandCopy: { flex: 1, marginLeft: 15 },
  brandTitle: { color: '#132A46', fontSize: 26, fontWeight: '900', letterSpacing: 1.3 },
  brandSubtitle: { color: '#718294', fontSize: 11, fontWeight: '800', letterSpacing: 2.2, marginTop: 3 },
  secureBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#E0F3EF', paddingHorizontal: 15, paddingVertical: 11, borderRadius: 24 },
  secureDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#169A70' },
  secureText: { color: '#1B7564', fontSize: 11, fontWeight: '900', letterSpacing: 1.3 },
  welcomeBlock: { marginTop: 72 },
  eyebrow: { color: '#087E8B', fontSize: 14, fontWeight: '900', letterSpacing: 2.2 },
  welcomeTitle: { color: '#132A46', fontSize: 44, lineHeight: 51, fontWeight: '900', marginTop: 8 },
  welcomeSubtitle: { color: '#778899', fontSize: 17, lineHeight: 26, marginTop: 10 },
  sessionCard: { flexDirection: 'row', alignItems: 'center', gap: 15, backgroundColor: '#E3F3F0', borderRadius: 18, padding: 18, marginTop: 30 },
  sessionIcon: { width: 54, height: 54, borderRadius: 16, backgroundColor: '#CDEBE4', alignItems: 'center', justifyContent: 'center' },
  sessionCopy: { flex: 1 },
  sessionTitle: { color: '#16735F', fontSize: 17, fontWeight: '800' },
  sessionDescription: { color: '#718C86', fontSize: 13, lineHeight: 20, marginTop: 4 },
  sessionDot: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#17A77A' },
  profileCard: { backgroundColor: '#FFFFFF', borderRadius: 22, borderWidth: 1, borderColor: '#E0E9EC', padding: 23, marginTop: 24, shadowColor: '#1B3347', shadowOpacity: 0.08, shadowRadius: 14, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  profileCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardEyebrow: { color: '#087E8B', fontSize: 13, fontWeight: '900', letterSpacing: 2 },
  studentPill: { backgroundColor: '#E8F5F3', borderRadius: 22, paddingHorizontal: 15, paddingVertical: 9 },
  studentPillText: { color: '#177E72', fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  nameBlock: { marginTop: 34 },
  studentName: { color: '#152A44', fontSize: 32, fontWeight: '900' },
  studentEmail: { color: '#7A8996', fontSize: 17, marginTop: 5 },
  divider: { height: 1, backgroundColor: '#E1E8EB', marginVertical: 24 },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  rowCopy: { flex: 1 },
  rowLabel: { color: '#81909D', fontSize: 11, fontWeight: '900', letterSpacing: 1.8 },
  rowValue: { color: '#1D344D', fontSize: 18, fontWeight: '600', marginTop: 7 },
  rowIcon: { width: 54, height: 54, borderRadius: 14, backgroundColor: '#F0F5F7', alignItems: 'center', justifyContent: 'center', marginLeft: 15 },
  signOutButton: { minHeight: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCE5E9', borderRadius: 15, marginTop: 24 },
  signOutText: { color: '#526779', fontSize: 13, fontWeight: '900', letterSpacing: 2 },
  statusDemoButtons: { flexDirection: 'row', flexWrap: 'wrap', gap: 9, marginTop: 6 },
  statusDemoButton: { flexDirection: 'row', alignItems: 'center', gap: 7, borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  unauthorizedButton: { borderColor: '#F0D2D5', backgroundColor: '#FFF5F6' },
  forbiddenButton: { borderColor: '#EBD5C9', backgroundColor: '#FFF8F4' },
  statusDemoText: { fontSize: 12, fontWeight: '800' },
  unauthorizedText: { color: '#A33F4A' },
  forbiddenText: { color: '#985238' },
  savedSession: { color: '#82909A', fontSize: 13, textAlign: 'center', marginTop: 16 },
});

const styles = dashboardStyles;

const authStyles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 14, padding: 24, backgroundColor: '#F1F7F8' },
  protected: { flex: 1 },
  restoreText: { color: '#637789', fontSize: 14 },
  loginScreen: { flex: 1, backgroundColor: '#F1F7F8', overflow: 'hidden' },
  loginGlow: { position: 'absolute', width: 330, height: 330, borderRadius: 180, right: -130, top: -180, backgroundColor: '#D7F0EE' },
  loginScroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingTop: 34, paddingBottom: 22 },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 50 },
  brandIcon: { width: 58, height: 58, borderRadius: 17, backgroundColor: '#078A91', alignItems: 'center', justifyContent: 'center', shadowColor: '#056F77', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  brandIconText: { color: '#FFFFFF', fontSize: 34, fontWeight: '900' },
  brandCopy: { marginLeft: 14, flex: 1 },
  brandTitle: { color: '#132A46', fontSize: 23, fontWeight: '900', letterSpacing: 1.4 },
  brandSubtitle: { color: '#728294', fontSize: 10, fontWeight: '800', letterSpacing: 2.2, marginTop: 3 },
  secureBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#DFF3EF', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 24, gap: 7 },
  secureDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#169A70' },
  secureText: { color: '#1A7564', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 },
  loginIntro: { marginBottom: 22 },
  eyebrow: { color: '#087E8B', fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  title: { color: '#132A46', fontSize: 36, lineHeight: 43, fontWeight: '900', marginBottom: 7 },
  introText: { color: '#718092', fontSize: 15 },
  card: { padding: 22, borderRadius: 22, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0E9EC', shadowColor: '#1B3347', shadowOpacity: 0.08, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  fieldLabel: { color: '#53677A', fontSize: 10, fontWeight: '900', letterSpacing: 1.8, marginBottom: 9 },
  passwordLabel: { marginTop: 19 },
  inputShell: { minHeight: 54, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D9E3E7', borderRadius: 13, backgroundColor: '#FAFCFD', paddingHorizontal: 14 },
  input: { flex: 1, color: '#193149', fontSize: 15, paddingVertical: 13, paddingHorizontal: 11 },
  eyeButton: { padding: 5 },
  error: { color: '#B42318', fontSize: 13, lineHeight: 19, marginTop: 11 },
  button: { flexDirection: 'row', gap: 10, minHeight: 54, alignItems: 'center', justifyContent: 'center', marginTop: 22, borderRadius: 13, backgroundColor: '#132A46' },
  buttonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '900', letterSpacing: 1.5 },
  separator: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 23 },
  separatorLine: { flex: 1, height: 1, backgroundColor: '#E6ECEF' },
  separatorText: { color: '#9AA7B1', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  demoButton: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, backgroundColor: '#E7F5F3', marginTop: 16 },
  restoreButton: { backgroundColor: '#F0F6F8' },
  demoButtonText: { color: '#087E8B', fontSize: 14, fontWeight: '800' },
  demoHint: { color: '#8796A2', fontSize: 11, textAlign: 'center', marginTop: 8 },
  loginFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28 },
  footerText: { color: '#8796A2', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  footerSecure: { color: '#528579', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
});
