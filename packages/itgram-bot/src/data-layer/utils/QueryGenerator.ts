import {
    getNameConverter,
    snakeToCamelCaseConversion,
    StringFunction,
    TypedData,
    Ydb,
} from "ydb-sdk";
import { typeToString } from "./type-to-string.js";

export class QueryGenerator {
    private converter: StringFunction;

    constructor(
        private tableName: string,
        private rowType: ReturnType<TypedData["getRowType"]>,
        private calculatedColumns: Record<string, string> = {}
    ) {
        this.converter = getNameConverter(
            {
                namesConversion: snakeToCamelCaseConversion,
            },
            "ydbToJs"
        );
    }

    get dataParam() {
        return `$${this.converter(this.tableName)}Data`;
    }

    get declareTableTypeQuery() {
        const query = `
DECLARE ${this.dataParam} AS List<Struct<
    ${this.getColomnList((name, type) => `${name}: ${typeToString(type)}`)}>>;
`;

        return query;
    }

    get replaceQuery() {
        const query = `
REPLACE INTO ${this.tableName}
SELECT
    ${this.getColomnList((name) =>
        this.calculatedColumns[name]
            ? `${this.calculatedColumns[name]} as ${name}`
            : name
    )}
FROM AS_TABLE(${this.dataParam});
`;
        return query;
    }

    private getColomnList(
        this: QueryGenerator,
        getListItem: (name: string, type: Ydb.IType) => string
    ) {
        const { members } = this.rowType.structType;
        const columns = members
            .map(({ name, type }) => getListItem(name, type))
            .join(",\n");

        return columns;
    }
}
