import { Collection } from "branches";
import Collector from "../../Structures/Collector";

export default class Awaiter {
    public collectors = new Collection<Collector>();
}