import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive"
import gsap from 'gsap'

const Highlights = () => {
  const isMobile = useMediaQuery({query : '(max-width:1024px)'});

  useGSAP(() => {
    gsap.to(['.left-column', '.right-column'],{
      scrollTrigger:{
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top top',
        end: isMobile ? 'bottom bottom' : 'top bottom',

      },
      y: 0,
      opacity: 1,
      stagger: 1,
      duration: 1,
      ease: 'power1.inOut' 
    });
  });

  return (
    <section id="highlights">
      <h2>There was never been a better time to upgrade.</h2>
      <h3>Here is what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src={ import.meta.env.BASE_URL +'/laptop.png'} alt="Laptop"/>
            <p>Fly through demanding tasks up to 9.8x times faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Laptop"/>
            <p>
              A stunning <br/>
              Liquid Retina XDR <br/>
              display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src={import.meta.env.BASE_URL + "/ai.png"} alt="AI"/>
            <p>Built for<br/>
               <span>Apple intelligence.</span></p>
          </div>
          <div>
            <img src={import.meta.env.BASE_URL +"/battery.png"} alt="Battery"/>
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