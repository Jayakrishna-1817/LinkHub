import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Linking, Alert } from 'react-native';
import { linkAPI } from '../services/api';
import { getSocket } from '../services/socket';

export default function HomeScreen() {
  const [links, setLinks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadLinks();
    setupSocket();
  }, []);

  const loadLinks = async () => {
    try {
      const response = await linkAPI.getAll();
      setLinks(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load links');
    }
  };

  const setupSocket = () => {
    const socket = getSocket();

    socket.on('link:created', ({ link }) => {
      setLinks(prev => [link, ...prev]);
    });

    socket.on('link:deleted', ({ linkId }) => {
      setLinks(prev => prev.filter(l => l._id !== linkId));
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLinks();
    setRefreshing(false);
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const handleDeleteLink = async (linkId) => {
    try {
      await linkAPI.delete(linkId);
      setLinks(prev => prev.filter(l => l._id !== linkId));
      Alert.alert('Success', 'Link deleted');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete link');
    }
  };

  const renderLink = ({ item }) => (
    <View style={styles.linkCard}>
      <View style={styles.linkHeader}>
        <Text style={styles.source}>{item.source.toUpperCase()}</Text>
        <Text style={styles.date}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      
      {item.description && (
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      )}

      {item.tags.length > 0 && (
        <View style={styles.tags}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => handleOpenLink(item.url)}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteLink(item._id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={links}
        renderItem={renderLink}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No links yet</Text>
            <Text style={styles.emptySubtext}>Add your first link to get started!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  listContent: {
    padding: 15,
  },
  linkCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  linkHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  source: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 5,
    marginBottom: 5,
  },
  tagText: {
    fontSize: 12,
    color: '#1E40AF',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  openButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 5,
  },
});
