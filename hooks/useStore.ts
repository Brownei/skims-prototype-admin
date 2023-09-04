"use client"
import { create } from 'zustand';
import { StyleColumn } from '@/components/style/columns';

//LOADING STATE STORE
type LoadingState = {
    Loading: boolean;
}
type LoadingAction = {
    onLoading: () => void
    notLoading: () => void
}

export const useLoadingStore = create<LoadingState & LoadingAction>((set) => ({
    Loading: false,
    onLoading: () => set({ Loading: true }),
    notLoading: () => set({ Loading: false })
}))


//INITIAL STATE STORE 
type InitialStyleState = {
    initialStyle: StyleColumn | null
}

type InitialStyleAction = {
    onChange: (style: StyleColumn) => void
    onRemove: () => void
}

export const useInitialStyleStore = create<InitialStyleState & InitialStyleAction>((set) => ({
    initialStyle: null,
    onChange: (style) => {
        set({initialStyle: style})
    },
    onRemove: () => {
        set({initialStyle: null})
    }
}))