import { DispatchEventTypeName } from "discord-models/event";
export default abstract class Event<T> {
    abstract eventName: DispatchEventTypeName;
    abstract process(data: T, shardId: number): Promise<void>;
}
