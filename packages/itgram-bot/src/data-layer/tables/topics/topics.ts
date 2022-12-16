import {
    Column,
    declareType,
    snakeToCamelCaseConversion,
    TableDescription,
    TypedData,
    Types,
    withTypeOptions,
} from "ydb-sdk";
import data from "./topics-data.json" assert { type: "json" };

export const TOPICS_TABLE = "topics";

export const topicsDescription = new TableDescription()
    .withColumn(new Column("topic_id", Types.UINT64))
    .withColumn(new Column("topic", Types.optional(Types.UTF8)))
    .withPrimaryKeys("topic_id");

interface TopicData {
    topicId: number;
    topic: string;
}

@withTypeOptions({ namesConversion: snakeToCamelCaseConversion })
export class Topic extends TypedData implements TopicData {
    @declareType(Types.UINT64)
    public topicId!: number;

    @declareType(Types.UTF8)
    public topic!: string;

    constructor(data: TopicData) {
        super(data);
    }
}

export function getTopicsData() {
    const topics = data.map(
        ({ topic_id, topic }) =>
            new Topic({
                topicId: topic_id,
                topic,
            })
    );

    return Topic.asTypedCollection(topics);
}
