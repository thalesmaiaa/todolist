import { useState } from 'react';

import { ClipboardText, Trash } from 'phosphor-react';

import { Task } from '../../types';
import { v4 as uuid } from 'uuid';

import styles from './List.module.css';

type Props = {
  listItems: Task[];
  onDeleteListItems: (item: Task) => void;
  updateList: React.Dispatch<React.SetStateAction<Task[]>>;
};

type CheckboxProps = {
  task: Task;
  listItems: Task[];
  done: boolean;
  handleChangeDone: React.Dispatch<React.SetStateAction<Task[]>>;
  handleDoneTasks: React.Dispatch<React.SetStateAction<number>>;
};

export function List({ listItems, onDeleteListItems, updateList }: Props) {
  const [doneTasks, setDoneTasks] = useState<number>(0);

  const isListEmpty = listItems?.length === 0;

  const numberOfTasks = listItems.length;

  const hasDoneTasks = doneTasks > 0;

  function handleDeleteItem(item: Task) {
    onDeleteListItems(item);
    setDoneTasks(0);
  }

  return (
    <div className={styles.listContainer}>
      <header className={styles.headers}>
        <span className={styles.createdTasks}>
          Tarefas Criadas{' '}
          <span className={styles.counter}>{numberOfTasks}</span>
        </span>
        <span className={styles.doneTasks}>
          Concluídas{' '}
          <span className={styles.counter}>
            {hasDoneTasks && <>{doneTasks} de</>} {numberOfTasks}
          </span>
        </span>
      </header>
      <div className={styles.list}>
        {isListEmpty ? (
          <div className={styles.emptyList}>
            <div className={styles.emptyListContent}>
              <ClipboardText size={56} color="#333333" />
              <div className={styles.emptyListText}>
                <p className={styles.emptyFirstLine}>
                  Você ainda não tem tarefas cadastradas
                </p>
                <p className={styles.emptySecondLine}>
                  Crie tarefas e organize seus itens a fazer
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {listItems.map((item) => (
              <div className={styles.listContent} key={uuid()}>
                <Checkbox
                  task={item}
                  listItems={listItems}
                  done={item.done}
                  handleChangeDone={updateList}
                  handleDoneTasks={setDoneTasks}
                />
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteItem(item)}
                >
                  <Trash size={24} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function Checkbox({
  listItems,
  task,
  done,
  handleChangeDone,
  handleDoneTasks,
}: CheckboxProps) {
  function handleChageChecked(item: Task) {
    const newList = listItems.map((listItem) => {
      return listItem === item
        ? { done: !listItem.done, task: listItem.task }
        : listItem;
    });

    const doneTasks = newList.filter(
      (listItem) => listItem.done === true
    ).length;
    handleDoneTasks(doneTasks);
    handleChangeDone(newList);
  }

  return (
    <label className={styles.itemLeftSide}>
      <input
        className={styles.radioButton}
        type="checkbox"
        checked={done}
        onChange={() => handleChageChecked(task)}
      />
      <span className={styles.taskDescription}>{task.task}</span>
    </label>
  );
}
