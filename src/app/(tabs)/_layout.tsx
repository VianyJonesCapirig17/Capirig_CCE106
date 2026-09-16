import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#166534',
        tabBarInactiveTintColor: '#4B5563',
        headerShown: true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: '#F0FDF4',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
        },
        tabBarIndicatorStyle: {
          display: 'none',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', headerTitle: 'EventMate' }} />
      <Tabs.Screen name="events" options={{ title: 'Events', headerTitle: 'Campus Events' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', headerTitle: 'Student Profile' }} />
    </Tabs>
  );
}
