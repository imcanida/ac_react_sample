# Interview Code Sample
## Requirements:
-Display a list of 3 existing users
	Can be hard-coded
	BONUS: Pull them from a .json file to simulate an API call

-Use at least the following React hooks: 
	useContext, useReducer

-All data and actions should be performed by context. No prop drilling, passing callbacks, etc.

-Provide a toggle for each user to enable/disable a user and display the current state for each user

-BONUS: Add a new user to the list using a button or simple form

-UI styling does not matter.... this is 100% about functionality.

## Packages Used:
reactstrap - Quick Bootstrap elements.
formik - Form Validation.
yup - Used in Conjunction with Formik for Validation.

## Usage:
npm start

## Explanation

As per the requirements I added in a UserListContext which uses a UserListReducer to control state of the UserList(an array).
UserListReducer has Four distinct actions:
	"ADD_USER": To add a new user
	"TOGGLE_USER": Set enabled to opposite value of its current value
	"REMOVE_USER": Removes user by id
	"SET_ALL_USERS": For initialization, or to set the entire users array.

### UserListContextProvider.jsx:
Adding the reducer state as an array and made wrapper functions eg: addUser, toggleUser, removeUser and made them available in the provider.

### App.jsx:
I wrapped UserList in the UserListContextProvider so it has access to the provider.

### UserList.jsx:
Makes use of users, toggleUsers, removeUser from the context provider.
Shows a simple list the actual json stringified, the user name with a strike through if disabled or just text otherwise, and enable/disable button, and remove button.
At the top I added in the add user button which opens a modal.

### AddUserModal.jsx
Simple reactstrap modal. Using formik & yup just to show some other package usage that I find useful & easy. 
Makes use of the context provider as well but just the addUser.
I also added in focus of the initial input on modal open, as well as onEnterKey press action to a create user.