import { Component, NgZone, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {CouchbaseInstance} from "../../couchbaseinstance";

@Component({
    selector: "my-app",
    templateUrl: "./components/list/list.component.html",
})
export class ListComponent implements OnInit{

    private database: any;
    private router: Router;
    private ngZone: NgZone;
    public personList: Array<Object>;

    constructor(router: Router, location: Location, ngZone: NgZone,public couchbaseInstance: CouchbaseInstance) {
        this.router = router;
        this.ngZone = ngZone;
        // this.database = couchbaseInstance.getDatabase();
        this.personList = [];
         location.subscribe((path) => {
            this.refresh();
        });
        
    }

    ngOnInit(){
        if(!this.couchbaseInstance.getDatabase()){
            this.database = this.couchbaseInstance.openDatabase("mypassword");
        }else{
            this.database = this.couchbaseInstance.getDatabase();
        }
        

        this.database.addDatabaseChangeListener((changes) => {
            let changeIndex;
            for (var i = 0; i < changes.length; i++) {
                let documentId = changes[i].getDocumentId();
                changeIndex = this.indexOfObjectId(documentId, this.personList);
                let document = this.database.getDocument(documentId);
                this.ngZone.run(() => {
                    if (changeIndex == -1) {
                        this.personList.push(document);
                    } else {
                        this.personList[changeIndex] = document;
                    }
                });
            }
        });

       

        this.refresh();
    }

    create() {
        this.router.navigate(["create"]);
    }

    encryption(){
        this.router.navigate(["encryption"]);
    }

    

    

    private refresh() {
        this.personList = [];
        if(this.database){
            let rows = this.database.executeQuery("people");
            for(let i = 0; i < rows.length; i++) {
                this.personList.push(rows[i]);
            }
        }else{
            console.log("cant run database query on refresh, database is null");
        }
        
    }

    private indexOfObjectId(needle: string, haystack: any) {
        for (let i = 0; i < haystack.length; i++) {
            if (haystack[i] != undefined && haystack[i].hasOwnProperty("_id")) {
                if (haystack[i]._id == needle) {
                    return i;
                }
            }
        }
        return -1;
    }

}
