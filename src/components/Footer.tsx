import {footerLinks} from '../constants'

const Footer = () => {
  return (
    <footer>
      <div className="info">
        <p>More ways to shop. Find an Apple store or other retailer near you.</p>
        <img src="/logo.svg" alt="Apple logo" />
      </div>
      <hr />
      <div className="links">
        <p>Copyright this page is made for learning purposes only</p>
        <ul>
          {footerLinks.map(({link, label}) =>(
            <li key={label}>
              <a href={link}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer