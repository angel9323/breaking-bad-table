# Start App
-npm install

-npm start

# Run tests
-npm run test

## Libraries and tools used.
-Material UI

-Redux toolkit

-Thunk

-TypeScript

-Jest y testing-library

-Axios

-i18next

### Files distribution
src: 

    -components: in this folder are the components that are or maybe in the future may be reusable by more than one component
    
    -interfaces: Typescript interfaces that are used in more than one component go here.
    
    -locales: It is where the internationalization files are.
    
    -pages: here are the components called by the different routes in the application. In this case we have one routes and there are one component folder.
    
    -redux: It is where the redux store is defined with the different Slices that are needed, in this case one.
    
    -services: This is where the api calls go. In this case only one api is called, but in case there was more than one api to call, different folders would be created for each api.
    
    - util: It is where the constants file and helpers are.

Each component of the application goes in its own folder, inside it will be the component itself, its own style file if needed, its unit test and the index where the component is exported.

If the component has to be divided into subcomponents and these are going to be its own, a 'components' folder is created in the component folder and the subcomponent inside it. For example: src > pages > characterTable > components.

The same as above with the Hooks, if it is only going to be used by the component itself, a 'hooks' folder is also created and the needed hooks inside: For example: src > pages > characterTable > hooks;

If global hooks had to be created, a 'hooks' folder would be created inside src.

### Application Detail
For the components I have used MaterialUI because it seems to me that it is a fairly complete library and can give the application a good style.

For application state management I have used Redux Toolkit since it leaves a cleaner code and has more advantages. Being a small application, it could be enough to use the React Context, but I wanted to use Redux tookit because it seems to me a more complete tool if we talk about larger applications and so you can see how it would be applied.

I have used Typescript because I think it is better for reading the application about what each component receives or returns and it is better for detecting errors and warnings.

To carry out tests, I have done several unit tests of two components with jest and testing-library, checking its components and some event.

The Hooks-based development pattern has been used, where all the logic of the component would go inside the hooks, as can be seen in CharacterTable or ActionBar components. In addition, I use different React Hooks for greater efficiency or to save a specific state.

To control the Side-Effects I have used Thunk, the configuration is in 'src/redux/store'. I'm using it in 'src/redux/characterSlice', in the 'getCharacterList' method, and this method is called from the 'useCharacterTable' hook. I use this to control the API call to get all the characters in the '/characterList' page.

In the upper right corner there will be buttons to change the language of the application.

The application consists in one route, but it is prepared in case we want to create more than one.

On the table page ('/characterTable'), the table with characters is shown. In case there is an error with the API call, the user will be shown a Toast indicating that there was an error and telling him to please reload the page. There is a searcher to search any character.

There are two buttons disabled at the beggining. The remove button only is activated when a row is selected. The add button is activated when you remove characters, because at the beggining all the characters are in the table. It will be disabled again when there are no characters to add.

While the api call is running to obtain the characters, the screen is shown with a loading icon to let the user knows that it is in process.

Clicking on a character, a card is displayed with a large picture of the character and his data. Here is where you can update the description field of the character.

As final details:

There is a confirmation modal when you try to remove a row.
The searcher works with all columns.
If you try to access with the path '/' it also redirects you to the path '/characterTable'.
The favicon and the name of the app have been changed, so  the name of Breaking Bad appears in the browser tab and the caravan as the favicon.
