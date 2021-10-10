import React from "react";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { List } from "./components/List";

import { TListItem } from "./types/TListItem";

import items from "./data/listItems.json";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main>
        <List items={items as TListItem[]} title="List of my TODOs" />
      </main>
      <Footer />
    </div>
  );
}

export default App;
