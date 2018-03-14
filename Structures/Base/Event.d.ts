import { DispatchEventTypeName } from "discord-models/event";
export default abstract class Event {
    abstract eventName: DispatchEventTypeName;
    abstract process<T>(data: T): Promise<null>;
}
