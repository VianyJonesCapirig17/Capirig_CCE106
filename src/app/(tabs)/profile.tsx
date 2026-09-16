import { useState } from 'react';
import {
  Image,
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
        <Image source={{ uri: 'https://picsum.photos/100' }} style={styles.avatar} />
        <Text style={styles.profileName}>{fullName}</Text>
        <Text style={styles.profileEmail}>{email}</Text>

        <View style={styles.divider} />

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
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5FBF7',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
    elevation: 2,
    shadowColor: '#166534',
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#DCFCE7',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14532D',
  },
  profileEmail: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#DCFCE7',
    width: '100%',
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14532D',
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#F0FDF4',
    color: '#14532D',
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
    backgroundColor: '#15803D',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#166534',
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
