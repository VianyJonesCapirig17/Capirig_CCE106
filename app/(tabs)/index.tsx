import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
};

type MetricCardProps = {
  number: number;
  label: string;
};

const COLORS = {
  background: 'whitesmoke',
  black: 'black',
  white: 'white',
  gold: 'gold',
  gray: 'gray',
  lightGray: 'lightgray',
  inputBackground: 'floralwhite',
  delete: 'firebrick',
};

function MetricCard({
  number,
  label,
}: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricNumber}>
        {number}
      </Text>

      <Text style={styles.metricLabel}>
        {label}
      </Text>
    </View>
  );
}

function DashboardContent() {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Complete React Native Activity',
      dueDate: '09/15/2026',
      completed: false,
    },
    {
      id: 2,
      title: 'Submit Capstone Proposal',
      dueDate: '09/20/2026',
      completed: true,
    },
  ]);

  const [taskTitle, setTaskTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

  const formatDueDate = (text: string) => {
    const numbers = text
      .replace(/\D/g, '')
      .slice(0, 8);

    if (numbers.length === 0) {
      setDueDate('');
      return;
    }

    if (numbers.length === 1) {
      const firstDigit = Number(numbers);

      if (firstDigit > 1) {
        return;
      }

      setDueDate(numbers);
      return;
    }

    const month = Number(
      numbers.slice(0, 2)
    );

    if (month < 1 || month > 12) {
      return;
    }

    if (numbers.length <= 2) {
      setDueDate(numbers);
      return;
    }

    if (numbers.length === 3) {
      const firstDayDigit = Number(
        numbers.slice(2, 3)
      );

      if (firstDayDigit > 3) {
        return;
      }

      setDueDate(
        numbers.slice(0, 2) +
          '/' +
          numbers.slice(2)
      );

      return;
    }

    const day = Number(
      numbers.slice(2, 4)
    );

    if (day < 1 || day > 31) {
      return;
    }

    if (numbers.length <= 4) {
      setDueDate(
        numbers.slice(0, 2) +
          '/' +
          numbers.slice(2)
      );

      return;
    }

    const year = Number(
      numbers.slice(4, 8)
    );

    if (numbers.length === 8) {
      const maxDays = new Date(
        year,
        month,
        0
      ).getDate();

      if (day > maxDays) {
        return;
      }
    }

    setDueDate(
      numbers.slice(0, 2) +
        '/' +
        numbers.slice(2, 4) +
        '/' +
        numbers.slice(4)
    );
  };

  const isValidDate = (date: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      return false;
    }

    const [monthString, dayString, yearString] =
      date.split('/');

    const month = Number(monthString);
    const day = Number(dayString);
    const year = Number(yearString);

    if (
      month < 1 ||
      month > 12 ||
      day < 1 ||
      year < 1
    ) {
      return false;
    }

    const maxDays = new Date(
      year,
      month,
      0
    ).getDate();

    return day <= maxDays;
  };

  const addTask = () => {
    if (
      taskTitle.trim() === '' ||
      dueDate.trim() === ''
    ) {
      return;
    }

    if (!isValidDate(dueDate)) {
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks(currentTasks => [
      ...currentTasks,
      newTask,
    ]);

    setTaskTitle('');
    setDueDate('');
  };

  const toggleTask = (id: number) => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(currentTasks =>
      currentTasks.filter(
        task => task.id !== id
      )
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.black}
      />

      <ScrollView
        contentContainerStyle={[
          styles.container,
          isWide && styles.wideContainer,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.smallHeader}>
              STUDENT DASHBOARD
            </Text>

            <Text style={styles.welcome}>
              Welcome, Viany
            </Text>
          </View>

          <View style={styles.profileContainer}>
            <TouchableOpacity
              style={styles.profileCircle}
              onPress={() =>
                setShowProfile(
                  current => !current
                )
              }
            >
              <Text style={styles.profileText}>
                VJ
              </Text>
            </TouchableOpacity>

            {showProfile && (
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  Viany Jones Capirig
                </Text>

                <Text style={styles.profileDetail}>
                  Student ID: 145568
                </Text>

                <Text style={styles.profileDetail}>
                  Course: BS Information Technology
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Overview
          </Text>

          <View style={styles.metrics}>
            <MetricCard
              number={tasks.length}
              label="Total Tasks"
            />

            <MetricCard
              number={pendingTasks}
              label="Pending"
            />

            <MetricCard
              number={completedTasks}
              label="Completed"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Create New Task
          </Text>

          <View style={styles.formCard}>
            <Text style={styles.inputLabel}>
              Task Title
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter task title"
              placeholderTextColor={
                COLORS.lightGray
              }
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <Text style={styles.inputLabel}>
              Due Date
            </Text>

            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={
                COLORS.lightGray
              }
              value={dueDate}
              onChangeText={formatDueDate}
              keyboardType="numeric"
              maxLength={10}
            />

            <TouchableOpacity
              style={styles.createButton}
              onPress={addTask}
            >
              <Text style={styles.createButtonText}>
                Create Task
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recent Activity
          </Text>

          {tasks.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>
                No tasks available
              </Text>
            </View>
          ) : (
            tasks.map(task => (
              <View
                key={task.id}
                style={styles.taskCard}
              >
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    task.completed &&
                      styles.checkboxCompleted,
                  ]}
                  onPress={() =>
                    toggleTask(task.id)
                  }
                >
                  {task.completed && (
                    <Text style={styles.checkmark}>
                      ✓
                    </Text>
                  )}
                </TouchableOpacity>

                <View style={styles.taskContent}>
                  <Text
                    style={[
                      styles.taskTitle,
                      task.completed &&
                        styles.completedTaskTitle,
                    ]}
                  >
                    {task.title}
                  </Text>

                  <Text style={styles.dueDateText}>
                    Due: {task.dueDate}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() =>
                    deleteTask(task.id)
                  }
                >
                  <Text style={styles.deleteText}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    paddingBottom: 40,
  },

  wideContainer: {
    paddingHorizontal: 80,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 1300,
  },

  header: {
    backgroundColor: COLORS.black,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerText: {
    flex: 1,
  },

  smallHeader: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 7,
  },

  welcome: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: '700',
  },

  profileContainer: {
    alignItems: 'flex-end',
    position: 'relative',
    zIndex: 20,
  },

  profileCircle: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '800',
  },

  profileInfo: {
    position: 'absolute',
    top: 65,
    right: 0,
    width: 235,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 18,
    zIndex: 30,
    elevation: 8,
  },

  profileName: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 7,
  },

  profileDetail: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 4,
  },

  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },

  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  metricCard: {
    width: '31.5%',
    minHeight: 105,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  metricNumber: {
    color: COLORS.gold,
    fontSize: 29,
    fontWeight: '800',
  },

  metricLabel: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 7,
  },

  formCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
  },

  inputLabel: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 7,
  },

  input: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 7,
    minHeight: 45,
    paddingHorizontal: 12,
    marginBottom: 12,
    color: COLORS.black,
    fontSize: 14,
  },

  createButton: {
    backgroundColor: COLORS.gold,
    minHeight: 45,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },

  createButtonText: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '800',
  },

  taskCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 18,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: COLORS.gold,
    borderColor: COLORS.gold,
  },

  checkmark: {
    color: COLORS.black,
    fontWeight: '800',
  },

  taskContent: {
    flex: 1,
  },

  taskTitle: {
    color: COLORS.black,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },

  completedTaskTitle: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },

  dueDateText: {
    color: COLORS.lightGray,
    fontSize: 11,
  },

  deleteButton: {
    marginLeft: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },

  deleteText: {
    color: COLORS.delete,
    fontSize: 11,
    fontWeight: '700',
  },

  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
  },

  emptyText: {
    color: COLORS.lightGray,
    fontSize: 14,
  },
});

const SESSION_KEY = 'student_portal_token';

type LoginResponse = {
  token?: unknown;
  accessToken?: unknown;
  access_token?: unknown;
};

function getTokenFromResponse(response: LoginResponse): string {
  // Use the field your backend actually returns. These common names are supported here.
  const value = response.access_token ?? response.accessToken ?? response.token;
  if (typeof value !== 'string' || value.trim().length === 0 || value === 'undefined') {
    throw new Error('Login succeeded, but the response did not contain a valid token.');
  }
  return value.trim();
}

export default function DashboardScreen() {
  const [sessionStatus, setSessionStatus] = useState<'restoring' | 'signed-out' | 'signed-in'>('restoring');
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    async function restoreSession() {
      try {
        const savedToken = await SecureStore.getItemAsync(SESSION_KEY);
        const validToken = savedToken?.trim();
        if (!mounted) return;
        if (validToken && validToken !== 'undefined') {
          setToken(validToken);
          setSessionStatus('signed-in');
        } else {
          setSessionStatus('signed-out');
        }
      } catch {
        if (mounted) {
          setError('Could not restore your session. Please log in again.');
          setSessionStatus('signed-out');
        }
      }
    }
    restoreSession();
    return () => { mounted = false; };
  }, []);

  async function login() {
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      // Demo credentials; replace this check with your backend login request.
      await new Promise(resolve => setTimeout(resolve, 700));
      if (email.trim().toLowerCase() !== 'student@example.com' || password !== 'password123') {
        throw new Error('Invalid email or password.');
      }
      // Mimics a server response. Change access_token to your API's actual field name.
      const response: LoginResponse = { access_token: 'demo-student-token' };
      const newToken = getTokenFromResponse(response);
      await SecureStore.setItemAsync(SESSION_KEY, newToken);
      setToken(newToken);
      setSessionStatus('signed-in');
      setPassword('');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await SecureStore.deleteItemAsync(SESSION_KEY);
    } finally {
      // Always clear the in-memory session, even if secure storage reports an error.
      setToken(null);
      setSessionStatus('signed-out');
      setEmail('');
      setPassword('');
      setError('');
    }
  }

  async function authorizedFetch(url: string, options: RequestInit = {}) {
    if (!token) throw new Error('No session token is available.');
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${token}`);
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401) {
      await logout();
      throw new Error('Your session expired. Please log in again.');
    }
    return response;
  }

  // Use authorizedFetch for protected API calls, for example:
  // const response = await authorizedFetch(`${API_URL}/profile`);
  void authorizedFetch;

  if (sessionStatus === 'restoring') {
    return <View style={authStyles.center}><ActivityIndicator size="large" color="#087e8b" /><Text style={authStyles.help}>Restoring session…</Text></View>;
  }

  if (token) {
    return <View style={authStyles.protected}><DashboardContent /><TouchableOpacity style={authStyles.logout} onPress={logout}><Text style={authStyles.logoutText}>Log out</Text></TouchableOpacity></View>;
  }

  return (
    <View style={authStyles.center}>
      <View style={authStyles.card}>
        <Text style={authStyles.eyebrow}>STUDENT PORTAL</Text>
        <Text style={authStyles.title}>Log in</Text>
        <Text style={authStyles.help}>Sign in to view your protected dashboard.</Text>
        <TextInput style={authStyles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" editable={!loading} />
        <TextInput style={authStyles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry autoComplete="password" editable={!loading} onSubmitEditing={login} />
        {!!error && <Text style={authStyles.error}>{error}</Text>}
        <TouchableOpacity style={[authStyles.button, loading && { opacity: 0.7 }]} onPress={login} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={authStyles.buttonText}>Log in</Text>}
        </TouchableOpacity>
        <Text style={authStyles.help}>Demo: student@example.com · password123</Text>
      </View>
    </View>
  );
}

const authStyles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f3f7fb' },
  protected: { flex: 1 },
  card: { padding: 24, borderRadius: 18, backgroundColor: '#fff', borderWidth: 1, borderColor: '#d9e3ed' },
  eyebrow: { color: '#087e8b', fontSize: 12, fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  title: { color: '#17324d', fontSize: 28, fontWeight: '700', marginBottom: 8 },
  help: { color: '#5b6b7a', marginTop: 12, marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#cbd6e2', borderRadius: 10, padding: 12, marginTop: 10, color: '#17324d' },
  error: { color: '#b42318', marginTop: 8 },
  button: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 14, borderRadius: 10, backgroundColor: '#087e8b' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  logout: { position: 'absolute', top: 48, right: 16, zIndex: 100, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8, backgroundColor: '#087e8b' },
  logoutText: { color: '#fff', fontWeight: '700' },
});
