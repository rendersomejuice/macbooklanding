import clsx from 'clsx';
import useMacbookStore from '../store'
import {Canvas} from '@react-three/fiber'
import StudioLights from './three/StudioLights';
import ModelSwitcher from './three/ModelSwitcher';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';

const ProductViewer = () => {
    const {color, scale, setColor, setScale} = useMacbookStore();
    const isMobile:boolean = useMediaQuery({query : '(max-width : 1024px)'}); 

    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="product-viewer" ref={sectionRef}>
            <h2>Take a closer look.</h2>
            <div className="controls">
                <p className="info">Macbook Pro {scale === 0.06 ? '14"' : '16"' } in {color === '#adb5bd' ? 'space grey' : 'dark' }.</p>
                <div className="flex-center gap-5 mt-5">
                    <div className="color-control">
                        <div 
                            onClick={() => setColor('#adb5bd')} 
                            className={clsx('bg-neutral-300', color === 'adb5bd' && 'active')}
                        />
                        <div 
                            onClick={() => setColor('#2c2e2e')} 
                            className={clsx('bg-neutral-900', color === '2c2e2e' && 'active')}
                        />
                    </div>
                    <div className="size-control">
                        <div 
                            onClick={() => setScale(0.06)} 
                            className={clsx(scale === 0.06 ? 'bg-white text-black' : 'bg-transparent text-white')}
                        >
                            <p>14"</p>
                        </div>
                        <div 
                            onClick={() => setScale(0.08)} 
                            className={clsx(scale === 0.08 ? 'bg-white text-black' : 'bg-transparent text-white')}
                        >
                            <p>16"</p>
                        </div>
                    </div>
                </div>
            </div>
            <Canvas id="canvas" dpr={1} frameloop={isVisible ? "always" : "never"} style={{ touchAction: 'pan-y' }} camera={{position : [0,2,5], fov : 50, near : 0.1, far : 100} }>
                <StudioLights/>
                <ModelSwitcher scale={isMobile ? scale -0.03 : scale} isMobile={isMobile}/>
            </Canvas>
        </section>
    )
}

export default ProductViewer