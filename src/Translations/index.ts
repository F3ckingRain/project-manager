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
        Labels: {
          noData: "No data",
          Actions: "Actions"
        },
        Actions: {
          resetFilters: "Reset filters",
        },
        Cases: {
          title: "Repository",
          Config: {
            title: "Test-Case",
            description: "Description",
            preCondition: "Pre-Condition",
            projectId: "Project Number",
            steps: "Step №{{count}}",
            expected: "Expected",
            result: "Result",
            postCondition: "Post-Condition",
            comment: "Comment",
            attachments: "Attachments",
            status: "Status",
            isAuto: "Auto?"
          },
          Form: {
            title: "Test-Case {{context}}"
          }
        },
        Projects: {
          title: "Projects",
          Config: {
            name: "Project Name",
            description: "Description",
            client: "Client",
            executors: "Executors",
            documents: "Documents"
          },
          Form: {
            title: "Project {{context}}"
          }
        },
        TestRuns: {
          title: "Test Runs",
          Config: {
            testCases: "Test Cases",
            report: "Report"
          },
          Form: {
            title: "Test Run {{context}}"
          }
        }
      },
      Form: {
        Actions: {
          submit: "Submit",
          cancel: "Cancel"
        }
      }
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
        Labels: {
          noData: "Нет данных",
          Actions: "Действия"
        },
        Actions: {
          resetFilters: "Сбросить фильтры",
        },
        Cases: {
          title: "Репозиторий",
          Config: {
            title: "Тест-кейс",
            description: "Описание",
            projectId: "Номер проекта",
            preCondition: "Преусловие",
            steps: "Шаг №{{count}}",
            expected: "Ожидаемый результат",
            result: "Фактический результат",
            postCondition: "Постусловие",
            comment: "Комментарий",
            attachments: "Вложения",
            status: "Статус",
            isAuto: "Авто-тест?"
          },
          Form: {
            title: "Тест-кейс {{context}}"
          }
        },
        Projects: {
          title: "Проекты",
          Config: {
            name: "Название проекта",
            description: "Описание проекта",
            client: "Заказчик",
            executors: "Список исполнителей",
            documents: "Документация проекта"
          },
          Form: {
            title: "Проект {{context}}"
          }
        },
        TestRuns: {
          title: "Прогоны",
          Config: {
            testCases: "Тест-кейсы",
            report: "Отчёт"
          },
          Form: {
            title: "Прогон {{context}}"
          }
        }
      },
      Form: {
        Actions: {
          submit: "Отправить",
          cancel: "Отмена"
        }
      }
    } }
  },
  lng: "ru",
  fallbackLng: "en",
});

export default i18n;
