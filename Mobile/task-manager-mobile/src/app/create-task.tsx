import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useState } from "react";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

import { createTask } from "../services/taskService";
import { getTaskSuggestion } from "../services/aiService";

export default function CreateTaskScreen() {
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");

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

    if (!description.trim()) {
      Alert.alert("Error", "Description is required");
      return;
    }

    try {
      setLoading(true);

      const taskData = {
        title: title.trim(),
        description: description.trim(),
        status: "Pending",
        priority,
        category,
        completed: false,
        dueDate: dueDate.toISOString(),
        reminder: reminder ? reminder.toISOString() : null,
      };

      console.log("CREATING TASK:", taskData);

      await createTask(taskData);

      Alert.alert("Success", "Task created successfully");

      router.replace("/tasks");
    } catch (error: any) {
      console.log("CREATE TASK ERROR:", error.response?.data || error.message);

      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create task",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAISuggestion = async () => {
    if (!title.trim()) {
      Alert.alert("Enter title", "Enter a task title first.");
      return;
    }

    try {
      setAiLoading(true);

      const response = await getTaskSuggestion(title, description);

      setAiSuggestion(response.suggestion);
    } catch (error: any) {
      console.log("AI ERROR:", error.response?.data || error.message);

      Alert.alert(
        "AI Error",
        error.response?.data?.message || "Failed to generate AI suggestion",
      );
    } finally {
      setAiLoading(false);
    }
  };

  return (
  <ScrollView
    style={styles.screen}
    contentContainerStyle={styles.container}
    showsVerticalScrollIndicator={false}
  >
    {/* Header */}
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>TASK MANAGER</Text>
        <Text style={styles.title}>Create Task</Text>
        <Text style={styles.subtitle}>
          Add details and let AI help you plan it.
        </Text>
      </View>
    </View>

    {/* Basic Information */}
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Task Details</Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>

      <TextInput
        style={styles.input}
        placeholder="What needs to be done?"
        placeholderTextColor="#94a3b8"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description */}
      <Text style={styles.label}>Description</Text>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add more details about this task..."
        placeholderTextColor="#94a3b8"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* AI Button */}
      <Pressable
        style={({ pressed }) => [
          styles.aiButton,
          pressed && styles.pressed,
          aiLoading && styles.disabledButton,
        ]}
        onPress={handleAISuggestion}
        disabled={aiLoading}
      >
        {aiLoading ? (
          <>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.aiButtonText}>Thinking...</Text>
          </>
        ) : (
          <>
            <Text style={styles.aiIcon}>✨</Text>
            <View style={styles.aiButtonContent}>
              <Text style={styles.aiButtonText}>
                Get AI Suggestions
              </Text>

              <Text style={styles.aiButtonSubtext}>
                Generate a plan and best practices
              </Text>
            </View>
          </>
        )}
      </Pressable>

      {/* AI Result */}
      {aiSuggestion ? (
        <View style={styles.aiSuggestionBox}>
          <View style={styles.aiSuggestionHeader}>
            <View style={styles.aiSparkle}>
              <Text>✨</Text>
            </View>

            <View>
              <Text style={styles.aiSuggestionTitle}>
                AI Suggestion
              </Text>

              <Text style={styles.aiSuggestionSubtitle}>
                Powered by Mistral
              </Text>
            </View>
          </View>

          <View style={styles.aiDivider} />

          <Text style={styles.aiSuggestionText}>
            {aiSuggestion}
          </Text>
        </View>
      ) : null}
    </View>

    {/* Category & Priority */}
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Organization</Text>

      {/* Category */}
      <Text style={styles.label}>Category</Text>

      <TextInput
        style={styles.input}
        placeholder="e.g. Work, Personal, Study"
        placeholderTextColor="#94a3b8"
        value={category}
        onChangeText={setCategory}
      />

      {/* Priority */}
      <Text style={styles.label}>Priority</Text>

      <View style={styles.priorityContainer}>
        {["Low", "Medium", "High"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.priorityButton,
              priority === item && styles.selectedPriority,
            ]}
            onPress={() => setPriority(item)}
          >
            <View
              style={[
                styles.priorityDot,
                priority === item && styles.selectedPriorityDot,
              ]}
            />

            <Text
              style={[
                styles.priorityText,
                priority === item &&
                  styles.selectedPriorityText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>

    {/* Schedule */}
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Schedule</Text>

      {/* Due Date */}
      <Text style={styles.label}>Due Date</Text>

      <Pressable
        style={styles.dateButton}
        onPress={() => setShowDueDatePicker(true)}
      >
        <View style={styles.dateIcon}>
          <Text>📅</Text>
        </View>

        <View style={styles.dateContent}>
          <Text style={styles.dateLabel}>Due date</Text>

          <Text style={styles.dateValue}>
            {dueDate.toLocaleDateString()}
          </Text>
        </View>

        <Text style={styles.chevron}>›</Text>
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

      {/* Reminder */}
      <Text style={styles.label}>Reminder</Text>

      <Pressable
        style={styles.dateButton}
        onPress={() => setShowReminderDatePicker(true)}
      >
        <View style={styles.dateIcon}>
          <Text>🔔</Text>
        </View>

        <View style={styles.dateContent}>
          <Text style={styles.dateLabel}>Reminder</Text>

          <Text style={styles.dateValue}>
            {reminder
              ? reminder.toLocaleString()
              : "Set a reminder"}
          </Text>
        </View>

        <Text style={styles.chevron}>›</Text>
      </Pressable>

      {/* Reminder Date Picker */}
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

      {/* Reminder Time Picker */}
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
    </View>

    {/* Create Button */}
    <Pressable
      style={({ pressed }) => [
        styles.createButton,
        loading && styles.disabledButton,
        pressed && styles.pressed,
      ]}
      onPress={handleCreateTask}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          <Text style={styles.createButtonText}>
            Create Task
          </Text>

          <Text style={styles.createArrow}>→</Text>
        </>
      )}
    </Pressable>

    <Text style={styles.footerText}>
      Your task will be saved securely to your account.
    </Text>
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
    color: "#111827",
  },

  selectedPriorityText: {
    color: "#fff",
    fontWeight: "600",
  },

  dateButton: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 14,
    borderRadius: 10,
    marginBottom: 18,
  },

  dateText: {
    fontSize: 16,
    color: "#111827",
  },

  createButton: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
  },

  disabledButton: {
    opacity: 0.6,
  },

  createButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
