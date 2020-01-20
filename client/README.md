
## Time
I did not finish the app to the point that I would have wanted to but I did decide to stick to the 6 hour limit to make the judment fair.

## Setup
I have never used parcel before so I really wanted to use the setup that was given. This did slow me down somewhat, but I am always willing to try new things and to work with what is already in place if possible.

There were quite a few things missing from the setup to make it all work properly with Typescript, css-modules and Jest but it was fun to learn.
I was going to do it without Typescript at first but then I saw the node server was in typescript, and seeing as I personally enjoy typescript. It was a no brainer.

## App
To not overcomplicate the code I decided to just use a single component and no state management as it is not necessary for this exercise.

Sticking to the "Use the latest tech" requirement in the exercise, I went for functional components, hooks and css-modules. I also used css grid for the app.

Having worked with Angular for the past few years, I knew that observables and Rxjs would help a lot in this requirement as observables can be cancelled and paused...etc.
This is also why I used the observable version of 'Axios'.

I have never actually used Observables in quite this way before. All of my previous projects required very simple subscribe and unsubscribe functionality and some light mapping. Although it slowed me down I was determined to make it work. I think it make for some neat compact code.

## Testing
Testing is really not my strength. Only one of the projects I worked on had unit testing.
I did all the setup using Jest and enzyme, but ran out of time to get them to work exactly as I wanted. I added todos of what I had in mind.