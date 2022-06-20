import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <header className="header">
            <h1 className="title">Treats For Jumbo Now</h1>
            <nav className='navbar'>
                <NavLink to='/' className='navlink'>Home</NavLink>
                <NavLink to='/login' className='navlink'>Login</NavLink>
                <NavLink to ='/dashboard' className='navlink'>Dashboard</NavLink>
                <NavLink to='/treatgame' className='navlink-game'>Treat Game</NavLink>
            </nav>
        </header>
    );
}

export default Navbar;
