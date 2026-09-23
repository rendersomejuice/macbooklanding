import {NavLinks} from '../constants'

const navbar = () => {
  return (
    <header>
        <nav>
            <img src={import.meta.env.BASE_URL +"logo.svg"} alt="Apple logo"/>
            <ul>
                {NavLinks.map(({label}) => (
                    <li key={label}>
                        <a href={label}>{label}</a>
                    </li>
                ))}
            </ul>
            <div className="flex-center gap-3">
                <button>
                    <img src={import.meta.env.BASE_URL +"search.svg"} alt="Search"/>
                </button>
                <button>
                    <img src={import.meta.env.BASE_URL +"cart.svg"} alt="Cart"/>
                </button>
            </div>
        </nav>
    </header>
  )
}

export default navbar