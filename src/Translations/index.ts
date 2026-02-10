import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { 
            login: 'Login',
      password: 'Password',
      projects: "Projects", 
      cases: "Test Cases",
       keepSession: 'Keep Session',
             signIn: "Sign In",
      signUp: "Sign Up",
      logOut: "Logout",
      create: "Create"
       } },
    ru: { translation: { 
      login: 'Логин',
      password: 'Пароль',
      projects: "Проекты", 
      cases: "Тест-кейсы", 
      keepSession: 'Оставаться в сети',
      signIn: "Войти",
      signUp: "Зарегистрироваться",
      logOut: "Выйти",
      create: "Создать"
    } }
  },
  lng: "ru",
  fallbackLng: "en"
});

export default i18n;
