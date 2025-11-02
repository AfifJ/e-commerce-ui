import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSidebarStore = create(
  persist(
    (set, get) => ({
      // State for expanded/collapsed menu items
      expandedItems: [],

      // Toggle expanded state for menu items
      toggleExpanded: (title) => {
        set((state) => ({
          expandedItems: state.expandedItems.includes(title)
            ? state.expandedItems.filter((item) => item !== title)
            : [...state.expandedItems, title],
        }));
      },

      // Set expanded items (for auto-expanding based on current route)
      setExpandedItems: (items) => {
        set({ expandedItems: items });
      },

      // Check if an item is expanded
      isExpanded: (title) => {
        return get().expandedItems.includes(title);
      },

      // Reset all expanded items
      resetExpanded: () => {
        set({ expandedItems: [] });
      },
    }),
    {
      name: 'sidebar-storage', // name of the item in localStorage
      partialize: (state) => ({
        expandedItems: state.expandedItems
      }), // only persist expandedItems
    }
  )
);

export { useSidebarStore };