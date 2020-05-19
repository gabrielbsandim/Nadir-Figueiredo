import { UserController } from './controller/UserController';
import { BugController } from './controller/BugController';
import { InspectionController } from './controller/InspectionController';
import { MachineController } from './controller/MachineController';

export const Routes = [

    // User Routes
    { method: "get", route: "/users", controller: UserController, action: "all" },
    { method: "get", route: "/users/:id", controller: UserController, action: "one" },
    { method: "post", route: "/users", controller: UserController, action: "save" },
    { method: "post", route: "/users/create", controller: UserController, action: "createUser" },
    { method: "delete", route: "/users/:id", controller: UserController, action: "remove" },
    { method: "post", route: "/login", controller: UserController, action: "auth" },

    // Bug Routes
    { method: "get", route: "/bug", controller: BugController, action: "all" },
    { method: "get", route: "/bug/:id", controller: BugController, action: "one" },
    { method: "post", route: "/bug", controller: BugController, action: "save" },
    { method: "delete", route: "/bug/:id", controller: BugController, action: "remove" },

    // Inspection Routes
    { method: "get", route: "/inspection", controller: InspectionController, action: "all" },
    { method: "get", route: "/inspection/:id", controller: InspectionController, action: "one" },
    { method: "post", route: "/inspection", controller: InspectionController, action: "save" },
    { method: "delete", route: "/inspection/:id", controller: InspectionController, action: "remove" },

    // Machine Routes
    { method: "get", route: "/machine", controller: MachineController, action: "all" },
    { method: "get", route: "/machine/:id", controller: MachineController, action: "one" },
    { method: "post", route: "/machine", controller: MachineController, action: "save" },
    { method: "delete", route: "/machine/:id", controller: MachineController, action: "remove" },
];