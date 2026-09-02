import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export default function StudentTaskManagerScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (!title.trim() || !dueDate.trim()) {
      Alert.alert('Missing Field', 'Please fill out both the task title and due date.');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      dueDate: dueDate.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle('');
    setDueDate('');
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
      },
    ]);
  };

  const pendingCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Modern Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>WELCOME BACK</Text>
          <Text style={styles.headerTitle}>Task Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Text style={{ fontSize: 18 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <>
            {/* Modern Hero Profile Banner */}
            <View style={styles.heroCard}>
              <View style={styles.avatarWrapper}>
                <Image
                  source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Daniel' }}
                  style={styles.avatar}
                />
                <View style={styles.onlineBadge} />
              </View>

              <View style={styles.profileTextContainer}>
                <Text style={styles.studentName}>Viany Jones Capirig</Text>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>3rd Year BSIT</Text>
                </View>
                <Text style={styles.studentEmail} numberOfLines={1}>
                  v.capirig.145568.tc@umindanao.edu.ph
                </Text>
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.statsGrid}>
              <View style={[styles.metricCard, styles.pendingCard]}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricIcon}>⏳</Text>
                  <Text style={styles.metricNumber}>{pendingCount}</Text>
                </View>
                <Text style={styles.metricLabel}>Pending Tasks</Text>
              </View>

              <View style={[styles.metricCard, styles.completedCard]}>
                <View style={styles.metricHeader}>
                  <Text style={styles.metricIcon}>⚡</Text>
                  <Text style={styles.metricNumber}>{completedCount}</Text>
                </View>
                <Text style={styles.metricLabel}>Completed Tasks</Text>
              </View>
            </View>

            {/* Form Section */}
            <View style={styles.glassForm}>
              <Text style={styles.sectionTitle}>Create New Task</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Task title..."
                  placeholderTextColor="#64748B"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Due date (YYYY-MM-DD)"
                  placeholderTextColor="#64748B"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
              </View>

              <TouchableOpacity style={styles.actionButton} onPress={handleAddTask}>
                <Text style={styles.actionButtonText}>Add Task </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionTitle}>Active Schedule</Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyIcon}>✨</Text>
            <Text style={styles.emptyTitle}>All Caught Up!</Text>
            <Text style={styles.emptyText}>No active tasks right now. Create one above.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.taskCard, item.completed && styles.taskCardDone]}>
            <TouchableOpacity
              style={styles.taskTouchArea}
              onPress={() => toggleTaskStatus(item.id)}
            >
              <View style={[styles.radioOuter, item.completed && styles.radioActive]}>
                {item.completed && <View style={styles.radioInner} />}
              </View>

              <View style={styles.taskContent}>
                <Text style={[styles.taskTitle, item.completed && styles.textStrikethrough]}>
                  {item.title}
                </Text>
                <View style={styles.dateTag}>
                  <Text style={styles.dateText}>📅 {item.dueDate}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteTask(item.id)}>
              <Text style={{ fontSize: 16 }}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greetingText: {
    color: '#818CF8',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 18,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#312E81',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#1E293B',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  studentName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  tagBadge: {
    backgroundColor: '#312E81',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 4,
  },
  tagText: {
    color: '#A5B4FC',
    fontSize: 10,
    fontWeight: '700',
  },
  studentEmail: {
    color: '#94A3B8',
    fontSize: 11,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  metricCard: {
    flex: 0.48,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
  },
  pendingCard: {
    backgroundColor: '#1E1B4B',
    borderColor: '#3730A3',
  },
  completedCard: {
    backgroundColor: '#064E3B',
    borderColor: '#065F46',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricIcon: {
    fontSize: 20,
  },
  metricNumber: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '900',
  },
  metricLabel: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
  },
  glassForm: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 14,
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 12,
    paddingHorizontal: 14,
    height: 50,
    justifyContent: 'center',
  },
  input: {
    color: '#F8FAFC',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#6366F1',
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E293B',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  taskCardDone: {
    opacity: 0.6,
    backgroundColor: '#0F172A',
  },
  taskTouchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  radioActive: {
    borderColor: '#10B981',
    backgroundColor: '#10B981',
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#64748B',
  },
  dateTag: {
    marginTop: 4,
  },
  dateText: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    borderStyle: 'dashed',
  },
  emptyIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});