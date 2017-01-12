import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {CouchbaseInstance} from "../../couchbaseinstance";

@Component({
    selector: "encryption",
    templateUrl: "./components/encryption/encryption.component.html"
})
export class EncryptionComponent {

    //private couchbaseInstance: CouchbaseInstance;
    private database: any;
    logs: Array<string>;
    state: string;

    constructor(location: Location,private couchbaseInstance: CouchbaseInstance) {
        
        this.logs= new Array<string>();
        //if(this.couchbaseInstance && th)
    }

    save() {
        // if(this.firstname != "" && this.lastname != "") {
        //     this.database.createDocument({
        //         "firstname": this.firstname,
        //         "lastname": this.lastname
        //     });
        //     this.location.back();
        // }
    }

    open(name:string, key: string){
        this.database = this.couchbaseInstance.openDatabase(name, key);
        if(!this.database){
            this.logs.push("Error on open database")
        }
    }

    close(){
        if(this.couchbaseInstance.closeDatabase()){
            this.logs.push("closed database")
        }else {
            this.logs.push("Error closing database");
        }
    }

}
