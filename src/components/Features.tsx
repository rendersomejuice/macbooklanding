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

const ModelScroll = ({ isVisible }: { isVisible: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const isTablet = useMediaQuery({query :'(max-width:1024px)'});
  const {setTexture} = useMacbookStore();
  const [videoTextures, setVideoTextures] = useState<THREE.VideoTexture[]>([]);

  const playTexture = (index: number) => {
  videoTextures.forEach((texture, i) => {
    const video = texture.image as HTMLVideoElement;

    if (i === index) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  setTexture(videoTextures[index]);
};

  useEffect(() => {
    const textures = featureSequence.map((feature) => {
      //preloading all videos without putting them at the dom
      const v = document.createElement('video');
      Object.assign(v,{
        src: import.meta.env.BASE_URL + feature.videoPath,
        muted: true,
        playsInline: true,
        crossOrigin : 'anonymous'
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

  useEffect(() => {
    if (videoTextures.length === 0) return;

    if (!isVisible) {
        videoTextures.forEach((texture) => {
            const video = texture.image as HTMLVideoElement;
            video.pause();
        });
    }
  }, [isVisible, videoTextures]);

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
        playTexture(0);
      })
      .to('.box1', { opacity: 1, y: 0, delay: 1 })

      .call(() => {
        playTexture(1);
      })
      .to('.box2', { opacity: 1, y: 0 })

      .call(() => {
        playTexture(2);
      })
      .to('.box3', { opacity: 1, y: 0 })

      .call(() => {
        playTexture(3);
      })
      .to('.box4', { opacity: 1, y: 0 })

      .call(() => {
        playTexture(4);
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
    <section id='features' ref={sectionRef}>
      <h2>See it all in a new light.</h2>
      <Canvas id="f-canvas" dpr={1} frameloop={isVisible ? "always" : "never"} camera={{}}>
        <StudioLights/>
        <ambientLight intensity={0.5}/>
        <ModelScroll isVisible={isVisible}/>
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