import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import { deleteTask, getTasks } from "../services/taskService";
import { router } from "expo-router";

export default function TasksScreen() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  // 👇 PUT loadTasks HERE
  const loadTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      console.log("TASK RESPONSE:", data);

      setTasks(data.tasks || []);
    } catch (error: any) {
      console.log("TASK ERROR:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);

      // Remove deleted task immediately from the screen
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== taskId),
      );
    } catch (error: any) {
      console.log("DELETE ERROR:", error.response?.data || error.message);
    }
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (task) =>
          task.title?.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query),
      );
    }

    // Filter by status
    if (filter !== "All") {
      result = result.filter((task) => task.status === filter);
    }

    // Sort
    if (sort === "Newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    if (sort === "Oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    if (sort === "Due Date") {
      result.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
    }

    return result;
  }, [tasks, search, filter, sort]);

  // Automatically call loadTasks when screen opens
  useEffect(() => {
    loadTasks();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <Pressable
        style={styles.createButton}
        onPress={() => router.push("/create-task")}
      >
        <Text style={styles.createButtonText}>+ Create Task</Text>
      </Pressable>
<TextInput
  style={styles.searchInput}
  placeholder="Search tasks..."
  value={search}
  onChangeText={setSearch}
/>
<View style={styles.filterRow}>
  {["All", "Pending", "In Progress", "Completed"].map(
    (item) => (
      <Pressable
        key={item}
        style={[
          styles.filterButton,
          filter === item && styles.activeFilter,
        ]}
        onPress={() => setFilter(item)}
      >
        <Text
          style={
            filter === item
              ? styles.activeFilterText
              : styles.filterText
          }
        >
          {item}
        </Text>
      </Pressable>
    )
  )}
</View>

<View style={styles.sortRow}>
  {["Newest", "Oldest", "Due Date"].map((item) => (
    <Pressable
      key={item}
      onPress={() => setSort(item)}
    >
      <Text
        style={[
          styles.sortText,
          sort === item && styles.activeSort,
        ]}
      >
        {item}
      </Text>
    </Pressable>
  ))}
</View>
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            <Text style={styles.description}>{item.description}</Text>

            <Text>Priority: {item.priority}</Text>

            <Text>Status: {item.status}</Text>
            <Pressable
              style={styles.editButton}
              onPress={() =>
                router.push({
                  pathname: "/edit-task",
                  params: {
                    id: item._id,
                  },
                })
              }
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDelete(item._id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text>No tasks found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
  },

  task: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 12,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  description: {
    color: "#666",
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },

  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#dc2626",
  },

  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  editButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#111827",
  },

  editButtonText: {
    textAlign: "center",
    fontWeight: "600",
  },
  searchInput: {
  borderWidth: 1,
  borderColor: "#d1d5db",
  borderRadius: 10,
  padding: 14,
  marginBottom: 15,
  fontSize: 16,
},
filterRow: {
  flexDirection: "row",
  gap: 8,
  marginBottom: 15,
},

filterButton: {
  borderWidth: 1,
  borderColor: "#d1d5db",
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 10,
},

activeFilter: {
  backgroundColor: "#111827",
  borderColor: "#111827",
},

filterText: {
  fontSize: 12,
},

activeFilterText: {
  color: "#fff",
  fontSize: 12,
},
sortRow: {
  flexDirection: "row",
  gap: 20,
  marginBottom: 20,
},

sortText: {
  color: "#666",
},

activeSort: {
  color: "#111827",
  fontWeight: "700",
},
});
