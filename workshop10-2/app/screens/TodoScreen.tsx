import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addTodo, toggleTodo, removeTodo } from "../redux/todoSlice";

export default function TodoScreen() {

  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleAdd = () => {

    if (!text) return;

    dispatch(addTodo({
      id: Date.now().toString(),
      text,
      completed: false
    }));

    setText("");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>To-Do List</Text>

      <TextInput
        placeholder="เพิ่มงาน..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Button title="เพิ่มงาน" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (

          <View style={styles.itemRow}>

            <TouchableOpacity
              onPress={() => dispatch(toggleTodo(item.id))}
            >
              <Text style={item.completed ? styles.completed : styles.text}>
                {item.text}
              </Text>
            </TouchableOpacity>

            <Button
              title="ลบ"
              onPress={() => dispatch(removeTodo(item.id))}
            />

          </View>

        )}
      />

      <Text style={styles.count}>
        จำนวนงานทั้งหมด: {todos.length}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    marginTop: 40
  },

  title: {
    fontSize: 22,
    marginBottom: 10
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },

  text: {
    fontSize: 16
  },

  completed: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray"
  },

  count: {
    marginTop: 20,
    fontSize: 18
  }

});