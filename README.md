# demo-managing-polls-react-apollo

_Implement a solution for managing and executing polls (use as visual reference the polls
on Twitter or Telegram) using **react.js**, **apollo-client** and **apollo-sever** with **mongoDB**_

## Application pages:
### Sign in/Sign up pages:
- Standard user/password to authenticate into the system.
- For Sign up, request all the information in one form and move into the system with the users auto-validated:

  ▪ Usernames must be unique.
  
  ▪ Stablish rules for strong password setting.
  
  ▪ New users will have the User role.

### User Profile (username, full name, password, avatar):Page to configure all the profile elements associated to a user.

### Polls:Page where every user can see all the polls in the system. It will have two ways of seeing polls (switching between views):
- A tile view where each poll is represented by a card component. All the voting/results viewing will take place inside the card. On this view, no sidebar will be shown.
- Users will be able to vote only once per poll unless the poll is edited. In that case, the permission tovote will be granted again.

### Polls Management Page: where the power users or admins can see the list of polls, create new ones, edit or  remove existing ones:
- Single-answer type polls.
- Every user can vote only one time per each poll.
- A poll can be closed, in that case no user can vote on the poll and only the results will be shown.
- The details of the polls will be seen in a sidebar that will appear from the right side of the screen.
- Every time an existing poll is modified, some kind of visual aid will alert users in the Polls Page that the poll was changed (i.e.: different background color, some icon in the corner of the card).

### User Management Page: page where the users with Admin role can track registered users in the system:
- The users can be seen in a table-like structure.
- User Roles:
  
  ▪ User: can interact with already created polls, seen the results and making his own vote.

  ▪ Power User: same as Users. Can also create new Polls, update and remove existing ones.
  
  ▪ Admin: same privileges as Power Users. Can also manage users (create, remove, change role, password).
  

