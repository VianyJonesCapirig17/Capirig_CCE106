import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0B6B4F',
        tabBarInactiveTintColor: '#819088',
        headerShown: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: '700',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#DCE9DF',
          elevation: 0,
          shadowOpacity: 0,
          height: 74,
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
