import React from 'react';
import { useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { HomeIcon, CalendarDaysIcon, PlusIcon, DocumentIcon, UserIcon } from 'react-native-heroicons/outline';
import { HomeIcon as HomeSolid, CalendarDaysIcon as CalSolid, PlusIcon as PlusSolid, DocumentIcon as DocSolid, UserIcon as UserSolid } from 'react-native-heroicons/solid';
import { useAppContext } from './AppContext';


export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const selectedClr = "#FF6347";
  const { setBottomSheetVisible } = useAppContext();

  const icons = (ch) => {
    switch (ch) {
      case "index": return <HomeIcon color={colors.text} />;
      case "CalendarScreen": return <CalendarDaysIcon color={colors.text} />;
      case "docs": return <DocumentIcon color={colors.text} />;
      case "profile": return <UserIcon color={colors.text} />;
      default: return null;
    }
  };

  const iconsSolid = (ch) => {
    switch (ch) {
      case "index": return <HomeSolid color={selectedClr} />;
      case "CalendarScreen": return <CalSolid color={selectedClr} />;
      case "docs": return <DocSolid color={selectedClr} />;
      case "profile": return <UserSolid color={selectedClr} />;
      default: return null;
    }
  };

  const handleCustomButtonPress = () => {
    setBottomSheetVisible(true);
  };

  return (
    <View style={{ flexDirection: 'row', backgroundColor: colors.card, paddingVertical: 13, justifyContent: 'space-evenly', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ justifyContent: "center", alignItems: 'center', padding: 10, ...(route.name === "CalendarScreen" ? styles.dist  : {}),...(route.name === "docs" ? styles.distL  : {}) }}
          >
            {isFocused ? iconsSolid(route.name) : icons(route.name)}
            <Text style={{ color: isFocused ? selectedClr : colors.text, fontSize: 10 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={handleCustomButtonPress}
        style={styles.customButton}
      >
        <PlusIcon color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const widthWin = Dimensions.get('window').width;

const styles = StyleSheet.create({
  customButton: {
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#FF6347",
    borderRadius: "50%",
    position: "absolute",
    width: 70,
    height: 70,
    bottom: 50,
    left : widthWin/2 - 35,
    zIndex: 1,
    boxSizing: "border-box",
  },
  dist : {
    marginRight:20,
    marginLeft:-10,
  },
  distL : {
    marginLeft:20,
    marginRight:-10,
  }
});