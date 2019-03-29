import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists-resolver';

export const appRoutes: Routes = [
    // {path: 'home', component: HomeComponent},
    // {path: 'members', component: MemberListComponent, canActivate: [AuthGuard]},
    // {path: 'messages', component: MessagesComponent},
    // {path: 'lists', component: ListsComponent},
    // {path: '**', redirectTo: 'home', pathMatch: 'full'},

    { path: '', component: HomeComponent },//när man bara navigerar till domänen så router vi till homeComponent
    {
        path: '',//hack to make all routes below to use the same authguard
        canActivate: [AuthGuard],
        children: [
            { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
// tslint:disable-next-line: max-line-length
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
]
