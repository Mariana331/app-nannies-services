# Nanny.Services 👶🧡

**Nanny.Services** — це веб-застосунок для пошуку нянь, з можливістю перегляду профілів, додавання в обране та створення зустрічей. Проєкт реалізовано на React + TypeScript, із Firebase авторизацією та React Query для роботи з даними.

---

## ✨ Функціонал

- 🔍 Перегляд нянь з бази даних
- 🏷 Фільтрація та сортування (за містом, рейтингом, ціною тощо)
- ⭐ Додавання в **Favorites**
- 🔐 Реєстрація та логін (Firebase Auth)
- 💬 Заявка на зустріч (модальне вікно)
- 📱 Повністю адаптивна верстка (Desktop + Mobile)
- 📁 Стан збережeno через LocalStorage (Favorites)
- 🚀 Справжній бекенд (Firebase Realtime DB)
- 🎯 UX з кастомним Mobile меню та Modal системою

---

## 🧩 Технології

Використано:

| Технологія               | Для чого                   |
| ------------------------ | -------------------------- |
| **React + TS**           | UI та типобезпечність      |
| **React Router**         | Маршрутизація              |
| **React Query**          | Кешування та data fetching |
| **Firebase Auth**        | Логін та реєстрація        |
| **Firebase Realtime DB** | Дані нянь                  |
| **Context API**          | Модалки + глобальний стан  |
| **LocalStorage**         | Збереження Favorites       |
| **CSS Modules**          | Стилі із scoped областю    |
| **Axios**                | HTTP запити                |

---

## 📂 Структура проекту

```txt
src/
 ├── components/
 │   ├── Header/
 │   ├──Hero/
 │   ├── Modal/
 │   ├── Login/
 │   ├── Registration/
 │   ├── Appointment/
 │   ├── NanniesList/
 │   ├── NannyCard/
 │   ├──ErrorMessage
 │   ├──ModalContext
 │   ├──CustomSelect
 │   └── ...
 ├── pages/
 │   ├── Home/
 │   ├── Nannies/
 │   └── Favorites/
 ├── services/
 │   ├── nannies.ts
 │   └── users.ts
 │
 ├── types/
 ├── assets/
 ├── constants/
 └── main.tsx

🚀 Запуск проекту локально
git clone https://github.com/Mariana331/nanny-services.git
cd nanny-services
npm install
npm run dev

Проєкт стартує на:
http://localhost:5173

👤 Авторизація
Доступні дії:

Registration

Login

Logout

Збереження стану юзера

Відображення імені в Header

⭐ Favorites
Favorites зберігаються в localStorage.

🖥 Деплой
Проєкт можна задеплоїти на:

Vercel

Netlify

Firebase Hosting

```
