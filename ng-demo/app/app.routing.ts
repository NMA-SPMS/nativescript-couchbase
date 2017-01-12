import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CreateComponent } from "./components/create/create.component";
import { EncryptionComponent } from "./components/encryption/encryption.component";
 
export const appRoutes: Routes = [
    { path: '', component: ListComponent },
    { path: "create", component: CreateComponent },
    { path: "encryption", component: EncryptionComponent }
];
 
export const appComponents: any = [
    ListComponent,
    CreateComponent,
    EncryptionComponent
];