/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
 * Generated from CastleDB JSON
 */

export enum TaskType {
    Job = 0,
    Construction = 1,
    Exploration = 2,
    Reproduction = 3,
}
export class Task {
    public id: any = null;
    public name: string = "";
    public type: TaskType = 0;
    public autoRemove: boolean = false;
    public autoRestart: boolean = false;
    public ModifyInvCap: boolean = false;
    public need: TasksNeed | null = null;
    public result: TasksResult | null = null;
    public details: string = "";
    public speed: number = 0.0;

    constructor(init?: any) {
        if (init) Object.assign(this, init);
        if (init && init.need) { this.need = new TasksNeed(init.need); }
        if (init && init.result) { this.result = new TasksResult(init.result); }
    }
}

export class Resource {
    public id: any = null;
    public name: string = "";
    public price: number = 0.0;

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class Project {
    public id: any = null;
    public name: string = "";
    public log: string = "";
    public description: string = "";
    public cost: number = 0;
    public action: string = "";

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class Unlock {
    public id: any = null;
    public name: string = "";
    public condition: string = "";
    public action: string = "";

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class Quest {
    public id: any = null;
    public name: string = "";
    public condition: string = "";

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class Automation {
    public id: any = null;
    public name: string = "";
    public startCondition: string = "";
    public taskID: string = "";
    public stopCondition: string = "";

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class TasksNeed {
    public woods: number = 0;
    public stones: number = 0;
    public villagers: number = 0;
    public sticks: number = 0;
    public houses: number = 0;
    public offsprings: number = 0;

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class TasksResult {
    public woods: number = 0;
    public stones: number = 0;
    public sticks: number = 0;
    public houses: number = 0;
    public villagers: number = 0;
    public berries: number = 0;
    public custom: string = "";
    public offsprings: number = 0;

    constructor(init?: any) {
        if (init) Object.assign(this, init);
    }
}

export class GameData {
    public static Tasks: Task[] = [];
    public static getTask(id: string): Task | undefined { return this.Tasks.find(i => (i as any).id === id); }
    public static Resources: Resource[] = [];
    public static getResource(id: string): Resource | undefined { return this.Resources.find(i => (i as any).id === id); }
    public static Projects: Project[] = [];
    public static getProject(id: string): Project | undefined { return this.Projects.find(i => (i as any).id === id); }
    public static Unlocks: Unlock[] = [];
    public static getUnlock(id: string): Unlock | undefined { return this.Unlocks.find(i => (i as any).id === id); }
    public static Quests: Quest[] = [];
    public static getQuest(id: string): Quest | undefined { return this.Quests.find(i => (i as any).id === id); }
    public static Automations: Automation[] = [];
    public static getAutomation(id: string): Automation | undefined { return this.Automations.find(i => (i as any).id === id); }
    public static init() {
        GameData.Tasks.push(new Task({"id":"task_punch_tree","name":"Punch tree","speed":0.5,"need":{"villagers":1},"details":"A Simple resource","autoRestart":true,"result":{"woods":1},"ModifyInvCap":false,"type":0,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_punch_berry","name":"Punch berry tree","autoRestart":true,"ModifyInvCap":false,"need":{"villagers":1},"result":{"berries":1},"details":"Used to feed villagers","speed":0.5,"type":0,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_punch_rock","name":"Punch rock","need":{"villagers":1},"speed":0.5,"details":"A Simple resource","autoRestart":true,"result":{"stones":1},"ModifyInvCap":false,"type":0,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_create_stick","name":"Make a stick","need":{"villagers":1,"woods":1},"speed":0.5,"details":"A Simple resource","autoRestart":true,"result":{"sticks":1},"ModifyInvCap":false,"type":0,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_build_house","name":"House","need":{"villagers":1,"woods":2,"stones":1},"speed":0.3,"details":"A nice place to live","autoRestart":false,"result":{"houses":1},"ModifyInvCap":false,"type":1,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_build_shed","name":"Shed","need":{"villagers":1,"woods":1,"stones":1,"sticks":1},"speed":0.3,"details":"Increase your inventory cap by 5","autoRestart":false,"result":{"woods":5,"stones":5,"sticks":5,"houses":2,"villagers":2,"berries":5,"custom":"inventory.sheds += 1"},"ModifyInvCap":true,"type":1,"autoRemove":false}));
        GameData.Tasks.push(new Task({"id":"task_build_shop","name":"Shop","autoRestart":false,"ModifyInvCap":false,"need":{"villagers":1,"woods":20,"stones":20,"sticks":10},"result":{"custom":"readyToUnlock['shop'] = true"},"details":"A place to sell your resources","speed":0.2,"type":1,"autoRemove":true}));
        GameData.Tasks.push(new Task({"id":"task_build_research_cencer","name":"Research Center","type":1,"autoRemove":true,"autoRestart":false,"ModifyInvCap":false,"need":{"villagers":1,"woods":50,"stones":50,"sticks":25},"result":{"custom":"readyToUnlock['project'] = true"},"details":"Invest in projects, improve quality of life","speed":0.1}));
        GameData.Tasks.push(new Task({"id":"task_make_offspring","name":"Make Offspring","type":3,"autoRemove":false,"autoRestart":false,"ModifyInvCap":false,"need":{"villagers":2,"houses":1},"result":{"custom":"addTask(['task_raise_offspring']); startTaskID('task_raise_offspring'); inventory.offsprings++"},"details":"Needs a house to grow in","speed":0.2}));
        GameData.Tasks.push(new Task({"id":"task_raise_offspring","name":"Raise Offspring","type":3,"autoRemove":true,"autoRestart":false,"ModifyInvCap":false,"need":{"offsprings":1,"houses":1},"result":{"villagers":1},"details":"Grow an offspring to a real villager","speed":0.2}));
        GameData.Tasks.push(new Task({"id":"task_build_warehouse","name":"Warehouse","type":1,"autoRemove":false,"autoRestart":false,"ModifyInvCap":true,"need":{"villagers":2,"sticks":100,"stones":200,"woods":200},"result":{"berries":100,"houses":100,"offsprings":10,"sticks":100,"stones":100,"villagers":20,"woods":100,"custom":"inventory.warehouses +=1"},"details":"Increase your inventory cap by 100","speed":0.1}));
        GameData.Resources.push(new Resource({"id":"woods","name":"Wood","price":1}));
        GameData.Resources.push(new Resource({"id":"stones","name":"Stone","price":1}));
        GameData.Resources.push(new Resource({"id":"sticks","name":"Stick","price":2}));
        GameData.Resources.push(new Resource({"id":"berries","name":"Berry","price":1}));
        GameData.Projects.push(new Project({"id":"proj_hire_villager","name":"Hire a Villager","description":"Do more stuffs","action":"inventory.villagers += 1","cost":100,"log":"Hired another villager"}));
        GameData.Projects.push(new Project({"id":"proj_auto_gather_food","name":"Gather Food Automatically","description":"When there is not enough food, interrupt the current task and start gathering food","action":"enabledAutomations['auto_gather_food'] = true","cost":150,"log":"Automated Food gathering enabled"}));
        GameData.Projects.push(new Project({"id":"proj_auto_gather_wood","name":"Gather Wood Automatically","log":"Automated Wood gathering enabled","description":"When there is no wood, interrupt the current task and start gathering wood","cost":150,"action":"enabledAutomations['auto_gather_wood'] = true"}));
        GameData.Projects.push(new Project({"id":"proj_auto_gather_stone","name":"Gather Stone Automatically","log":"Automated Stone gathering enabled","description":"When there is no stone, interrupt the current task and start gathering wood","cost":150,"action":"enabledAutomations['auto_gather_stone'] = true"}));
        GameData.Projects.push(new Project({"id":"proj_auto_build_shed","name":"Build Shed Automatically","description":"When the inventory capacity is reached. Build a shed to increase it's cap","action":"enabledAutomations['auto_build_shed'] = true","cost":200,"log":"Automated Shed building enabled"}));
        GameData.Projects.push(new Project({"id":"proj_increase_resource_price_by_25","name":"Increase public demand","log":"Resources price increased by 25%","description":"Increase resources price by 25%","cost":250,"action":"increaseResourceCost(25)"}));
        GameData.Projects.push(new Project({"id":"proj_double_job_production","name":"Double Job Results","log":"Job results doubled","description":"Double the result of job tasks","cost":250,"action":"increaseJobResults(100)"}));
        GameData.Projects.push(new Project({"id":"proj_start_house_building_program","name":"House construction program","log":"","description":"Encourage villagers to build houses","cost":150,"action":"readyToUnlock['house'] = true"}));
        GameData.Projects.push(new Project({"id":"proj_procreation","name":"Procreation","log":"","description":"Encourage villagers to make offsprings","cost":150,"action":"readyToUnlock['procreation'] = true"}));
        GameData.Projects.push(new Project({"id":"proj_reduce_project_cost_by_10","name":"Reduce Projects cost by 10%","log":"","description":"","cost":0,"action":"costReduction = .1"}));
        GameData.Projects.push(new Project({"id":"proj_double_initial_villagers","name":"Double initial villagers number","log":"","description":"","cost":0,"action":"inventory.villagers = 2"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_shed","name":"Construction: Shed available","condition":"return isInventoryFull()","action":"addTask(['task_build_shed'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_warehouse","name":"Construction: Warehouse available","condition":"return inventory.max_woods >= 100","action":"addTask(['task_build_warehouse'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_house","name":"Construction: House available","condition":"return readyToUnlock['house'] == true","action":"addTask(['task_build_house'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_research_center","name":"Construction: Research Center available","condition":"return shop.style.display == 'block'","action":"addTask(['task_build_research_cencer'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_shop","name":"Construction: Shop available","condition":"return inventory.max_woods >= 20","action":"addTask(['task_build_shop']); status_money.style.display = 'block';"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_auto_gather_food","name":"","condition":"return inventory.villagers >= 2","action":"addProject([ 'proj_auto_gather_food']);"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_auto_gather_wood","name":"","condition":"return inventory.villagers >= 2","action":"addProject([ 'proj_auto_gather_wood']);"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_auto_gather_stone","name":"","condition":"return inventory.villagers >= 2","action":"addProject([ 'proj_auto_gather_stone']);"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_auto_build_shed","name":"","condition":"return inventory.villagers >= 2","action":"addProject([ 'proj_auto_build_shed']);"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_projects","name":"Projects are now available","condition":"return readyToUnlock['project'] == true","action":"addProject(['proj_hire_villager'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_offspring","name":"Villagers are encouraged to make offspring","condition":"return readyToUnlock['procreation'] == true","action":"addTask(['task_make_offspring'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_show_shop","name":"Resources can now be sold in the shop","condition":"return readyToUnlock['shop'] == true","action":"shop.style.display = 'block'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_woods","name":"","condition":"return inventory.woods >= 1","action":"lab_wood_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_berries","name":"","condition":"return inventory.berries >= 1","action":"lab_berry_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_stones","name":"","condition":"return inventory.stones >= 1","action":"lab_stone_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_houses","name":"","condition":"return inventory.houses>= 1","action":"lab_house_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_offsprings","name":"","condition":"return inventory.offsprings>= 1","action":"lab_offspring_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_inv_sticks","name":"","condition":"return inventory.sticks>= 1","action":"lab_stick_count.parentElement.style.visibility= 'visible'"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_increase_resource_cost","name":"","condition":"return totalResourcesSold() >= 200","action":"addProject([ 'proj_increase_resource_cost_by_25']);"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_double_job_results","name":"","condition":"return totalResourcesProduiced() >= 200 && readyToUnlock['project'] == true","action":"addProject(['proj_double_job_production','proj_start_house_building_program'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_procreation","name":"","condition":"return readyToUnlock['house'] == true","action":"addProject(['proj_procreation'])"}));
        GameData.Unlocks.push(new Unlock({"id":"unlock_prestige","name":"","condition":"return moon >= 100","action":"suggestPrestige()"}));
        GameData.Quests.push(new Quest({"id":"quest_gather_berry","name":"Gather Berry","condition":"return inventory.berries >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_harvest_tree","name":"Harvest a tree","condition":"return inventory.woods >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_make_stick","name":"Make a stick","condition":"return inventory.sticks >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_gather_stone","name":"Gather Stone","condition":"return inventory.stones >= 1"}));
        GameData.Quests.push(new Quest({"id":"moon_speed_x2","name":"Set Moon speed x2","condition":"return timeMultiplier == 2"}));
        GameData.Quests.push(new Quest({"id":"moon_speed_x4","name":"Set Moon speed x4","condition":"return timeMultiplier == 4"}));
        GameData.Quests.push(new Quest({"id":"pause_moon","name":"Pause the moon","condition":"return isMoonPaused == true"}));
        GameData.Quests.push(new Quest({"id":"quest_build_shed","name":"Build a Shed","condition":"return inventory.sheds >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_build_shop","name":"Build a Shop","condition":"return shop.style.display == 'block'"}));
        GameData.Quests.push(new Quest({"id":"quest_sell_wood","name":"Sell Wood","condition":"return resourcesSold.woods >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_sell_stick","name":"Sell Stick","condition":"return resourcesSold.sticks >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_sell_berry","name":"Sell Berry","condition":"return resourcesSold.berries >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_sell_stone","name":"Sell Stone","condition":"return resourcesSold.stones >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_build_research_cencer","name":"Build a Research Center","condition":"return projects.style.display == 'block'"}));
        GameData.Quests.push(new Quest({"id":"quest_hire_villager","name":"Hire a Villager","condition":"return inventory.villagers > 1"}));
        GameData.Quests.push(new Quest({"id":"quest_build_house","name":"Build a House","condition":"return inventory.houses >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_make_offspring","name":"Make an offspring","condition":"return inventory.offsprings >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_build_warehouse","name":"Build a Warehouse","condition":"return inventory.warehouses >= 1"}));
        GameData.Quests.push(new Quest({"id":"quest_5_villagers","name":"Have 5 Villagers","condition":"return inventory.villagers >= 5"}));
        GameData.Quests.push(new Quest({"id":"quest_10_villagers","name":"Have 10 Villagers","condition":"return inventory.villagers >= 10"}));
        GameData.Quests.push(new Quest({"id":"quest_30_villagers","name":"Have 30 Villagers","condition":"return inventory.villagers >= 30"}));
        GameData.Quests.push(new Quest({"id":"quest_50_villagers","name":"Have 50 Villagers","condition":"return inventory.villagers >= 50"}));
        GameData.Automations.push(new Automation({"id":"auto_berry","name":"Gather berries automatically","startCondition":"return enabledAutomations['auto_gather_food'] && food < foodNeeded","stopCondition":"return food >= foodNeeded","taskID":"task_punch_berry"}));
        GameData.Automations.push(new Automation({"id":"auto_wood","name":"Gather wood automatically","startCondition":"return enabledAutomations['auto_gather_wood'] && inventory.woods <= 0","taskID":"task_punch_tree","stopCondition":"return inventory.woods >= inventory.max_woods/2"}));
        GameData.Automations.push(new Automation({"id":"auto_stone","name":"Gather stone automatically","startCondition":"return enabledAutomations['auto_gather_stone'] && inventory.stones <= 0","taskID":"task_punch_rock","stopCondition":"return inventory.stones >= inventory.max_stones/2"}));
        GameData.Automations.push(new Automation({"id":"auto_shed","name":"Build shed automatically","startCondition":"return enabledAutomations['auto_build_shed'] &&  isInventoryFull()","stopCondition":"return  !isInventoryFull()","taskID":"task_build_shed"}));    }
}

// Initialize data immediately
GameData.init();
