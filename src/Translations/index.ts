import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { EFormType } from 'Modules/Auth/Form/Enums';
import { initReactI18next } from 'react-i18next';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
  resources: {
    en: { translation: { 
      Global: {
        projectTitle: "Test Management System",
      },
      Auth: {
          Actions: {
            General: {
              [EFormType.SIGN_IN]: "Sign In",
              [EFormType.SIGN_UP]: "Create",
              [EFormType.RESTORE_PASSWORD]: "Restore",
            },
            Secondary: {
              [EFormType.SIGN_IN]: "Sign Up",
              [EFormType.SIGN_UP]: "Undo",
              [EFormType.RESTORE_PASSWORD]: "Undo"
            }
          },
          Labels: {
            login: "Login or Email",
            password: "Password",
            keepSession: "Remember me",
            noAccount: "Have no account?",
            forgotPassword: "Forgot password?",
          }
      },
      Table: {
        Cases: {
          title: "Test Cases"
        },
        Projects: {
          title: "Projects"
        }
      },
       } },
    ru: { translation: { 
      Global: {
        projectTitle: "Система учёта тест-кейсов",
      },
      Auth: {
          Actions: {
            General: {
              [EFormType.SIGN_IN]: "Войти",
              [EFormType.SIGN_UP]: "Создать",
              [EFormType.RESTORE_PASSWORD]: "Восстановить",
            },
            Secondary: {
              [EFormType.SIGN_IN]: "Зарегистрироваться",
              [EFormType.SIGN_UP]: "Назад",
              [EFormType.RESTORE_PASSWORD]: "Назад"
            }
          },
          Labels: {
            login: "Логин или Эл. почта",
            password: "Пароль",
            keepSession: "Запомнить меня",
            noAccount: "Нет аккаунта?",
            forgotPassword: "Забыли пароль?",
          }
      },
      Table: {
        Cases: {
          title: "Тест-кейсы"
        },
        Projects: {
          title: "Проекты"
        }
      },
    } }
  },
  lng: "ru",
  fallbackLng: "en",
});

export default i18n;
