import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // Import SearchParams to access route parameters

export default function ExploreScreen() {
  const { customer: customerString } = useLocalSearchParams();  // Get the customer from the query params
  const customer = customerString ? JSON.parse(customerString as string) : null;  // Parse the customer string into an object

  const [newReading, setNewReading] = useState('');
  const pricePerUnit = 10;

  const calculateTotalPrice = () => {
    if (!customer) return; // Guard against undefined customer

    const consumedUnits = parseInt(newReading) - parseInt(customer.prevReading);
    if (isNaN(consumedUnits) || consumedUnits < 0) {
      Alert.alert('Invalid Reading', 'Please enter a valid meter reading.');
      return;
    }
    return consumedUnits * pricePerUnit;
  };

  const handlePrint = () => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice != null) {
      Alert.alert('Printing...', `Consumed Units: ${parseInt(newReading) - parseInt(customer.prevReading)}\nTotal Price: $${totalPrice}`);
      // Here you would trigger the actual print logic using your POS system
    }
  };

  if (!customer) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No customer data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <Text style={styles.label}>Customer ID : {customer.id}</Text>
        <Text style={styles.label}>Customer : {customer.name}</Text>
        <Text style={styles.label}>Previous Reading : {customer.prevReading}</Text>
        <Text style={styles.label}>Last Read : {customer.lastRead}</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter new meter reading"
          keyboardType="numeric"
          value={newReading}
          onChangeText={setNewReading}
        />

        <View style={styles.buttonContainer}>
          <Button title="Print" onPress={handlePrint} color="#6200ea" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    elevation: 4,
  },

  label: {
    fontSize: 20,
    marginBottom: 8,
    color: '#555',
    backgroundColor: '#f9f9f9',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
