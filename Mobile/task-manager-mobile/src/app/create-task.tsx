import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createTask  } from "../services/taskService";

export default function CreateTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("");
const [dueDate, setDueDate] = useState(new Date());

const [showDueDatePicker, setShowDueDatePicker] = useState(false);

const [reminder, setReminder] = useState<Date | null>(null);
const [showReminderDatePicker, setShowReminderDatePicker] = useState(false);
const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title is required");
      return;
    }

    try {
      setLoading(true);

  const taskData = {
  title,
  description,
  status: "Pending",
  priority,
  dueDate: dueDate.toISOString(),
  reminder: reminder
    ? reminder.toISOString()
    : null,
};
    //   console.log("CREATING TASK:", taskData);

      await createTask(taskData);

      Alert.alert("Success", "Task created successfully");

      router.replace("/tasks");
    } catch (error: any) {
    //   console.log(
    //     "CREATE TASK ERROR:",
    //     error.response?.data || error.message
    //   );

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Task</Text>

      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Priority</Text>

      <View style={styles.row}>
        {["Low", "Medium", "High"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.priorityButton,
              priority === item && styles.selectedPriority,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === item && styles.selectedPriorityText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Work, Personal"
        value={category}
        onChangeText={setCategory}
      />

<Text style={styles.label}>Due Date</Text>

<Pressable
  style={styles.dateButton}
  onPress={() => setShowDueDatePicker(true)}
>
  <Text>
    {dueDate.toLocaleDateString()}
  </Text>
</Pressable>

{showDueDatePicker && (
  <DateTimePicker
    value={dueDate}
    mode="date"
    minimumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowDueDatePicker(false);

      if (selectedDate) {
        setDueDate(selectedDate);
      }
    }}
  />
)}

<Text style={styles.label}>Reminder</Text>

<Pressable
  style={styles.dateButton}
  onPress={() => setShowReminderDatePicker(true)}
>
  <Text>
    {reminder
      ? reminder.toLocaleString()
      : "Set reminder"}
  </Text>
</Pressable>

{showReminderDatePicker && (
  <DateTimePicker
    value={reminder || new Date()}
    mode="date"
    minimumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowReminderDatePicker(false);

      if (selectedDate) {
        setReminder(selectedDate);
        setShowReminderTimePicker(true);
      }
    }}
  />
)}

{showReminderTimePicker && reminder && (
  <DateTimePicker
    value={reminder}
    mode="time"
    onChange={(event, selectedTime) => {
      setShowReminderTimePicker(false);

      if (selectedTime) {
        setReminder(selectedTime);
      }
    }}
  />
)}
      <Pressable
        style={styles.createButton}
        onPress={handleCreateTask}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? "Creating..." : "Create Task"}
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
    marginBottom: 18,
  },

  priorityButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  selectedPriority: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },

  priorityText: {
    textTransform: "capitalize",
  },

  selectedPriorityText: {
    color: "#fff",
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },

  reminderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  createButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 10,
  },

  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});