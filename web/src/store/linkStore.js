import { create } from 'zustand';

export const useLinkStore = create((set) => ({
  links: [],
  folders: [],
  selectedFolder: null,
  
  setLinks: (links) => set({ links }),
  
  addLink: (link) => set((state) => ({ links: [link, ...state.links] })),
  
  updateLink: (updatedLink) => set((state) => ({
    links: state.links.map((link) =>
      link._id === updatedLink._id ? updatedLink : link
    ),
  })),
  
  deleteLink: (linkId) => set((state) => ({
    links: state.links.filter((link) => link._id !== linkId),
  })),
  
  setFolders: (folders) => set({ folders }),
  
  addFolder: (folder) => set((state) => ({ folders: [folder, ...state.folders] })),
  
  updateFolder: (updatedFolder) => set((state) => ({
    folders: state.folders.map((folder) =>
      folder._id === updatedFolder._id ? updatedFolder : folder
    ),
  })),
  
  deleteFolder: (folderId) => set((state) => ({
    folders: state.folders.filter((folder) => folder._id !== folderId),
  })),
  
  setSelectedFolder: (folder) => set({ selectedFolder: folder }),
}));
