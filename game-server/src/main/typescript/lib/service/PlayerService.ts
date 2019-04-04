import { Flux, Mono } from 'reactor-core-js/flux';
import { Player } from '@shared/player_pb';
import { Location } from '@shared/location_pb';

export default interface PlayerService {

    createPlayer(uuid: string, nickname: string): Player;

    disconnectPlayer(uuid: string): void;

    locate(uuid: string, locationStream: Flux<Location>): Flux<Location>;

    players(): Flux<Player> ;

}