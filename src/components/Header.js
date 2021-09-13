import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react'
import { fetchUser, clearUser } from './../actions';
import { HeaderBar, HeaderItem } from './styledComponents'


class Header extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { login } = this.props;
        return (login && login !== '') ? (
            <HeaderBar secondary>
                <Link to="/" >
                    <HeaderItem
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                    />
                </Link>
                
                <Menu.Menu position='right'>
                    <HeaderItem
                        name='logout'
                        onClick={() => this.props.clearUser()}
                    />
                </Menu.Menu>
            </HeaderBar>
        ) : (
            <HeaderBar secondary />
        )
    }
}

function mapStateToProps({ login }) {
    return { login };
}

export default connect(mapStateToProps, { fetchUser, clearUser })(Header);