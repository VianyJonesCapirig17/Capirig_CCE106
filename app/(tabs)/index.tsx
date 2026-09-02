import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screenContainer} contentContainerStyle={styles.scrollContent}>
     
      <View style={styles.headerImageContainer}>
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
          contentFit="contain"
        />
      </View>

      <View style={styles.mainContainer}>
       
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>CAPS</Text>
          <HelloWave />
        </View>

       
        <View style={styles.contentCard}>
          <Text style={styles.sectionHeaderShadow}>Student Information</Text>
          <Text style={styles.studentName}>
            Student: <Text style={styles.boldText}>Viany Jones Capirig</Text>
          </Text>
          <Text style={styles.course}>
            Course: <Text style={styles.boldText}>BSIT – CCE 106</Text>
          </Text>
        </View>

       
        <View style={styles.contentCard}>
          <Text style={styles.sectionHeaderShadow}>About CAPS</Text>
          <Text style={styles.description}>
            CAPS is designed for people looking for motor shops and motorcycle-related services.
            It helps users easily find and access shop details, making searches simpler, faster,
            and organized in one place.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  screenContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  
  
  headerImageContainer: {
    backgroundColor: 'cornsilk',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reactLogo: {
    height: 140,
    width: 250,
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },

  
  appTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: 'yellow',
    letterSpacing: 1,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1.5 },
    textShadowRadius: 2,
  },
  
  
  sectionHeaderShadow: {
    fontSize: 22,
    fontWeight: '700',
    color: 'yellow',
    marginBottom: 10,
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1.5,
  },

  
  studentName: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  course: {
    fontSize: 16,
    color: 'black',
  },
  boldText: {
    fontWeight: '700',
    color: 'black',
  },
  description: {
    fontSize: 15,
    color: 'black',
    lineHeight: 22,
  },

 
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'black',
  },
});