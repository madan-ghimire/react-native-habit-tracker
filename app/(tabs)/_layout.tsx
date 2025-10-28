// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerStyle: { backgroundColor: "#f5f5f5" },
//         headerShadowVisible: false,
//         tabBarStyle: {
//           backgroundColor: "#f5f5f5",
//           borderTopWidth: 0,
//           elevation: 0,
//           shadowOpacity: 0,
//         },
//         tabBarActiveTintColor: "#620033",
//         tabBarInactiveTintColor: "#666666",
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Today's Habits",
//           headerTitleAlign: "center",
//           // tabBarIcon: ({ color, focused }) => {
//           //   return focused ? (
//           //     <FontAwesome5 name="home" size={24} color={color} />
//           //   ) : (
//           //     <AntDesign name="home" size={20} color="black" />
//           //   );
//           // },
//           tabBarIcon: ({ color, focused, size }) => (
//             <MaterialCommunityIcons name="calendar-today" size={size} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="streaks"
//         options={{
//           title: "Streaks",
//           headerTitleAlign: "center",
//           tabBarIcon: ({ color, focused, size }) => (
//             <MaterialCommunityIcons
//               name="chart-line"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="add-habit"
//         options={{
//           title: "Add Habit",
//           headerTitleAlign: "center",
//           tabBarIcon: ({ color, focused, size }) => (
//             <MaterialCommunityIcons
//               name="plus-circle"
//               size={size}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#f5f5f5" },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Today's Habits",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-today"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          title: "Streaks",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-line"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add-habit"
        options={{
          title: "Add Habit",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
