import { Canvas } from "@react-three/fiber"
import StudioLights from "./three/StudioLights"
import { features, featureSequence } from "../constants"
import clsx from "clsx"
import { Suspense, useEffect, useRef, useState } from "react"
import { MacBookModel } from "./models/Macbook"
import { useMediaQuery } from "react-responsive"
import { Html } from "@react-three/drei"
import useMacbookStore from "../store"
import { useGSAP } from "@gsap/react"
import gsap from 'gsap'
import * as THREE from 'three'

const ModelScroll = () => {
  const groupRef = useRef<THREE.Group>(null);
  const isTablet = useMediaQuery({query :'(max-width:1024px)'});
  const {setTexture} = useMacbookStore();
  const [videoTextures, setVideoTextures] = useState<THREE.VideoTexture[]>([]);

  useEffect(() => {
    const textures = featureSequence.map((feature) => {
      //preloading all videos without putting them at the dom
      const v = document.createElement('video');
      Object.assign(v,{
        src: import.meta.env.BASE_URL + feature.videoPath,
        muted: true,
        playsInline: true,
        autoplay:true,
        crossOrigin : 'anonymous'
      });

      v.play().catch(() => {
              /* Evitamos que salten errores en consola por restricciones de Autoplay */
      });

      const texture = new THREE.VideoTexture(v);
      texture.colorSpace = THREE.SRGBColorSpace;

      texture.generateMipmaps = false; 
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      return texture;
    });

    setVideoTextures(textures);

    if (textures.length > 0) {
      setTexture(textures[0]);
    }
    return () => {
      textures.forEach((t) => {
        const videoElement = t.image as HTMLVideoElement;
        if (videoElement) {
          videoElement.pause();
          videoElement.src = "";
          videoElement.load();
        }
        t.dispose();
      });
    };
  },[setTexture]);

  useGSAP(() => {
    if (videoTextures.length === 0) return;
    //3d rotation
    const modelTimeline = gsap.timeline({
      scrollTrigger:{
        trigger: "#f-canvas",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true
      }
    });

    //feature sync
    const timeline = gsap.timeline({
      scrollTrigger:{
        trigger: "#f-canvas",
        start: "top center",
        end: "bottom top",
        scrub: 1,
      }
    });

    //3d spin
    if(groupRef.current){
      modelTimeline.to(groupRef.current.rotation, {y: Math.PI * 2, ease: 'power1.inOut'})
    }

    //content and texture animation
    timeline
      .call(() => {
        setTexture(videoTextures[0]);
        (videoTextures[0].image as HTMLVideoElement).play().catch(() => {});
      })
      .to('.box1', { opacity: 1, y: 0, delay: 1 })

      .call(() => {
        setTexture(videoTextures[1]);
        (videoTextures[1].image as HTMLVideoElement).play().catch(() => {});
      })
      .to('.box2', { opacity: 1, y: 0 })

      .call(() => {
        setTexture(videoTextures[2]);
        (videoTextures[2].image as HTMLVideoElement).play().catch(() => {});
      })
      .to('.box3', { opacity: 1, y: 0 })

      .call(() => {
        setTexture(videoTextures[3]);
        (videoTextures[3].image as HTMLVideoElement).play().catch(() => {});
      })
      .to('.box4', { opacity: 1, y: 0 })

      .call(() => {
        setTexture(videoTextures[4]);
        (videoTextures[4].image as HTMLVideoElement).play().catch(() => {});
      })
      .to('.box5', { opacity: 1, y: 0 });

  },[videoTextures, setTexture]);

  return(
    <group ref={groupRef}>
      <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">LOADING...</h1></Html>}>
        <MacBookModel scale={isTablet ? 0.05 : 0.08} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
} 

const Features = () => {
  return (
    <section id='features'>
      <h2>See it all in a new light.</h2>
      <Canvas id="f-canvas" camera={{}}>
        <StudioLights/>
        <ambientLight intensity={0.5}/>
        <ModelScroll/>
      </Canvas>
      <div className="absolute inset-0">
        {features.map((feature, index) =>(
          <div key={feature.id} className={clsx('box', `box${index + 1}`, feature.styles)}>
            <img src={import.meta.env.BASE_URL + feature.icon} alt={feature.highlight}/>
            <p>
              <span className="text-white">{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features