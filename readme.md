# ReadMore
GVSU CIS 371 Semester Project. Users can sign up, log in, and share book reviews.

This MERN stack web app features a REST API backend built with Node, Express, and MongoDB. The front-end is built with React.

## API
Deployed at: https://readmore-api.herokuapp.com/ (can be tested with https://www.postman.com/)

Endpoints include:
- `GET /posts/` returns posts and user fname and lname.
- `POST /posts/` (requires authentication) adds post to DB. Expects request body to contain user, description, isbn, and rating.
- `DELETE /postId` (requires authentication) deletes post from DB.
- `GET /user/list` returns list of users.
- `POST /user/signup` adds new user. Expects body to contain email, fname, and lname.
- `POST /user/login` authenticates a user based on email and password in request body, returns token.
- `DELETE /user/userId` (requires authentication) deletes user from DB.

## ToDo
- It would be cool to be able to search for books by title, but [ISBNdb] (https://isbndb.com/) costs moneys.
- Implement "following" of other users.
- Implement post and account deletion.
