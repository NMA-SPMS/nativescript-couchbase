import { Injectable } from "@angular/core";
import {Couchbase} from 'nativescript-couchbase';

@Injectable()
export class CouchbaseInstance {

    private isInstantiated: boolean;
    private database: any;
    private pull: any;
    private push: any;

    constructor() {
         
    }

    closeDatabase(){

        return this.database.closeDatabase();
    }

    openDatabase(name: string, key?: string){

        this.database = new Couchbase(name,key);
        this.database.createView("people", "1", (document, emitter) => {
                emitter.emit(document._id, document);
            });
        return this.database;
    }

    getDatabase(): Couchbase {
        return this.database;
    }

    startSync(continuous: boolean) {
        // this.push = this.database.createPushReplication("http://192.168.57.1:4984/test-database");
        // this.pull = this.database.createPullReplication("http://192.168.57.1:4984/test-database");

        // this.push.setContinuous(continuous);
        // this.pull.setContinuous(continuous);

        // this.push.start();
        // this.pull.start();
    }

    stopSync() {
        // this.push.stop();
        // this.pull.stop();
    }

}
