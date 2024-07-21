import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../useAuth'; // Adjust the path as per your project structure

const ChefSummary = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post('https://fyp-0qf7.onrender.com/api/order/getproviderorderHistory', { email: user.email });
        const fetchedOrders = response.data;

        setOrders(fetchedOrders);
        calculateSummary(fetchedOrders);
      } catch (error) {
        Alert.alert('Error fetching orders', error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.email]);

  const calculateSummary = (orders) => {
    let totalEarnings = 0;
    let pendingOrders = 0;
    let completedOrders = 0;

    orders.forEach((order) => {
      totalEarnings += order.totalAmount;
      if (order.status === 'Pending') {
        pendingOrders += 1;
      } else if (order.status === 'completed') {
        completedOrders += 1;
      }
    });

    setSummary({
      totalEarnings,
      totalOrders: orders.length,
      pendingOrders,
      completedOrders,
    });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#841584" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.title}>Chef Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Total Earnings:</Text>
            <Text style={styles.value}>${summary.totalEarnings.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Total Orders:</Text>
            <Text style={styles.value}>{summary.totalOrders}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Pending Orders:</Text>
            <Text style={styles.value}>{summary.pendingOrders}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Completed Orders:</Text>
            <Text style={styles.value}>{summary.completedOrders}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#841584',
  },
});

export default ChefSummary;
