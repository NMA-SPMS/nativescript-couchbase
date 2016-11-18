declare module "nativescript-couchbase" {

    export class Couchbase {
        constructor(databaseName: string, encryptionKey?:string);
        createDocument(data: Object, documentId?: string);
        getDocument(documentId: string);
        updateDocument(documentId: string, data: Object);
        deleteDocument(documentId: string);
        destroyDatabase();
        createView(viewName: string, viewRevision: string, callback: any);
        executeQuery(viewName: string, options?: any);
        createPullReplication(remoteUrl: string);
        createPushReplication(remoteUrl: string);
        addDatabaseChangeListener(callback: any);
    }

}
