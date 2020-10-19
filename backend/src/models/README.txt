Tutaj znajdują się pliki z modelami, na każdy plik przypada tylko jeden model o takiej samej nazwie. Schemat budowy pliku:

---------------------------------------------
import db from '../static/database'
import * as SQL from 'sequelize'

class [NAZWA MODELU] extends SQL.Model {
    public [NAZWA ATRYBUTU]: [TYP TS]

    public readonly createdAt: Date //pola obowiązkowe
    public readonly updatedAt: Date //pola obowiązkowe
}

[NAZWA MODELU].init({
    [NAZWA ATRYUTU]: {
	[DEFINICJA ATRYBUTU]
    }
}, {
    sequelize: db,
    tableName: '[NAZWA MODELU]'
})

export default [NAZWA MODELU]