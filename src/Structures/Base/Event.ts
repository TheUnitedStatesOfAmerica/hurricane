import { DispatchEventTypeName } from "discord-models/event";

export default abstract class Event {
    public abstract eventName: DispatchEventTypeName;

    public abstract process<T>(data: T): Promise<null>;
}
