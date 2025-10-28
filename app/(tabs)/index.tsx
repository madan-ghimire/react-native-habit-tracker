import { HabitsList } from "@/components/HabitsList";
import { useAuth } from "@/lib/auth-context";
import {
  useCompleteHabit,
  useDeleteHabit,
  useHabits,
  useTodayCompletions,
} from "@/lib/queries";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth();

  const [confirmVisible, setConfirmVisible] = useState(false);

  const { data: habits = [] } = useHabits(user?.$id ?? "");
  const { data: completions = [] } = useTodayCompletions(user?.$id ?? "");
  const deleteHabit = useDeleteHabit();
  const completeHabit = useCompleteHabit();

  const completedHabits = completions.map((c: any) => c.habit_id);

  const handleDeleteHabit = async (id: string) => {
    try {
      await deleteHabit.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteHabit = async (id: string) => {
    if (!user || completedHabits?.includes(id)) return;
    try {
      const habit = habits?.find((h: any) => h.$id === id);
      if (!habit) return;

      await completeHabit.mutateAsync({
        habitId: id,
        userId: user.$id,
        habit,
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log("check dialog visible", confirmVisible);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Today&#39;s Habits
        </Text>
        {user && <Text style={styles.title}>Welcome, {user?.name}</Text>}
        <Button
          mode="text"
          onPress={() => setConfirmVisible(true)}
          icon={"logout"}
        >
          Sign Out
        </Button>
      </View>

      <Portal>
        <Dialog
          visible={confirmVisible}
          onDismiss={() => setConfirmVisible(false)}
        >
          <Dialog.Title>Confirm Sign Out</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to sign out?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmVisible(false)}>No</Button>
            <Button
              onPress={() => {
                setConfirmVisible(false);
                signOut();
              }}
            >
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HabitsList
          habits={habits}
          completedHabits={completedHabits}
          onDeleteHabit={handleDeleteHabit}
          onCompleteHabit={handleCompleteHabit}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
  },
});
