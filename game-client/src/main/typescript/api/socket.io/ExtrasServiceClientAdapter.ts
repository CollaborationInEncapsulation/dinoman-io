import {Extra} from "game-idl";
import ExtrasService from "../ExtrasService";
import {DirectProcessor, Flux} from "reactor-core-js/flux";

export default class ExtrasServiceClientAdapter implements ExtrasService {

    private readonly sharedExtrasStream: DirectProcessor<Extra.AsObject>;

    constructor(socket: SocketIOClient.Socket) {
        this.sharedExtrasStream = new DirectProcessor<Extra.AsObject>();
        socket.on("extras", (data: ArrayBuffer) => {
            if (data && data.byteLength) {
                this.sharedExtrasStream.onNext(Extra.deserializeBinary(new Uint8Array(data)).toObject());
            }
        })
    }

    extras(): Flux<Extra.AsObject> {
        return this.sharedExtrasStream;
    }
}