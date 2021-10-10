# Basic React components testing

This package is about the usual case when developing React Application. In most cases (although some are more and some are less complex) we create some kind of React component, we provide some internal logic and we apply some styles. The situation which fits well to the general approach for me is this: 

_An user comes to page which I am developing and he wants to see a button. The user clicks this button and he is expecting that all of his problems will be solved._

Now of course, this a little bit of over-exaggerated but we can find the paralels with testing. If we take it one by one we start with: "An user comes to page which I am developing and he wants to see a button". The user needs to see this magical button in order to click it, right? 

Now for me it would be nice if I'd have tests which tell me exactly the same. This means that I am working on Page/Component and when I run the tests they will tell me: "Yeah Michal, you are good to go, the button is there". Then we can continue with: "The user clicks this button". 

Similar situation as before, I want to know that the button is clickable. If it is clickable the button should be recognized as well ... clickable. So now what I expect from my tests is this: "Yeah the button is rendered and user can actually click it." or "Well there is some problem and the button is not clickable, but no worries, the apprioriate styles are telling the user that he cannot click the button". This allready sounds little bit problematic, because styles testing is not really easy or effective but let's see what we can do with that. For the last part: "[The user] is expecting that all of his problems will be solved.".

This means that whatever I am doing in the background is correct and that it is actually solving the problem it should solve and not the other way around. Tests for this case should tell me: "User entered these information and he wants to have appriorate output and you can be sure that our functions gave him that output". Let's say in some time I decide to rewrite the logic using some other library/data structure. I expect those tests to tell me: "Yeah the output is still the same, you are fine."

I will try to cover all the cases which I just mentioned and apply the testing as I mentioned in each step.
## Situation cases

Now to grasp the idea a little bit better we will be using TODO app as an example for our testing approach. There will be multiple use cases and in each use case I will explain what I am testing and why I am testing it like I am.

### First case: Show TODO list and make sure it is there.

I would even call this case: Zero case. In order to work with anything we need to be able to access it. In our case it means that the list of TODOs is visible on page. Let's have following component structure:

```jsx
<App>
    <Header />
    <main>
        <List items={items} title="List of my TODOs" />
    </main>
    <Footer />
</App>
```

So this one should be fairly simple, right? I render whole `<App />` since it contains my `<List />` and I just check it by title:

```jsx
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders list component in App", () => {
  render(<App />);

  const listComponent = screen.getByText(/list of my todos/i);
  expect(listComponent).toBeInTheDocument();
});

```

Simple yeah but some things are off. What are we really testing? Well we test if the whole application renders. Now there is nothing wrong in this kind of test. In order to see the TODO list we want to know that our application is rendered and everything is okay. This is fine in smaller pages, where everything is rendered just on 1 page. 

But when we build larger applications we might soon encounter situation where the application contains multiple providers, wrappers and some stuff. Our TODO list might not be even visible or to be rendered on first `<App />` render. It might be on other page, it might be conditionally rendered. We have no coverage for this. So let's test directly the TODO list component. Let's create `List.spec.tsx` in our `tests` folder and throw in some basic tests:

###### Test 1
```jsx
test("renders list component", () => {
  render(<List />);

  const title = screen.getByText(/default list title/i);
  expect(title).toBeInTheDocument();
});
```

Well nice try, but we are missing `items` prop for list. Hmm so let's just put empty array so we can continue:

###### Test 2
```jsx
test("renders list component", () => {
  render(<List items={[]} />);

  const title = screen.getByText(/default list title/i);
  expect(title).toBeInTheDocument();
});
```

The test is passing. We know that if we do not provide any other title our List component will use default one. Test is passing. How about situation if we want to use custom title for our List? Well no problem, let's just test if user can see it:

###### Test 3
```jsx
test("renders list component with custom title", () => {
  render(<List items={[]} title="List of my TODOs" />);

  const title = screen.getByText(/list of my todos/i);
  expect(title).toBeInTheDocument();
});
```

Neat. Looks like our List is nicely tested and we can be sure that user can review his TODOs. Or can we? Let's imagine that if there are no items in TODOs list, the component will actually render message that the list is empty:

###### Test 4
```jsx
export const List: FC<ListProps> = ({
  items,
  title = "Default list title",
}) => {
  if (items.length === 0) {
    return (
      <div id="list">
        <h3>{title}</h3>
        <div>The list is empty</div>
      </div>
    );
  }

  // ...
}
```

This brings us into trap. Our tests are passing but we do not know if user sees any TODOs in his list or just an empty list. Let's add one more case which will test if the list is empty:

###### Test 5
```jsx
  test("renders empty list component", () => {
    render(<List items={[]} />);

    const emptyMessage = screen.getByText(/the list is empty/i);
    expect(emptyMessage).toBeInTheDocument();
  });
```

We had very similar case before, we were checking the [default title](#test-1). But we want user to see both of those so why not combine it? Let's do it:

###### Test 6
```jsx
  test("renders empty list component", () => {
    render(<List items={[]} />);

    const title = screen.getByText(/default list title/i);
    expect(title).toBeInTheDocument();
    const emptyMessage = screen.getByText(/the list is empty/i);
    expect(emptyMessage).toBeInTheDocument();
  });
```

We can see that the default title and even the message are rendered on the screen. But if we have a look on the tests we can see that we have 3 very similar tests. Now there might be question if we want to keep all 3 tests. Depends. From the implementation of our List component we can tell that the empty list message and title are always rendered (no conditional rendering) so we can test them both and just pay attention to the combinations. 

We can also keep the separate tests as the title and items are not affecting each other. That means that if we have custom title we need to test if custom title is displayed. Number of items doesn't really "bother us" as the custom title should always be there. In this case I would go with smaller tests testing just 1 thing. 

Now then we have tested our List for various titles and empty list scenarios. But from user perspective we want to know if there are TODOs displayed. First we need to create some mock TODOs.
