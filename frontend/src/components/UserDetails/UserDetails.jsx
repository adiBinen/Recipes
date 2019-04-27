import React, { useState, useEffect } from 'react';
import RecipeList from '../RecipeList';
import Capitalize from '../../filters/Capitalize.js';
import FromNow from '../../filters/FromNow.jsx';
import './UserDetails.scss';

const UserDetails = (props) => {
    const [userId, setUserId] = useState(null)
    const [hidden, setHidden] = useState(true)
    const { user } = props;
    useEffect(() => {
        if (userId !== props.match.params.userId) {
            setUserId(props.match.params.userId);
            props.loadUser(props.match.params.userId)
        }
        return () => {
            props.clearUserToDisplay();
        }
    }, [props.match.params.userId])

    const numOfStarts = (user && user.recipes.length) ? user.recipes.reduce((counterAcc, recipe) => counterAcc + recipe.starred.length, 0) : null;

    return (user) ? (
        <section className="user-details">
            <div className="top-fold">
                <img className="user-details-img" src={user.img} alt="user" />
                <div className="top-fold-details">
                    <h1><Capitalize str={user.name} /></h1>
                    {numOfStarts && 
                        <div className="starsNum">
                            <i className="far fa-star"></i>
                            <p>&nbsp;&nbsp;( {numOfStarts} )</p>
                        </div>
                    }
                    <p>Joined&nbsp;<FromNow createdAt={user.createdAt}/></p>
                </div>
            </div>
            <div className="user-recipe-container">
                <h2 className="users-recips">
                    <Capitalize str={user.name} />'s recipes&nbsp;
                    <span>
                    {hidden ? (
                        <span onClick={() => setHidden(false)}>
                            <i className="fas fa-chevron-down"></i>
                        </span>
                    ) : (
                        <span onClick={() => setHidden(true)}>
                            <i className="fas fa-chevron-up"></i>
                        </span>
                    )}
                    </span>
                </h2>
                {hidden ? null : <RecipeList recipes={user.recipes} />}
            </div>
        </section>
    ) : null
}

export default UserDetails
