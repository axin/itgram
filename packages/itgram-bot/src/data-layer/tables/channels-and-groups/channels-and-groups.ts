import {
    Column,
    declareType,
    snakeToCamelCaseConversion,
    TableDescription,
    TypedData,
    Types,
    withTypeOptions,
} from "ydb-sdk";
import data from "./channels-and-groups-data.json" assert { type: "json" };

export const CHANNELS_AND_GROUPS_TABLE = "channels_and_groups";

export const channelsAndGroupsDescription = new TableDescription()
    .withColumn(new Column("channel_or_group_id", Types.UINT64))
    .withColumn(new Column("username", Types.optional(Types.UTF8)))
    .withColumn(new Column("is_group", Types.optional(Types.BOOL)))
    .withColumn(new Column("city_id", Types.optional(Types.UINT64)))
    .withColumn(new Column("topic_id", Types.optional(Types.UINT64)))
    .withColumn(new Column("content_type_id", Types.optional(Types.UINT64)))
    .withPrimaryKey("channel_or_group_id");

interface ChannelOrGroupData {
    channelOrGroupId?: number;
    username: string;
    isGroup: boolean | undefined;
    cityId: number | undefined;
    topicId: number;
    contentTypeId: number | undefined;
}

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class ChannelOrGroup extends TypedData implements ChannelOrGroupData {
    @declareType(Types.UINT64)
    public channelOrGroupId?: number;

    @declareType(Types.UTF8)
    public username!: string;

    @declareType(Types.BOOL)
    public isGroup: boolean | undefined;

    @declareType(Types.UINT64)
    public cityId: number | undefined;

    @declareType(Types.UINT64)
    public topicId!: number;

    @declareType(Types.UINT64)
    public contentTypeId: number | undefined;

    constructor(data: ChannelOrGroupData) {
        super(data);
    }
}

export function getChannelsAndGroupsData() {
    const channelsAndGroups = data.map(
        ({ username, is_group, city_id, topic_id, content_type_id }) =>
            new ChannelOrGroup({
                username,
                isGroup: is_group,
                cityId: city_id,
                topicId: topic_id,
                contentTypeId: content_type_id,
            })
    );

    return ChannelOrGroup.asTypedCollection(channelsAndGroups);
}
