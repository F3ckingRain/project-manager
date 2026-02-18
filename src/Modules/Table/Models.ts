import type { ETestCaseStatus } from "./Enums";

/** Интерфейс данных проекта. */
export interface IProject {
    /** Идентификатор проекта. */
    id: string;
    /** Название проекта. */
    name: string;
    /** Заказчик. */
    client: string;
    /** Список исполнителей. */
    executors: string[];
    /** Документация проекта. */
    documents: string;
    /** Описание проекта. */
    description: string;
}

/** Интерфейс данных тест-кейса. */
export interface ITestCase {
    /** Идентификатор тест-кейса. */
    id: string;
    /** Идентификатор проекта. */
    projectId: string;
    /** Заголовок. */
    title: string;
    /** Описание тест-кейса. */
    description: string;
    /** Статус. */
    status: ETestCaseStatus;
    /** Шаги. */
    steps: string[];
    /** Ожидания. */
    expected: string;
    /** Преусловие. */
    preCondition: string;
    /** Постусловие. */
    postCondition: string;
    /** Комментарий. */
    comment: string;
    /** Вложения. */
    attachments: string[];
    /** Фактический результат. */
    result: string;
    /** Флаг авто-теста. */
    isAuto?: boolean;
}

/** Интерфейс прогона. */
export interface ITestRun {
    /** Идентификатор прогона. */
    id: string
    /** Список тест-кейсов. */
    testCases: ITestCase[];
    /** Отчёт. */
    report?: string;
}