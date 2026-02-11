import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources: {
    en: { translation: { 
      login: 'Login',
      password: 'Password',
      projects: "Projects", 
      cases: "Test Cases",
      keepSession: 'Remember me',
      signIn: "Sign In",
      signUp: "Sign Up",
      logOut: "Logout",
      create: "Create",
      undo: "Undo",
      noAccount: "Have no account?",
      projectTitle: "Test Management System",
      forgotPassword: "Forgot password?"
       } },
    ru: { translation: { 
      login: 'Логин или Эл. почта',
      password: 'Пароль',
      projects: "Проекты", 
      cases: "Тест-кейсы", 
      keepSession: 'Запомнить меня',
      signIn: "Войти",
      signUp: "Зарегистрироваться",
      logOut: "Выйти",
      create: "Создать",
      undo: "Назад",
      noAccount: "Нет аккаунта?",
      projectTitle: "Система учёта тест-кейсов",
      forgotPassword: "Забыли пароль?"
    } }
  },
  lng: "ru",
  fallbackLng: "en",
});

export default i18n;
