import {create} from 'zustand'

const useMacbookStore = create((set) => ({
    color : '2c2e2e',
    setColor: (color:string) => set({color}),

    scale : '0.08',
    setScale : (scale:string) => set({scale}),

    reset : () => set({ color : '2c2e2e', scale : '0.08' })
}))

export default useMacbookStore