import type { TypedData, Ydb } from "ydb-sdk";

export function getRowType(typedCollection: Ydb.ITypedValue) {
    const rowType = typedCollection.type?.listType?.item as ReturnType<
        TypedData["getRowType"]
    >;

    return rowType;
}
