import Manager from '../../../Structures/Manager';
import RedisConnector from '../RedisConnector';
import { Redis } from 'ioredis';
import Client from '../../Client';
import { GatewayEvent, DispatchEventTypeName, DispatchEventType } from 'discord-models/event';
import Event from '../../../Structures/Base/Event';

export default class EventManager extends Manager {
    public events: Map<DispatchEventTypeName, Event<any>[]> = new Map();
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;
    protected client: Client;

    constructor(client: Client, redisConnector: RedisConnector) {
        super();
        this.redisConnector = redisConnector;
        this.redisConnection = redisConnector.createConnection();
        this.client = client;
    }

    public addEvent(event: Event<any>) {
        const events = this.events.get(event.eventName);

        if (events) {
            events.push(event);
        } else {
            this.events.set(event.eventName, [event]);
        }
    }

    public init(): this {
        this.startEventLoop();
        return this;
    }

    protected async startEventLoop() {
        for ( ; ; ) {
            const [, msg]: [any, string] = await this.redisConnection.send_command(
                'blpop',
                'exchange:gateway_events',
                0,
            );
            const buf = Buffer.from(msg, 'utf8');

            const position = buf.lastIndexOf('}');

            if (!position) {
                console.log('Websocket message with no shard ID', msg);

                continue;
            }

            const sliceIdx = position + 1;
            const shardIdBuf = buf.slice(sliceIdx);
            const shardId = shardIdBuf.readUIntLE(0, shardIdBuf.length);

            const msgToParse = buf.slice(0, sliceIdx).toString('utf8');
            let event;

            try {
                event = JSON.parse(msgToParse);
            } catch (e) {
                console.log(e, msgToParse);

                continue;
            }

            this.process(event, shardId, msg.slice(0, sliceIdx));
        }
    }

    protected async process(event: GatewayEvent, shardId: number, rawMessage: string) {
        if (event.op === 0) {
            const payload = event.d as DispatchEventType;

            if (!event.t) {
                // log the fact that there's no type, this should be a bug
                return;
            }

            this.dispatch(event.t, shardId, payload);
        } else {
            this.forwardToSharder(rawMessage, shardId);
        }
    }

    private dispatch(name: DispatchEventTypeName, shardId: number, event: DispatchEventType) {
        const events = this.events.get(name);

        if (!events) {
            return;
        }

        for (const handler of events) {
            handler.process(event, shardId);
        }
    }

    private forwardToSharder(rawMessage: string, shardId: number) {
        this.redisConnection.rpush(`exchange:sharder:${shardId}`, rawMessage);
    }
}
