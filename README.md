Assignment 3 - Persistence: Two-tier Web Application with Flat File Database, Express server, and CSS template
===



##  Card Guessing Game

your glitch link e.g. http://a3-charlieroberts.glitch.me

For this assignment, I developed a card guessing game.  After logging in, the user is prompted to make a guess regarding the state of the turned over card. Once the user has guessed if the card is black or red, the user can click the card to turn it over.   If the guess is incorrect, the page will automatically allow the user to guess on a new random card. If the guess is correct, another card will appear below the first, and the user can continue. An incorrect guess at any stage brings the user back to the first card.

On the side navigation bar, there are a new options. The first option is to allow the user to input an avatar or image to represent themselves. The "Choose File" button opens the local file explorer where the user can select an image. 

Below that is where the user can bet on their guess. The field requires a number value, and increments or decrements the user's total balance (printed above) after guessing on a card. 

Finally in the side navigation bar, is a log of all the user's previous moves.  This log can be cleared, also clearing the database, by clicking the "Clear Performance History" button.

For a database, I selected LowDB, becuase of the ability to add and remove posts with ease.

For my 5 middlewares, I used:
	- Body-Parser
	- Passport
	- Multer
	- Crypto
	- Morgan 
Body-Parser was used to parse the body of the HTTP post requests.

Passport was used for the authentication process, although I did was unable to get full functionality, the attempt at using Passport does not cause any errors.

Multer was used to store the Avatar photos. It's primary use is to handle multipart/form data. Again, I was not able to fully implement this, as I kept getting an Error 500, that I was unable to resolve.

Crypto was used to generate a random name for the files stored by Multer. Although the entire avatar interface does not work. This middleware application does execute properly on its own.

Morgan was used as a development only middleware, which logged the post requests and responses, to aid with debugging.

