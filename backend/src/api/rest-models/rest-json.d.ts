type JStypes = null | string | number | boolean | Date

export type RestJSON = JStypes | JStypes[] | {
    [property: string]: RestJSON[] | RestJSON
}