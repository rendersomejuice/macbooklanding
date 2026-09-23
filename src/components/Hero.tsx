import { useRef, useEffect } from "react"

const Hero = () => {

    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        video.playbackRate = 2;

        const observer = new IntersectionObserver(
            ([entry]) => {
            if (entry.isIntersecting) {
                video.play().catch(() => {});
            } else {
                video.pause();
            }
            },
            {
            threshold: 0.1
            }
        );

        observer.observe(video);

        return () => {
            observer.disconnect();
        };
    }, []);

  return (
    <section id="hero">
        <div>
            <h1>MacBook Pro</h1>
            <img src={import.meta.env.BASE_URL +"/title.png"} alt="Title"/>
        </div>

        <video ref={videoRef} src={import.meta.env.BASE_URL + "/videos/hero.mp4"} muted playsInline />
        <button>Buy</button>
        <p>$1500 or $133/mo for 12 months</p>
    </section>
  )
}

export default Hero