import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo, notification, user } from '../assets';
import { BiMenuAltRight } from 'react-icons/bi'
import { Button } from "@chakra-ui/react";

const Header = ({ pos }) => {

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 9) {
                let s = header.classList.add('bgcolor')
                console.log(s)
            }
            else {
                header.classList.remove('bgcolor')
            }


        })

        const menu = document.getElementById("menu");
        menu.addEventListener("click", (event) => {
            const hamburgerMenu = document.getElementById("hamburgerMenu");
            hamburgerMenu.style.display = "block";

            const close = document.getElementById("close");
            close.addEventListener("click",()=>{
                hamburgerMenu.style.display = "none"
            })
            event.stopPropagation();
            document.body.addEventListener("click", () => {
                hamburgerMenu.style.display = "none";

            })
        })
    }, [[]]);




    return (
        <>


            <header style={{ position: pos }} id="header">
                <div className="headerCont container">
                    {/* left nav */}
                    <nav className="leftNav">
                        <figure className="logo">
                            <img src={logo} alt="Netflix" />
                        </figure>
                        <ul className="leftNavCont">
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/'>Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/movies'>Movies</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/mylist'>My List</NavLink>
                        </ul>
                    </nav>
                    {/* right nav */}
                    <nav className="rightNav">

                        <div className="rightNavItem" id='searchBoxDiv'>
                            <div className='searchbox'>
                                <i className="fa fa-search fa-2x"></i>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="rightNavItem">
                            <img style={{ filter: 'invert(100%)' }} src={notification} alt="" />
                        </div>

                        <div className="rightNavItem" id="userMenu">
                            <img src={user} alt="" />

                            <div className="userOptCont" id='userOptCont'>
                                <div className="user" id="user">
                                    <figure>
                                        <img src={user} alt="" />
                                    </figure>
                                    <p>User 1</p>
                                </div>

                                <div className="user" id="user">
                                    <figure>
                                        <img src={user} alt="" />
                                    </figure>
                                    <p>User 2</p>
                                </div>

                                <div className="user" id="user">
                                    <figure>
                                        <img src={user} alt="" />
                                    </figure>
                                    <p>User 3</p>
                                </div>

                                <div className="user" id="user">
                                    <i className="fa fa-pencil fa-2x"></i>
                                    <p>Manage Profile</p>
                                </div>

                                <div className="user" id="user">
                                    <i className="fa fa-square fa-2x"></i>
                                    <p>Transfer profile</p>
                                </div>

                                <div className="user" id="user">
                                    <i className="fa fa-user fa-2x"></i>
                                    <p>Account</p>
                                </div>

                                <div className="user" id="user">
                                    <i className="fa fa-question-circle fa-2x"></i>
                                    <p>Help center</p>
                                </div>

                                <div className="user" id="signOut">
                                    <p>Sign out Netflix</p>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <div class="hamburger_icon">
                    <i class="fa fa-bars" id="menu"></i>
                </div>
                <nav className="hamburgerMenu" id='hamburgerMenu'>
                    <i class="fa fa-close" id="close"></i>
                    <div className="hamburgerCont">
                        <ul className="leftNavCont">
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/'>Home</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/movies'>Movies</NavLink>
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to='/mylist'>My List</NavLink>
                        </ul>
                        <div className="rightNavItem" id='searchBoxDiv'>
                            <div className='searchbox'>
                                <i className="fa fa-search fa-2x"></i>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="rightNavItem">
                            <img style={{ filter: 'invert(100%)' }} src={notification} alt="" />
                        </div>

                        <div className="user" id="user">
                            <i className="fa fa-pencil fa-2x"></i>
                            <p>Manage Profile</p>
                        </div>

                        <div className="user" id="user">
                            <i className="fa fa-square fa-2x"></i>
                            <p>Transfer profile</p>
                        </div>

                        <div className="user" id="user">
                            <i className="fa fa-user fa-2x"></i>
                            <p>Account</p>
                        </div>

                        <div className="user" id="user">
                            <i className="fa fa-question-circle fa-2x"></i>
                            <p>Help center</p>
                        </div>

                        <div className="user" id="signOut">
                            <p>Sign out Netflix</p>
                        </div>

                    </div>
                </nav>
            </header>
            {/* hamburger check later */}


        </>
    )
}

export default Header