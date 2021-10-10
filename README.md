# TDD-playground
Personal playground for explaining how I understand the writing of unit (and maybe even more) tests. Mainly using Jest and React Testing Library 🚀.

## Motivation
Motivation behind this mini project is that I often do not know **HOW** to test things in the code which I write. Do not get me wrong, I can write the test suites and case from syntax point of view and I can also get around things like coverage percentage. The main point is that more often than not I am not sure if I am testing the right things or if I am testing those things correctly. The goal of this is to have a quick notebook in my hand where can I have a look to reming myself if I am doing the right thing.

This "notebook" is written for React but ultimately all of principles and stuff should be applicable in different languages and different contexts.

## Structure
~~This little experiment will be using new Yarn version so I (and maybe others in the future) can leverage the PnP system that it offers. Repository will be divided into multiple packages and each will be generated using [ViteJS](https://vitejs.dev/). The testing itself will be done using Jest and Testing Library.~~

The original idea was to use PnP system of Yarn Berry version I could not set up testing-library and Jest together with Typescript. After some investigation and multiple trials I decided to fall back to the classic [CRA](https://create-react-app.dev/). After I finish all the cases I plan to debug the problems with Yarn Berry version more.

Each package will focus on comperehensive area or context which I encountered during my development time. Each area or context will have separate README.md file where I will try to explain (to myself) how I am testing stuff and why I am doing it in such way. 

For now those are gonna be:

- [ ] Basic React components
- [ ] "Business" logic
- [ ] API client instance (Axios, Fetch)
- [ ] Component visuals and changes based on some logic

Later I am thinking about following:

- [ ] Redux (actions, reducers, middlewares)
- [ ] Cypress E2E tests
- [ ] Cypress visual diff


