import React, { Component } from "react";

class Feed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    async componentDidMount() {
        let postList = [];

        let posts = await this.getPostsData();
        let isbnArray = posts.map( post => post.isbn);
        let isbnList = isbnArray.join(',');
        let bookData = await this.getBookData(isbnList);

        posts.forEach( (post) => {
            if (bookData[post.isbn]){
                const postObj = {
                    _id: post._id,
                    isbn: post.isbn,
                    user: post.user.fname + ' ' + post.user.lname,
                    title: bookData[post.isbn].title,
                    author: bookData[post.isbn].authors.map((author) => author.name).join(', '),
                    subtitle: bookData[post.isbn].subtitle,
                    image: bookData[post.isbn].cover.large,
                    description: post.description,
                    rating: post.rating
                }
                postList.push(postObj);
            }
        } );

        this.setState({ posts: postList });
    }

    getPostsData = async () => {
        const response = await fetch("http://localhost:3001/posts");
        const data = await response.json();
        return data;
    };

    getBookData = async isbn => {
        const response = await fetch(`http://openlibrary.org/api/books?bibkeys=${isbn}&format=json&jscmd=data`);
        const data = await response.json();
        return data;
    };

	render() {

        const postList = this.state.posts.map(post => {
            return (
                <li key={post._id} className="post">
                    <div className="book-cover">
                        <img src={post.image} alt={post.title} />
                    </div>
                    <div className="post-text">
                        <p className="medium-grey">{post.user}'s review of:</p>
                        <h3 className="book-title">{post.title}</h3>
                        <h4 className="book-subtitle">{post.subtitle}</h4>
                        <p className="author">By {post.author}</p>
                        <p className="isbn">ISBN: {post.isbn}</p>
                        <p className="rating"><strong>Rating:</strong> {post.rating}/5 stars</p>
                        <p className="description"><strong>Review:</strong> {post.description}</p>
                    </div>
                        
                </li>
            );
        });

        return (
            <React.Fragment>
                {/* <NavLink to="/new" className="btn full-width">New Post</NavLink> */}
                <ul className="post-list">{postList}</ul>
            </React.Fragment>
        );

	}
}

export default Feed;
