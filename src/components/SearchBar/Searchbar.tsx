import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, useState } from 'react';

import styles from './SearchBar.module.css';

type Props = {
  handleAddListItem: (item: string) => void;
};

export function SearchBar({ handleAddListItem }: Props) {
  const [inputValue, setInputValue] = useState<string>('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setInputValue(value);
  }

  function handleCreateItem() {
    handleAddListItem(inputValue);
    setInputValue('');
  }

  const buttonEnabled = inputValue.length === 0;

  return (
    <div className={styles.searchContent}>
      <input
        className={styles.searchInput}
        placeholder="Adicione uma nova tarefa"
        value={inputValue}
        onChange={handleChange}
      />
      <button
        className={styles.searchButton}
        onClick={handleCreateItem}
        disabled={buttonEnabled}
      >
        Criar <PlusCircle size={16} />
      </button>
    </div>
  );
}
