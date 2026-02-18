import { ETestCaseStatus } from "Modules/Table/Enums"

/** 
 * Функция получения имени класса для статуса.
 * 
 * @param status Статус.
 */
export function getStatusClassName (status: ETestCaseStatus): string {
  if (status === ETestCaseStatus.DONE) {
    return 'bg-green-100 text-green-700' 
  }

  if (status === ETestCaseStatus.IN_PROGRESS) {
    return 'text-gray-700'
  }

  return 'bg-amber-100 text-amber-700'
}