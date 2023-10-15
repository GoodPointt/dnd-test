import { Title, Text, Box } from '@mantine/core';
import classes from './Welcome.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useEffect, useState } from 'react';
const tasks2 = [
  {
    _id: '64d825a42801c1bed5142c71',
    title: '0Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'to-do',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c72',
    title: '1Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'in progress',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c73',
    title: '2Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'to-do',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c74',
    title: '3Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'done',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c75',
    title: '4Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'to-do',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c76',
    title: '5Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'to-do',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c77',
    title: '6Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'to-do',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
  {
    _id: '64d825a42801c1bed5142c78',
    title: '7Learn React',
    start: '09:00',
    end: '09:30',
    priority: 'low',
    date: '2023-12-31',
    category: 'in progress',
    owner: '649ab7f56f47f612c3a161765',
    createdAt: '2023-10-14T09:26:01.547Z',
    updatedAt: '2023-10-14T09:26:01.547Z',
  },
];

export function Welcome() {
  const [tasks, setTasks] = useState(tasks2);
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [tasksInProgress, setTasksInProgress] = useState([]);

  useEffect(() => {
    const ftasksToDo = tasks.filter((task) => task.category === 'to-do');
    const ftasksDone = tasks.filter((task) => task.category === 'done');
    const ftasksInProgress = tasks.filter((task) => task.category === 'in progress');

    setTasksToDo(ftasksToDo);
    setTasksDone(ftasksDone);
    setTasksInProgress(ftasksInProgress);
  }, [tasks]);

  const categories = ['to-do', 'done', 'in progress'];

  return (
    <>
      <Box display={'flex'} className={classes.wrap}>
        {categories.map((category, index) => (
          <Section
            key={index}
            category={category}
            tasks={tasks}
            setTasks={setTasks}
            tasksToDo={tasksToDo}
            tasksDone={tasksDone}
            tasksInProgress={tasksInProgress}
          />
        ))}
      </Box>
    </>
  );
}

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: {
      id: task._id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Box ref={drag} className={[classes.task, isDragging ? classes.draggedTask : null]}>
      <Text>{task.title}</Text>
      <Text>{task.priority}</Text>
      <Text>{task.category}</Text>
    </Box>
  );
};

const Section = ({ tasks, category, setTasks, tasksToDo, tasksDone, tasksInProgress }) => {
  let tasksToMap = tasks;
  if (category === 'to-do') {
    tasksToMap = tasksToDo;
  }
  if (category === 'done') {
    tasksToMap = tasksDone;
  }
  if (category === 'in progress') {
    tasksToMap = tasksInProgress;
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((task) => {
        if (task._id === id) {
          return { ...task, category: category };
        }
        return task;
      });
      return modifiedTasks;
    });
  };

  return (
    <Box ref={drop} className={[classes.box, isOver ? classes.boxDrop : null]}>
      <Title ta="center">{category}</Title>
      {tasksToMap.length > 0 && (
        <ul>
          {tasksToMap.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      )}
    </Box>
  );
};
