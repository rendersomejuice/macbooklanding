import {performanceImages} from '../constants/'

const Performance = () => {
  return (
    <section id="performance">
        <h2>Next level graphics performance. Game on</h2>
        <div className="wrapper">
            {performanceImages.map(({id, src}) => (
                <img key={id} src={src} alt={id}  />
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