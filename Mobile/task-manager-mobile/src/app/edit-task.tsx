import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getTask, updateTask } from "../services/taskService";

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const data = await getTask(id as string);

      console.log("EDIT TASK RESPONSE:", data);

      const task = data.task || data;

      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "Medium");
      setStatus(task.status || "Pending");
    } catch (error: any) {
      console.log(
        "GET TASK ERROR:",
        error.response?.data || error.message
      );

      Alert.alert("Error", "Failed to load task");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      setSaving(true);

      const taskData = {
        title,
        description,
        priority,
        status,
      };

      console.log("UPDATING TASK:", taskData);

      const response = await updateTask(
        id as string,
        taskData
      );

      console.log("UPDATE RESPONSE:", response);

      Alert.alert("Success", "Task updated successfully");

      router.replace("/tasks");
    } catch (error: any) {
      console.log(
        "UPDATE TASK ERROR:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update task"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading task...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Task</Text>

      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Task title"
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Task description"
        multiline
      />

      <Text style={styles.label}>Priority</Text>

      <View style={styles.row}>
        {["Low", "Medium", "High"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.option,
              priority === item && styles.selected,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={
                priority === item
                  ? styles.selectedText
                  : styles.optionText
              }
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Status</Text>

      <View style={styles.statusContainer}>
        {["Pending", "In Progress", "Completed"].map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.statusButton,
                status === item && styles.selected,
              ]}
              onPress={() => setStatus(item)}
            >
              <Text
                style={
                  status === item
                    ? styles.selectedText
                    : styles.optionText
                }
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Pressable
        style={styles.updateButton}
        onPress={handleUpdate}
        disabled={saving}
      >
        <Text style={styles.updateButtonText}>
          {saving ? "Saving..." : "Update Task"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    fontSize: 16,
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },

  selected: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  optionText: {
    color: "#111827",
  },

  selectedText: {
    color: "#fff",
    fontWeight: "600",
  },

  statusContainer: {
    gap: 10,
    marginBottom: 25,
  },

  statusButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 13,
    alignItems: "center",
  },

  updateButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 10,
  },

  updateButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});