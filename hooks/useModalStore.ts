"use client"
import { create } from 'zustand';

type useModalStoreProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModalStore = create<useModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));