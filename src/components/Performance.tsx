import { useMediaQuery } from 'react-responsive';
import {performanceImages, performanceImgPositions} from '../constants/'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap'
import { useRef } from 'react';

const Performance = () => {
    const isTablet = useMediaQuery({query : '(max-width:1024px)'});
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(()=>{
        if(!isTablet){
            gsap.fromTo(".content p",{
                    opacity:0,
                    y: 10
                },{
                    opacity:1,
                    y:-10,
                    duration:2,
                    ease:"power2.out",
                    scrollTrigger:{
                        trigger: '.content p',
                        start: 'top bottom',
                        end: 'top center',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });

            const timeline = gsap.timeline({
                defaults: {ease: "Power1.inOut", duration : 2, overwrite: "auto"},
                scrollTrigger:{
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "center center",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });

            performanceImgPositions.forEach((pos) =>{
                if(pos.id === "p5") return;

                interface transformVars  {
                    left:string
                    right:string
                    bottom:string
                    transform:string
                };

                const toVars:transformVars = {
                    left: "", right: "", bottom: "", transform: ""
                }

                if(pos.left !== undefined) toVars.left = `${pos.left}%`;
                if(pos.right !== undefined) toVars.right = `${pos.right}%`;
                if(pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
                if(pos.transform !== undefined) toVars.transform = `${pos.transform}%`;

                timeline.to(`.${pos.id}`, toVars, 0);
            });
        }
    },{ dependencies: [isTablet], scope: sectionRef })

    return (
    <section id="performance" ref={sectionRef}>
        <h2>Next level graphics performance. Game on</h2>
        <div className="wrapper">
            {performanceImages.map(({id, src}) => (
                <img className={id} key={id} src={import.meta.env.BASE_URL + src} alt={id}  />
            )
            )}
        </div>
        <div className='content'>
            <p>
                Apple silicon, and every major subsystem that powers it, <span className='text-white'>is designed for AI</span> — creating a platform that comprehensively unites hardware, software, and ecosystem. So you can run demanding on-device AI workloads with incredible power efficiency. And as always, security and privacy are designed in, not just bolted on.
            </p>
        </div>
    </section>
    )
}

export default Performance