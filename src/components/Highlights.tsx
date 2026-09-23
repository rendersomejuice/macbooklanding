import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive"
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Highlights = () => {
  const isMobile = useMediaQuery({query : '(max-width:1024px)'});

  useGSAP(() => {
    ScrollTrigger.refresh();

    gsap.fromTo(['.masonry>.left-column>div', '.masonry>.right-column>div'], 
      {
        y: -20,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: '#highlights',
          start: isMobile ? 'bottom center' : 'bottom center',
          end: isMobile ? 'center bottom' : 'bottom bottom',
          scrub: 1,
        },
        y: 0,
        opacity: 1,
        stagger: 0.3,
        duration: 1,
        ease: 'power1.inOut' 
      }
    );
  }, [isMobile]);

  return (
    <section id="highlights">
      <h2>There was never been a better time to upgrade.</h2>
      <h3>Here is what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src={ import.meta.env.BASE_URL +'laptop.png'} alt="Laptop"/>
            <p>Fly through demanding tasks up to 9.8x times faster.</p>
          </div>
          <div>
            <img src={import.meta.env.BASE_URL +"sun.png"} alt="Laptop"/>
            <p>
              A stunning <br/>
              Liquid Retina XDR <br/>
              display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src={import.meta.env.BASE_URL + "ai.png"} alt="AI"/>
            <p>Built for<br/>
               <span>Apple intelligence.</span></p>
          </div>
          <div>
            <img src={import.meta.env.BASE_URL +"battery.png"} alt="Battery"/>
            <p>
              Up to <br/>
              <span className="green-gradient">{' '}14 more hours{' '}</span><br/>
              <span className="text-dark-100">{' '}Up to 24h total.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights