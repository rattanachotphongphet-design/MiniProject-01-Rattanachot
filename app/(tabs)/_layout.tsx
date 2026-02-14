import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"

export default function Layout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Info",
                    tabBarIcon: () => (
                        <Ionicons name="clipboard" size={20} color="black" />
                    )
                }}
            />

            <Tabs.Screen
                name="add"
                options={{
                    title: "Add",
                    tabBarIcon: () => (
                        <Ionicons name="download" size={20} color="black" />
                    )
                }}
            />

            <Tabs.Screen
                name="Delete"
                options={{
                    title: "Delete",
                    tabBarIcon: () => (
                        <Ionicons name="trash" size={20} color="black" />
                    )
                }}
            />
        </Tabs>

    )
}
