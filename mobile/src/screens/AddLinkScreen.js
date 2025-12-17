import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Picker } from '@react-native-picker/picker';
import { linkAPI, folderAPI } from '../services/api';

export default function AddLinkScreen({ navigation }) {
  const [url, setUrl] = useState('');
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFolders();
    checkClipboard();
  }, []);

  const loadFolders = async () => {
    try {
      const response = await folderAPI.getAll();
      setFolders(response.data);
      if (response.data.length > 0) {
        setSelectedFolder(response.data[0]._id);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load folders');
    }
  };

  const checkClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
      setUrl(text);
    }
  };

  const handlePasteFromClipboard = async () => {
    const text = await Clipboard.getStringAsync();
    setUrl(text);
  };

  const handleAddLink = async () => {
    if (!url || !selectedFolder) {
      Alert.alert('Error', 'Please enter a URL and select a folder');
      return;
    }

    setLoading(true);
    try {
      await linkAPI.create({ url, folderId: selectedFolder });
      Alert.alert('Success', 'Link added successfully!');
      setUrl('');
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add New Link</Text>
        <Text style={styles.subtitle}>Paste any link and we'll organize it for you</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Link URL</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="https://example.com"
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
              keyboardType="url"
            />
            <TouchableOpacity
              style={styles.pasteButton}
              onPress={handlePasteFromClipboard}
            >
              <Text style={styles.pasteButtonText}>Paste</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Select Folder</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFolder}
              onValueChange={setSelectedFolder}
              style={styles.picker}
            >
              {folders.map((folder) => (
                <Picker.Item
                  key={folder._id}
                  label={`${folder.icon} ${folder.name}`}
                  value={folder._id}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleAddLink}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Adding...' : 'Add Link'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 30,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  pasteButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: 10,
  },
  pasteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
