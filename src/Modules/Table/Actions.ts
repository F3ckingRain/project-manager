import { createAction } from "@reduxjs/toolkit";
import { TABLE_MODULE_NAMESPACE } from "./Consts";

/** Экшен сброса данных модуля таблиц. */
export const resetTableAction = createAction(`${TABLE_MODULE_NAMESPACE}__reset`)