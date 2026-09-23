import { PresentationControls } from '@react-three/drei';
import { useRef } from 'react'
import MacbookModel16 from '../models/Macbook-16';
import MacbookModel14 from '../models/Macbook-14';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

const ANIMATION_DURATION:number = 1;
const OFFSET_DISTANCE:number = 5;

const SCALE_LARGE_DESKTOP:number = 0.08;
const SCALE_LARGE_MOBILE:number = 0.05;

const fadeMeshes = (group: any, opacity: number,hideAfter = false) => {
    if (!group) return;

    if (opacity > 0) {
        group.visible = true;
    }

    group.traverse((child: any) => {
        if (child.isMesh) {
            child.material.transparent = true;

            gsap.to(child.material, {
                opacity,
                duration: ANIMATION_DURATION
            });
        }
    });

    if (hideAfter) {
        gsap.delayedCall(ANIMATION_DURATION, () => {
            group.visible = false;
        });
    }
};

const moveGroup = (group:any, x:number) => {
    if(!group) return;
    gsap.to(group.position, {x, duration: ANIMATION_DURATION});
}

interface ModelSwitcherProps {
    scale :number,
    isMobile :any
}

const ModelSwitcher = ({scale, isMobile}:ModelSwitcherProps) => {
    const smallMacbookRef = useRef<any>(null);
    const largeMacbookRef = useRef<any>(null);

    const showLargeMacbook = scale === SCALE_LARGE_MOBILE || scale === SCALE_LARGE_DESKTOP;

    useGSAP(() =>{
        if (showLargeMacbook) {
            largeMacbookRef.current.visible = true;

            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);

            fadeMeshes(smallMacbookRef.current, 0, true);
            fadeMeshes(largeMacbookRef.current, 1);

        } else {
            smallMacbookRef.current.visible = true;

            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0, true);
        }
    },[scale])

    const controlsConfig = {
        snap : true,
        speed : 1,
        zoom : 1,
        azimuth : [-Infinity, Infinity] as [number, number],
        config : {mass : 1, tension : 0, friction : 1},
            gesture: {
            axis: 'x', 
            lockDirection: true,
            eventOptions: { passive: true } 
    }
    }
  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08}/>
            </group>
        </PresentationControls>
        <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06}/>
            </group>
        </PresentationControls>
    </>
  )
}

export default ModelSwitcher