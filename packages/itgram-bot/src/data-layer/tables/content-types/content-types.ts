import {
    Column,
    declareType,
    snakeToCamelCaseConversion,
    TableDescription,
    TypedData,
    Types,
    withTypeOptions,
} from "ydb-sdk";
import data from "./content-types-data.json" assert { type: "json" };

export const CONTENT_TYPES_TABLE = "content_types";

export const contentTypesDescription = new TableDescription()
    .withColumn(new Column("content_type_id", Types.UINT64))
    .withColumn(new Column("content_type", Types.optional(Types.UTF8)))
    .withPrimaryKeys("content_type_id");

interface ContentTypeData {
    contentTypeId: number;
    contentType: string;
}

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class ContentType extends TypedData implements ContentTypeData {
    @declareType(Types.UINT64)
    public contentTypeId!: number;

    @declareType(Types.UTF8)
    public contentType!: string;

    constructor(data: ContentTypeData) {
        super(data);
    }
}

export function contentTypesData() {
    const contentTypes = data.map(
        ({ content_type_id, content_type }) =>
            new ContentType({
                contentTypeId: content_type_id,
                contentType: content_type,
            })
    );

    return ContentType.asTypedCollection(contentTypes);
}
