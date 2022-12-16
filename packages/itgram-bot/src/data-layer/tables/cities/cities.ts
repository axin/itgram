import {
    Column,
    declareType,
    snakeToCamelCaseConversion,
    TableDescription,
    TypedData,
    Types,
    withTypeOptions,
} from "ydb-sdk";
import data from "./cities-data.json" assert { type: "json" };

export const CITIES_TABLE = "cities";

export const citiesDescription = new TableDescription()
    .withColumn(new Column("city_id", Types.UINT64))
    .withColumn(new Column("city_name", Types.optional(Types.UTF8)))
    .withPrimaryKeys("city_id");

interface CityData {
    cityId: number;
    cityName: string;
}

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class City extends TypedData implements CityData {
    @declareType(Types.UINT64)
    public cityId!: number;

    @declareType(Types.UTF8)
    public cityName!: string;

    constructor(data: CityData) {
        super(data);
    }
}

export function getCitiesData() {
    const cities = data.map(
        ({ city_id, city_name }) =>
            new City({
                cityId: city_id,
                cityName: city_name,
            })
    );

    return City.asTypedCollection(cities);
}
