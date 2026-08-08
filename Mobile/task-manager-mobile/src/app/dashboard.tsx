import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getTasks } from "../services/taskService";
export default function DashboardScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks || []);
    } catch (error: any) {
      console.log(
        "DASHBOARD ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token");

            router.replace("/login");
          } catch (error) {
            console.log("LOGOUT ERROR:", error);
          }
        },
      },
    ]
  );
};
  useEffect(() => {
    loadTasks();
  }, []);

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  const upcomingReminders = tasks.filter(
    (task) =>
      task.reminder &&
      new Date(task.reminder).getTime() > Date.now()
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}

    <View style={styles.header}>
  <View>
    <Text style={styles.greeting}>Welcome back 👋</Text>

    <Text style={styles.title}>
      Smart Task
    </Text>
  </View>

  <Pressable
  style={styles.logoutButton}
  onPress={handleLogout}
>
  <Text style={styles.logoutText}>
    Logout
  </Text>
</Pressable>
</View>

      <Text style={styles.subtitle}>
        Stay organized and get things done.
      </Text>

      {/* Quick Action */}

      <Pressable
        style={styles.createCard}
        onPress={() => router.push("/create-task")}
      >
        <View>
          <Text style={styles.createTitle}>
            Create a new task
          </Text>

          <Text style={styles.createSubtitle}>
            Add something to your task list
          </Text>
        </View>

        <View style={styles.plusButton}>
          <Text style={styles.plusText}>+</Text>
        </View>
      </Pressable>

      {/* Statistics */}

      <Text style={styles.sectionTitle}>
        Overview
      </Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {pendingTasks.length}
          </Text>

          <Text style={styles.statLabel}>
            Pending
          </Text>

          <Text style={styles.statDescription}>
            Tasks to complete
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>
            {completedTasks.length}
          </Text>

          <Text style={styles.statLabel}>
            Completed
          </Text>

          <Text style={styles.statDescription}>
            Tasks finished
          </Text>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.reminderIcon}>
          <Text>🔔</Text>
        </View>

        <View style={styles.reminderContent}>
          <Text style={styles.reminderNumber}>
            {upcomingReminders.length}
          </Text>

          <Text style={styles.reminderTitle}>
            Upcoming reminders
          </Text>
        </View>
      </View>

      {/* Tasks button */}

      <Text style={styles.sectionTitle}>
        Manage Tasks
      </Text>

      <Pressable
        style={styles.tasksButton}
        onPress={() => router.push("/tasks")}
      >
        <View>
          <Text style={styles.tasksButtonTitle}>
            View all tasks
          </Text>

          <Text style={styles.tasksButtonSubtitle}>
            {tasks.length} total tasks
          </Text>
        </View>

        <Text style={styles.arrow}>→</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  greeting: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 8,
    marginBottom: 25,
  },

  profile: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
  },

  profileText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  createCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
  },

  createTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  createSubtitle: {
    color: "#cbd5e1",
    fontSize: 13,
    marginTop: 5,
  },

  plusButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    fontSize: 28,
    color: "#111827",
    lineHeight: 30,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  statNumber: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
  },

  statLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginTop: 3,
  },

  statDescription: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 5,
  },

  reminderCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },

  reminderIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  reminderContent: {
    flex: 1,
  },

  reminderNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },

  reminderTitle: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 2,
  },

  tasksButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  tasksButtonTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  tasksButtonSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginTop: 4,
  },

  arrow: {
    fontSize: 24,
    color: "#111827",
  },
  logoutButton: {
  borderWidth: 1,
  borderColor: "#fecaca",
  backgroundColor: "#fff",
  paddingHorizontal: 12,
  paddingVertical: 9,
  borderRadius: 9,
},

logoutText: {
  color: "#dc2626",
  fontSize: 13,
  fontWeight: "600",
},
});