import {create} from 'zustand'

const DEFAULT_COLOR:string = '#2c2e2e';
const DEFAULT_SCALE:number = 0.08;
const DEFAULT_TEXTURE:string = '/videos/feature-1.mp4';

const useMacbookStore = create((set) => ({
    color : DEFAULT_COLOR,
    setColor: (color:string) => set({color}),

    scale : DEFAULT_SCALE,
    setScale : (scale:number) => set({scale}),

    texture : DEFAULT_TEXTURE,
    setTexture : (texture:string) => set({texture}),

    reset : () => set({ color : DEFAULT_COLOR, scale : DEFAULT_SCALE, texture :DEFAULT_TEXTURE })
}))

export default useMacbookStore