import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive'

const Showcase = () => {
    const isTablet = useMediaQuery({query : '(max-width:1024px)'});

    useGSAP(()=>{
        if(!isTablet){
            const timeline = gsap.timeline({
                scrollTrigger:{
                    trigger: "#showcase",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    pin: isTablet ? false : true,
                } 
            });
            timeline.to(".mask img", {
                scale:1.5
            }).to('.content', {opacity: 1, y: 0, ease : 'power1.in' })
        }

    },[isTablet])

    return (
    <section id="showcase" className="relative min-h-[200vh]">
        <div className="media">
            <video src={import.meta.env.BASE_URL +"videos/game.mp4"} loop muted autoPlay playsInline/>
            <div className="mask">
                <img src={import.meta.env.BASE_URL +"mask-logo.svg"}/>
            </div>
        </div>
        <div className='content'>
            <div className='wrapper'>
                <div className='lg:max-w-md'>
                    <h2>Rocket Chip</h2>
                    <div className='space-y-5 mt-7 pe-10'>
                        <p>
                            Introducing {""}
                            <span className='text-white'>
                                M4 The next generation of Apple Silicon.
                            </span>
                            .M4 Powers
                        </p>
                        <p>
                            Run graphics-intensive workflows with responsiveness that keeps up with your imagination. Each chip in the M5 family features a GPU with enhanced shader cores and a third-generation ray‑tracing engine, so 3D modeling is crisper and clearer than ever. And Dynamic Caching optimizes on-chip memory to significantly increase GPU utilization — driving huge performance boosts for pro apps and games.
                        </p>
                        <p>
                            A powerful Neural Accelerator is built into each GPU core of the M5 family of chips, which dramatically speeds up AI tasks like image generation from diffusion models, large language model (LLM) prompt processing, and on-device transformer model training. The 16-core Neural Engine drives Apple Intelligence features, making on-device AI powerful and energy efficient.
                        </p>
                        <p className='text-primary'>
                            Learn more about Apple intelligence.
                        </p>
                    </div>
                </div>
                <div className='max-w-3xs space-y-14'>
                    <div className='space-y-2'>
                        <p>Up to</p>
                        <h3>4x faster</h3>
                        <p>than the moon</p>
                    </div>
                    <div className='space-y-2'>
                        <p>Up to</p>
                        <h3>1.5 faster</h3>
                        <p>Supersonic CPU</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Showcase