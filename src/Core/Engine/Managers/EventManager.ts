import Manager from '../../../Structures/Manager';
import RedisConnector from '../RedisConnector';
import { Redis } from 'ioredis';
import Client from '../../Client';
import { GatewayEvent, DispatchEventTypeName, DispatchEventType } from 'discord-models/event';
import Event from '../../../Structures/Base/Event';

export default class EventManager extends Manager {
    public events: Map<DispatchEventTypeName, Event[]> = new Map();
    protected redisConnector: RedisConnector;
    protected redisConnection: Redis;
    protected client: Client;

    constructor(client: Client, redisConnector: RedisConnector) {
        super();
        this.redisConnector = redisConnector;
        this.redisConnection = redisConnector.createConnection();
        this.client = client;
    }

    public addEvent(event: Event) {
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
            const [, msg] = await this.redisConnection.send_command(
                'blpop',
                'exchange:gateway_events',
                0,
            );

            let event;

            try {
                event = JSON.parse(msg);
            } catch (e) {
                console.log(e);

                continue;
            }

            this.process(event, msg);
        }
    }

    protected async process(event: GatewayEvent, rawMessage: string) {
        if (event.op === 0) {
            const payload = event.d as DispatchEventType;

            if (!event.t) {
                // log the fact that there's no type, this should be a bug
                return;
            }

            this.dispatch(event.t, payload);
        } else {
            this.forwardToSharder(rawMessage);
        }
    }

    private dispatch(name: DispatchEventTypeName, event: DispatchEventType) {
        const events = this.events.get(name);

        if (!events) {
            return;
        }

        for (const handler of events) {
            handler.process(event);
        }
    }

    private forwardToSharder(rawMessage: string) {
        this.redisConnection.rpush('exchange:sharder_events', rawMessage);
    }
}
