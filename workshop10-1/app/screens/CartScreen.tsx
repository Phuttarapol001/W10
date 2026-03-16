import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addItem, removeItem, clearCart } from "../redux/cartSlice";

export default function CartScreen() {

  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {

    if (!name || !quantity || !price) return;

    dispatch(addItem({
      id: Date.now().toString(),
      name,
      quantity: Number(quantity),
      price: Number(price)
    }));

    setName("");
    setQuantity("");
    setPrice("");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Shopping Cart</Text>

      <TextInput
        placeholder="ชื่อสินค้า"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="จำนวน"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="ราคา"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="เพิ่มลงตะกร้า" onPress={handleAdd} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>
              {item.name} x{item.quantity} ราคา {item.price} บาท
            </Text>

            <Button
              title="ลบ"
              onPress={() => dispatch(removeItem(item.id))}
            />
          </View>
        )}
      />

      <Text style={styles.total}>
        ยอดรวม: {totalAmount} บาท
      </Text>

      <Button title="ล้างตะกร้า" onPress={() => dispatch(clearCart())} />

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
  total: {
    marginTop: 20,
    fontSize: 18
  }
});