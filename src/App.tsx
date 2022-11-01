import { useState } from 'react';

import { Header, List, SearchBar } from './components';
import { Task } from './types';

import './global.css';

export function App() {
  const [listItems, setListItems] = useState<Task[]>([]);

  function onDeleteListItems(item: Task) {
    const newList = listItems.filter((listItem) => listItem !== item);

    setListItems(newList);
  }

  function handleAddListItem(item: string) {
    setListItems([...listItems, { task: item, done: false }]);
  }

  return (
    <div>
      <Header />
      <SearchBar handleAddListItem={handleAddListItem} />
      <main>
        <List
          listItems={listItems}
          onDeleteListItems={onDeleteListItems}
          updateList={setListItems}
        />
      </main>
    </div>
  );
}
