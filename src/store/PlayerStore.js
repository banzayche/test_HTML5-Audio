import { create } from 'zustand'

const useStore = create((set) => ({
  activeStation: {},
  stationsList: [],
  setStations: (stations) => set({ stationsList: stations}),
  setActiveStation: (station) => set({ activeStation: station})
}));

export default useStore;

