import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('Alex Student');
  const [email, setEmail] = useState('alex@campus.edu');
  const [errorMsg, setErrorMsg] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setErrorMsg('');
    setSaveSuccess(false);

    if (!fullName.trim() || !email.trim()) {
      setErrorMsg('Both fields are required.');
      return;
    }

    if (!email.includes('@') || email.indexOf('@') === email.length - 1) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Ionicons name="person" size={88} color="#000000" style={styles.avatar} />
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>

        <View style={styles.divider} />
        <Text style={styles.formHeading}>Personal details</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Email Address *</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
        {saveSuccess ? <Text style={styles.successText}>Profile saved successfully!</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.7 }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
          <Ionicons name="checkmark" size={21} color="#FFFFFF" />
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
    backgroundColor: '#F4F7F2',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE9DF',
    elevation: 2,
    shadowColor: '#173B2E',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
  },
  avatar: {
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#12251D',
    marginTop: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#61716A',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#DCE9DF',
    width: '100%',
    marginVertical: 16,
  },
  formHeading: {
    width: '100%',
    color: '#12251D',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#284C3D',
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#CFE2D4',
    borderRadius: 14,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#F7FBF7',
    color: '#12251D',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 13,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  successText: {
    color: '#15803D',
    fontSize: 13,
    marginTop: 12,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  saveButton: {
    backgroundColor: '#0B6B4F',
    paddingVertical: 18,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
    shadowColor: '#0B6B4F',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
