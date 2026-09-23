import {create} from 'zustand'
import * as THREE from 'three'

const DEFAULT_COLOR:string = '#2c2e2e';
const DEFAULT_SCALE:number = 0.08;

interface MacbookState {
    color:string,
    setColor:(color:string) => void,
    scale:number,
    setScale: (scale:number) => void,
    texture: THREE.VideoTexture | null,
    setTexture: (texture: THREE.VideoTexture | null) => void,
    reset: () => void

}

const useMacbookStore = create<MacbookState>((set) => ({
    color : DEFAULT_COLOR,
    setColor: (color:string) => set({color}),

    scale : DEFAULT_SCALE,
    setScale : (scale:number) => set({scale}),

    texture : null,
    setTexture: (texture: THREE.VideoTexture | null) => set({ texture }),

    reset : () => set({ color : DEFAULT_COLOR, scale : DEFAULT_SCALE, texture :null })
}))

export default useMacbookStore