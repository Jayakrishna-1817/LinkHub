import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { disconnectSocket } from '../services/socket';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            disconnectSocket();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>🔗</Text>
        <Text style={styles.appName}>LinkFind</Text>
        <Text style={styles.tagline}>Smart Link Organization</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || 'Loading...'}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || 'Loading...'}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.version}>Version 1.0.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  userInfo: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 15,
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  version: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 30,
    fontSize: 12,
  },
});
