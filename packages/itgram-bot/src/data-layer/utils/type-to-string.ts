import { Ydb } from "ydb-sdk";

const typeIdToString = {
    [Ydb.Type.PrimitiveTypeId.PRIMITIVE_TYPE_ID_UNSPECIFIED]:
        "PRIMITIVE_TYPE_ID_UNSPECIFIED",
    [Ydb.Type.PrimitiveTypeId.BOOL]: "BOOL",
    [Ydb.Type.PrimitiveTypeId.INT8]: "INT8",
    [Ydb.Type.PrimitiveTypeId.UINT8]: "UINT8",
    [Ydb.Type.PrimitiveTypeId.INT16]: "INT16",
    [Ydb.Type.PrimitiveTypeId.UINT16]: "UINT16",
    [Ydb.Type.PrimitiveTypeId.INT32]: "INT32",
    [Ydb.Type.PrimitiveTypeId.UINT32]: "UINT32",
    [Ydb.Type.PrimitiveTypeId.INT64]: "INT64",
    [Ydb.Type.PrimitiveTypeId.UINT64]: "UINT64",
    [Ydb.Type.PrimitiveTypeId.FLOAT]: "FLOAT",
    [Ydb.Type.PrimitiveTypeId.DOUBLE]: "DOUBLE",
    [Ydb.Type.PrimitiveTypeId.DATE]: "DATE",
    [Ydb.Type.PrimitiveTypeId.DATETIME]: "DATETIME",
    [Ydb.Type.PrimitiveTypeId.TIMESTAMP]: "TIMESTAMP",
    [Ydb.Type.PrimitiveTypeId.INTERVAL]: "INTERVAL",
    [Ydb.Type.PrimitiveTypeId.TZ_DATE]: "TZ_DATE",
    [Ydb.Type.PrimitiveTypeId.TZ_DATETIME]: "TZ_DATETIME",
    [Ydb.Type.PrimitiveTypeId.TZ_TIMESTAMP]: "TZ_TIMESTAMP",
    [Ydb.Type.PrimitiveTypeId.STRING]: "STRING",
    [Ydb.Type.PrimitiveTypeId.UTF8]: "UTF8",
    [Ydb.Type.PrimitiveTypeId.YSON]: "YSON",
    [Ydb.Type.PrimitiveTypeId.JSON]: "JSON",
    [Ydb.Type.PrimitiveTypeId.UUID]: "UUID",
    [Ydb.Type.PrimitiveTypeId.JSON_DOCUMENT]: "JSON_DOCUMENT",
    [Ydb.Type.PrimitiveTypeId.DYNUMBER]: "DYNUMBER",
};

export function typeToString(type: Ydb.IType) {
    const typeId =
        type?.typeId ?? Ydb.Type.PrimitiveTypeId.PRIMITIVE_TYPE_ID_UNSPECIFIED;

    return typeIdToString[typeId];
}
