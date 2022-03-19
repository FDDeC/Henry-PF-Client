import React, { useState } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import img from '../img/logo2.png'

function NavBar() {

    const [user, setUser] = useState(false)

    const handleLogin = () => {
        user ? setUser(false) : setUser(true)
    }

    return (
        <nav className="navbar navbar-expand-lg flex-column bg-dark">
            <div className="container-fluid">
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/" style={{ width: "3%" }}><img src={img} alt="logo" style={{ width: "100%" }} /></Link>
                <Link className="text-light text-decoration-none fs-4 mx-3 navbar-brand" to="/">Beef Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon btn-outline-light" type="button"><GiHamburgerMenu /></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent" >
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to='/shop'>Tienda</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="text-light text-decoration-none fw-light fs-5 mx-3 nav-link" to="/about">Sobre nosotros</Link>
                        </li>
                    </ul>
                    {
                        user === false ?
                            <div>
                                <button className="btn btn-primary text-light text-decoration-none fs-6" onClick={handleLogin} >Ingresar</button>
                                <button className="btn btn-success text-light text-decoration-none fs-6 mx-3">Registrate</button>
                            </div>
                            :
                            <div>
                                <Link to="/cartDetails" className="btn btn-outline-success text-decoration-none fs-6 position-relative">Carrito <RiShoppingCartLine />
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        1
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                </Link>
                                <button className="btn btn-primary text-light text-decoration-none fs-6 mx-3" onClick={handleLogin}>Log out</button>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default NavBar