import React from 'react'
import CartIcon from './CartIcon'
import ProfileDropDown from './ProfileDropDown'
import Logo from './Logo'

export default function Header({ cartCount, username }) {
  return (
    <header className="header">
        <header className="header-content">
            <Logo />
            <div className="header-actions">
                <CartIcon count={cartCount}/>
                <ProfileDropDown username={username} />
            </div>
        </header>
    </header>
  )
}
