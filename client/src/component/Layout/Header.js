import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { BsShop } from 'react-icons/bs'
import { useAuth } from '../../context/Auth'
import { tostS } from '../../toast/Toast'
import SearchInput from '../forms/SearchInput'
import useCategory from '../../hooks/useCategory'
import { Badge } from 'antd';
import { useCart } from '../../context/Cart'
const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem('auth');
        tostS("Logout Successfully");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" > <BsShop /> Ecommerce App</Link>
                        <div className="m-auto">
                            <SearchInput />
                        </div>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className='nav-link dropdown-toggle'
                                    to={'/categories'}
                                    role='button'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={'/categories'}>
                                            All Categories
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c._id} >
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>

                                        </li>
                                    ))}
                                </ul>

                            </li>

                            {!auth.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>

                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </NavLink>
                                        <ul className="dropdown-menu">
                                            <li><NavLink to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"} `} className="dropdown-item" >Dashboard</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li className="">
                                                <NavLink onClick={handleLogout} className="dropdown-item" to="/login">Logout</NavLink>
                                            </li>

                                        </ul>
                                    </li>


                                </>
                            )}
                            <li className="nav-item me-2">
                                <NavLink className="nav-link" to="/cart">
                                    <Badge count={cart?.length} showZero offset={[10, -5]}>
                                        Cart
                                    </Badge>
                                </NavLink>

                            </li>
                        </ul>


                    </div>
                </div>
            </nav >

        </>
    )
}

export default Header
