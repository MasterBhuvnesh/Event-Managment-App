import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, TouchableOpacity } from 'react-native';
import {HomeIcon, CalendarDaysIcon, PlusIcon, DocumentIcon, UserIcon} from 'react-native-heroicons/outline';


import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import TabBar from '@/components/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarButton: (props) => <TouchableOpacity {...props} />,
        tabBarActiveBackgroundColor: "orange",
      }}>


      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <Link href="/BottomSheetAdd" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="CalendarScreen"
        options={{
          title: 'Calender',
        }}
      />
      <Tabs.Screen
        name="docs"
        options={{
          title: 'Documents',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
