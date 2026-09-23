import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Quotes',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="lesson"
        options={{
          title: 'Lesson',
          href: null,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="assessment"
        options={{
          title: 'Assessment',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.seal.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="troubleshooting"
        options={{
          title: 'Troubleshooting',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="wrench.and.screwdriver.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rubric"
        options={{
          title: 'Rubric',
          href: null,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="list.number" color={color} />,
        }}
      />
    </Tabs>
  );
}
