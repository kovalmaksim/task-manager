# Task Manager

Простой менеджер задач на **Next.js** с поддержкой:

- Фильтров и поиска задач
- Сортировки по заголовку, статусу, приоритету и дате
- Таблицы для ПК и карточек для мобильных устройств
- Тёмной/светлой темы
- CRUD операций (создание, редактирование, удаление, отметка выполнения)

---

## Технологии

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [ShadCN/UI](https://ui.shadcn.com/) — для компонентов UI 
- [React-use](https://react-use.org/) — для хука `useMedia` 
- [Vercel](https://vercel.com/) — для деплоя 

---

## Установка и запуск

1. Клонируем репозиторий: 

git clone https://github.com/kovalmaksim/task-manager/
cd <task-manager>

2. Устанавливаем зависимости: 
   nmp install

   # или

   yarn

3. Запускаем локально: 
   npm run dev

   # или

   yarn dev

4. Открываем барузер:
   http://localhost:3000

   ## Структура проекта

   /components # UI компоненты (TaskTable, TaskForm, фильры и др.)
   /hooks # Кастомные хуки (useTasks, useTasksMutations)
   /types # Типы TypeScript
   /lib # Вспомогательные функции
