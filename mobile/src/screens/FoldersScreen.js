import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { folderAPI } from '../services/api';

export default function FoldersScreen() {
  const [folders, setFolders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    try {
      const response = await folderAPI.getAll();
      setFolders(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to load folders');
    }
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) {
      Alert.alert('Error', 'Please enter a folder name');
      return;
    }

    try {
      await folderAPI.create({ name: newFolderName, icon: '📁', color: '#3B82F6' });
      setNewFolderName('');
      setShowAddModal(false);
      loadFolders();
      Alert.alert('Success', 'Folder created!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create folder');
    }
  };

  const handleDeleteFolder = async (folderId) => {
    Alert.alert(
      'Delete Folder',
      'Are you sure? This will delete all links in this folder.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await folderAPI.delete(folderId);
              loadFolders();
              Alert.alert('Success', 'Folder deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete folder');
            }
          },
        },
      ]
    );
  };

  const renderFolder = ({ item }) => (
    <View style={styles.folderCard}>
      <View style={styles.folderInfo}>
        <Text style={styles.folderIcon}>{item.icon}</Text>
        <View style={styles.folderDetails}>
          <Text style={styles.folderName}>{item.name}</Text>
          <Text style={styles.folderDate}>
            Created {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFolder(item._id)}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Folders</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Text style={styles.addButtonText}>+ New Folder</Text>
        </TouchableOpacity>
      </View>

      {showAddModal && (
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Create New Folder</Text>
          <TextInput
            style={styles.input}
            placeholder="Folder name"
            value={newFolderName}
            onChangeText={setNewFolderName}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowAddModal(false);
                setNewFolderName('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleAddFolder}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={folders}
        renderItem={renderFolder}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No folders yet</Text>
          </View>
        }
      />
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listContent: {
    padding: 15,
  },
  folderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  folderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  folderIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  folderDetails: {
    flex: 1,
  },
  folderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  folderDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  deleteButton: {
    padding: 10,
  },
  deleteText: {
    fontSize: 20,
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: 'bold',
  },
  createButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
});
