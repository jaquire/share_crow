import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getUser, postUser, putUser, deleteUser } from '../actions/userActions.js';
import { getListing, postListing, putListing, deleteListing } from '../actions/listingActions.js';
import { getSession } from '../actions/sessionActions.js';
// import Landing from './Landing.js';
import NavBar from './NavBar.js';
// import NavbarLoggedIn from './NavbarLoggedIn.js';
import Footer from './Footer.js';
import ProfileCard from './ProfileCard.js';
import ProductList from './ProductList.js';
import MessageInbox from './MessageInbox.js';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.products = [];
    this.profile = props.session;

    this.messages = [
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: 'This be yo prof, pal',
        text: "I'm not yo pal, friend",
      },
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: "I'm not yo friend, guy",
        text: "But it's coo",
      },
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: 'This be yo prof, pal',
        text: "I'm not yo pal, friend",
      },
      {
        sender: 'Arthur',
        recipient: 'Ben',
        subject: "I'm not yo friend, guy",
        text: "But it's coo",
      },
    ];
  }

  componentDidMount() {
    this.methods = this.props.methods;
    // this.methods.getListing(`name=${this.props.session.username}`);
    // get user's info
    // get user's messages
    this.methods.getUser(`id=${this.props.session.id}`);
    // get user's items
    this.methods.getListing('owner_id=88');
  }

  componentWillReceiveProps(nextProps) {
    console.log('next!!', nextProps);
    this.products = nextProps.listing;
    // re-render with new props
  }

  render() {
    return (
      <div id="profile">
        <NavBar isLoggedIn={Boolean(true)} />
        <div className="row">
          <div className="col-xs-6 col-md-4">
            <ProfileCard profile={this.profile} />
            <MessageInbox messages={this.messages} />
          </div>
          <div>
            <h3>My Items</h3>
            <ProductList products={this.products} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  listing: PropTypes.array.isRequired,
  session: PropTypes.object.isRequired,
  methods: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { user, listing, session } = state;

  return {
    user,
    listing,
    session,
  };
}

const mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    methods: {
      getUser: (id) => {
        dispatch(getUser(id));
      },
      postUser: (data) => {
        dispatch(postUser(data));
      },
      putUser: (data) => {
        dispatch(putUser(data));
      },
      deleteUser: (data) => {
        dispatch(deleteUser(data));
      },
      getListing: (id) => {
        dispatch(getListing(id));
      },
      postListing: (data) => {
        dispatch(postListing(data));
      },
      putListing: (data) => {
        dispatch(putListing(data));
      },
      deleteListing: (data) => {
        dispatch(deleteListing(data));
      },
      getSession: () => {
        dispatch(getSession());
      },
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
