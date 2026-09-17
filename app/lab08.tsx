import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type AttendanceStatus = 'present' | 'absent' | null;

type Student = {
  id: number;
  name: string;
  status: AttendanceStatus;
};

const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Alexis Dela Cruz', status: null },
  { id: 2, name: 'Bianca Santos', status: null },
  { id: 3, name: 'Carlo Reyes', status: null },
  { id: 4, name: 'Diana Garcia', status: null },
  { id: 5, name: 'Ethan Mendoza', status: null },
  { id: 6, name: 'Fiona Navarro', status: null },
  { id: 7, name: 'Gabriel Ramos', status: null },
  { id: 8, name: 'Hannah Torres', status: null },
  { id: 9, name: 'Ian Bautista', status: null },
  { id: 10, name: 'Jasmine Flores', status: null },
];

export default function Lab08Screen() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [newName, setNewName] = useState('');
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

  useEffect(() => {
    setPresentCount(
      students.filter(student => student.status === 'present').length
    );
    setAbsentCount(
      students.filter(student => student.status === 'absent').length
    );
  }, [students]);

  const setAttendance = (
    studentId: number,
    status: Exclude<AttendanceStatus, null>
  ) => {
    setStudents(currentStudents =>
      currentStudents.map(student =>
        student.id === studentId ? { ...student, status } : student
      )
    );
  };

  const addStudent = () => {
    const trimmedName = newName.trim();

    if (!trimmedName) {
      return;
    }

    setStudents(currentStudents => [
      ...currentStudents,
      { id: Date.now(), name: trimmedName, status: null },
    ]);
    setNewName('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#17212b" />

      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          accessibilityLabel="Go back to Home"
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>‹  Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.eyebrow}>LAB 08</Text>
          <Text style={styles.title}>Attendance List</Text>
          <Text style={styles.subtitle}>
            Mark each student as present or absent.
          </Text>
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, styles.presentText]}>
              {presentCount}
            </Text>
            <Text style={styles.summaryLabel}>Present</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, styles.absentText]}>
              {absentCount}
            </Text>
            <Text style={styles.summaryLabel}>Absent</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, styles.unmarkedText]}>
              {students.length - presentCount - absentCount}
            </Text>
            <Text style={styles.summaryLabel}>Unmarked</Text>
          </View>
        </View>

        <View style={styles.addNameCard}>
          <TextInput
            accessibilityLabel="Student name"
            style={styles.nameInput}
            placeholder="Enter student name"
            placeholderTextColor="#8b9692"
            value={newName}
            onChangeText={setNewName}
            onSubmitEditing={addStudent}
            returnKeyType="done"
          />
          <TouchableOpacity
            accessibilityLabel="Add student name"
            style={styles.addNameButton}
            onPress={addStudent}
          >
            <Text style={styles.addNameButtonText}>Add Name</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listCard}>
          <View style={styles.tableHeader}>
            <Text style={[styles.headerText, styles.nameColumn]}>NAME</Text>
            <Text style={[styles.headerText, styles.statusColumn]}>STATUS</Text>
            <Text style={[styles.headerText, styles.actionColumn]}>MARK</Text>
          </View>

          {students.map(student => (
            <View key={student.id} style={styles.row}>
              <Text style={styles.name}>{student.name}</Text>

              <View style={styles.statusColumn}>
                <Text
                  style={[
                    styles.statusIcon,
                    student.status === 'present'
                      ? styles.presentText
                      : student.status === 'absent'
                        ? styles.absentText
                        : styles.unmarkedText,
                  ]}
                >
                  {student.status === 'present'
                    ? '✓'
                    : student.status === 'absent'
                      ? '✕'
                      : '—'}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  accessibilityLabel={`Mark ${student.name} present`}
                  style={[
                    styles.actionButton,
                    styles.presentButton,
                    student.status === 'present' && styles.selectedPresent,
                  ]}
                  onPress={() => setAttendance(student.id, 'present')}
                >
                  <Text style={styles.presentButtonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  accessibilityLabel={`Mark ${student.name} absent`}
                  style={[
                    styles.actionButton,
                    styles.absentButton,
                    student.status === 'absent' && styles.selectedAbsent,
                  ]}
                  onPress={() => setAttendance(student.id, 'absent')}
                >
                  <Text style={styles.absentButtonText}>Absent</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#17212b',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f4f1ea',
  },
  header: {
    paddingVertical: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingRight: 12,
  },
  backButtonText: {
    color: '#0B6B4F',
    fontSize: 16,
    fontWeight: '800',
  },
  eyebrow: {
    color: '#d66b45',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  title: {
    marginTop: 6,
    color: '#17212b',
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 8,
    color: '#65717a',
    fontSize: 15,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 18,
    borderRadius: 14,
    backgroundColor: '#17212b',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryNumber: {
    fontSize: 26,
    fontWeight: '800',
  },
  summaryLabel: {
    marginTop: 3,
    color: '#c8d0d2',
    fontSize: 12,
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: '#42505a',
  },
  presentText: {
    color: '#54b889',
  },
  absentText: {
    color: '#e47a62',
  },
  unmarkedText: {
    color: '#aab4b6',
  },
  addNameCard: {
    marginTop: 16,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#fffdf9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameInput: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#d7ddd5',
    borderRadius: 8,
    color: '#17212b',
    fontSize: 14,
  },
  addNameButton: {
    minHeight: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#0b6b4f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNameButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '800',
  },
  listCard: {
    marginTop: 20,
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: '#fffdf9',
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#e7e1d5',
  },
  headerText: {
    color: '#65717a',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  nameColumn: {
    flex: 1,
  },
  statusColumn: {
    width: 54,
    alignItems: 'center',
  },
  actionColumn: {
    width: 146,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 76,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee9df',
  },
  name: {
    flex: 1,
    color: '#17212b',
    fontSize: 15,
    fontWeight: '700',
  },
  statusIcon: {
    fontSize: 25,
    fontWeight: '800',
  },
  actions: {
    width: 146,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 6,
  },
  actionButton: {
    minWidth: 68,
    paddingHorizontal: 8,
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  presentButton: {
    borderWidth: 1,
    borderColor: '#b9dfcc',
    backgroundColor: '#edf8f2',
  },
  absentButton: {
    borderWidth: 1,
    borderColor: '#f0c6bb',
    backgroundColor: '#fff1ed',
  },
  selectedPresent: {
    backgroundColor: '#b9dfcc',
  },
  selectedAbsent: {
    backgroundColor: '#f0c6bb',
  },
  presentButtonText: {
    color: '#287653',
    fontSize: 12,
    fontWeight: '800',
  },
  absentButtonText: {
    color: '#a44736',
    fontSize: 12,
    fontWeight: '800',
  },
});