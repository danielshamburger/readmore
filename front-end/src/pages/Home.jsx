import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
    return (
        <section className="home-hero">
            <h2 className="hero-text">Share Your Reading List!</h2>
            <div className="cta">
                <NavLink to="/signup" className="btn">Sign Up</NavLink>
                <p className="medium-grey">Already have an account? <NavLink to="/login">Login</NavLink></p>
            </div>
        </section>
    );
}