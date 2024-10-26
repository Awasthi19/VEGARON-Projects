import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, Button, TextInput, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';  // Import useRouter
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons'; 

export default function HomeScreen() {
  const router = useRouter();  // Use the router from expo-router
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [customers, setCustomers] = useState<{ id: string; name: string; prevReading: string; lastRead: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    // Simulate data fetching
    setTimeout(() => {
      setCustomers([
        { id: '1', name: 'Bal Bahadur', prevReading: '100', lastRead: '7 / 2081' },
        { id: '2', name: 'Nabin ', prevReading: '150', lastRead: '7 / 2081' },
        { id: '3', name: 'Rohit', prevReading: '120', lastRead: '7 / 2081' },
      ]);
      setDataLoaded(true);
      setLoading(false);
    }, 2000);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/images/sycas-logo.png')}
          contentFit="cover"
          transition={1000}
        />
      </View>

      {/* Centered content */}
      <View style={styles.contentContainer}>
        {!dataLoaded && !loading && (
          <Button title="Load Data" onPress={loadData} />
        )}

        {loading && <ActivityIndicator size="large" color="#00ff00" />}

        {dataLoaded && (
          <>
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search customers..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView style={styles.List}>
              {filteredCustomers.map((customer) => (
                <TouchableOpacity
                  key={customer.id}
                  style={styles.stepContainer}
                  onPress={() =>
                    router.push({
                      pathname: '/explore',
                      params: {
                        customer: JSON.stringify(customer), // Pass customer data as a string
                      },
                    })
                  } // Using router.push to navigate
                >
                  <Text style={styles.customerText}>{customer.name}</Text>
                  <Text style={styles.customerText}>Previous Reading: {customer.prevReading}</Text>
                  <Text style={styles.customerText}>Last Reading: {customer.lastRead}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5,
    borderBottomWidth: 1, // Width of the "shadow"
    borderBottomColor: 'rgba(0, 0, 0, 0.5)', // Shadow-like color with transparency
  },
  image: {
    width: '40%',  // Adjust width as needed
    height: 50,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    marginBottom: 20,
    marginTop: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#333',
  },
  List: {
    width: '100%',
  },
  stepContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  customerText: {
    fontSize: 16,
  },
});
