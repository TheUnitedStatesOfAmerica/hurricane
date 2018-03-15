import { DispatchEventTypeName } from "discord-models/event";

export default abstract class Event<T> {
    public abstract eventName: DispatchEventTypeName;

    public abstract process(data: T, shardId: number): Promise<void>;
}
