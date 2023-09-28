//---
class GameScenario {
    //---
    constructor(data) {
        //---
        this.initData = data
        //---
        let names = Object.getOwnPropertyNames(data) 
        names.forEach(name => { Object.defineProperty(this, name, Object.getOwnPropertyDescriptor(data, name)) })
    }
    //---
    reset(game) {
        //---
        this.startDate = null
        this.victoryDate = null
    }
    //---
    load(data) {
        //---
        if (data.startDate != null) this.startDate = data.startDate
        if (data.victoryDate != null) this.victoryDate = data.victoryDate
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        savedData.startDate = this.startDate
        savedData.victoryDate = this.victoryDate
        //---
        return savedData
    }
    //---
    getItem(itemId) { return this.items.find(item => item.id == itemId) }
    getRecipe(recipeId) { return this.recipes.find(recipe => recipe.id == recipeId) }
}
//---
class GameItem {
    //---
    constructor(game, data) {
        //---
        this.game = game
        //---
        let names = Object.getOwnPropertyNames(data) 
        names.forEach(name => { Object.defineProperty(this, name, Object.getOwnPropertyDescriptor(data, name)) })
        //---
        this.count = this.count ? this.count : 0
        this.unlocked = this.reqs ? false : true
        //---
        this.storage = this.stack ? this.stack : Infinity
        this.upgradeCount = 0
        //---
        this.totalMachineCount = 0
        this.machines = game.currentMachines.filter(machine => machine.outputId == this.id)
        //---
        this.prod = 0
        this.consu = 0
        this.balance = 0
        //---
        this.completed = false
    }
    //---
    load(data) {
        //---
        if (data.count != null) this.count = data.count
        if (data.completed != null && this.goal) this.completed = data.completed
        if (data.upgradeCount != null) this.upgradeCount = data.upgradeCount
        //---
        this.refreshStorage()
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        savedData.count = this.count
        savedData.completed = this.completed
        savedData.upgradeCount = this.upgradeCount
        //---
        return savedData
    }
    //---
    refreshStorage() {
        //---
        this.storage = this.stack ? this.stack : Infinity
        if (this.storage != Infinity) this.storage = this.stack * Math.pow(2, this.upgradeCount)
    }
}
//---
class GameMachine {
    //---
    constructor(game, machineData, recipeData) {
        //---
        this.game = game
        //---
        this.id = machineData.id + '-' + recipeData.id
        this.machineId = machineData.id
        //---
        this.limitCount = 0
        if (machineData.id == 'manual' && recipeData.limits) {
            this.limits = recipeData.limits
            this.limit = this.limits[0]
        }
        //---
        this.seconds = recipeData.seconds / machineData.speed
        //---
        this.outputId = recipeData.outputId
        this.outputCount = recipeData.outputCount
        //---
        if (recipeData.inputs) {
            this.inputs = {}
            for (let id in recipeData.inputs) this.inputs[id] = recipeData.inputs[id]
        }
        //---
        if (machineData.energy) {
            if (!this.inputs) this.inputs = {}
            for (let id in machineData.energy) this.inputs[id] = machineData.energy[id] * this.seconds
        }
        //---
        if (recipeData.reqs) {
            if (!this.reqs) this.reqs = []
            recipeData.reqs.forEach(id => { if (this.reqs.includes(id) == false) this.reqs.push(id) })
        }
        if (machineData.reqs) {
            if (!this.reqs) this.reqs = []
            machineData.reqs.forEach(id => { if (this.reqs.includes(id) == false) this.reqs.push(id) })                
        }
        //---
        this.unlocked = this.reqs ? false : true
        //---
        this.count = (machineData.id == 'manual' ? 1 : 0)
        this.selectCount = '1'
        //---
        this.status = 'paused'
        this.remainingSeconds = this.seconds
    }
    //---
    load(data) {
        //---
        if (data.count != null) this.count = data.count
        if (data.limit != null) this.limit = data.limit
        if (data.limitCount != null) this.limitCount = data.limitCount
        if (data.selectCount != null) this.selectCount = data.selectCount
        //---
        if (data.status != null) this.status = data.status
        if (data.remainingSeconds != null) this.remainingSeconds = data.remainingSeconds
        //---
        if (this.machineId != 'manual' && this.count > 0 || (this.machineId == 'manual' && this.status != 'paused')) {
            let outputElem = this.game.getItem(this.outputId)
            outputElem.totalMachineCount += this.count
        }
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        savedData.count = this.count
        savedData.limit = this.limit
        savedData.limitCount = this.limitCount
        savedData.selectCount = this.selectCount
        //---
        savedData.status = this.status
        savedData.remainingSeconds = this.remainingSeconds
        //---
        return savedData
    }
    //---
    getIncreaseCount() {
        //---
        if (this.selectCount == '1') return Math.min(this.game.getAvailableCount(this.machineId), 1)
        else if (this.selectCount == '5') return Math.min(this.game.getAvailableCount(this.machineId), 5)
        else if (this.selectCount == '10') return Math.min(this.game.getAvailableCount(this.machineId), 10)
        else if (this.selectCount == '100') return Math.min(this.game.getAvailableCount(this.machineId), 100)
        else if (this.selectCount == 'max') return this.game.getAvailableCount(this.machineId)
    }
    //---
    getDecreaseCount() {
        //---
        if (this.selectCount == '1') return Math.min(this.count, 1)
        else if (this.selectCount == '5') return Math.min(this.count, 5)
        else if (this.selectCount == '10') return Math.min(this.count, 10)
        else if (this.selectCount == '100') return Math.min(this.count, 100)
        else if (this.selectCount == 'max') return this.count
    }
    //---
    getProgress() {
        //---
        return 100 - 100 * this.remainingSeconds / this.seconds
    }
}
//---
class Game {
    //---
    constructor() {
        //---
        this.currentScenario = null
        //---
        this.victory = false
        this.victoryReqs = null
        //---
        this.scenarios = []
        DATA.scenarios.forEach(scenario => {
            //---
            let newScenario = new GameScenario(scenario)
            this.scenarios.push(newScenario)
        })
        //---
        this.currentItems = null
        this.currentMachines = null
    }
    //---
    loadScenario(scenarioId) {
        //---
        this.currentScenario = this.scenarios.find(scenario => scenario.id == scenarioId)
        //---
        this.victory = false
        this.victoryReqs = this.currentScenario.victoryReqs ? this.currentScenario.victoryReqs : null
        //---
        this.currentMachines = []
        this.currentScenario.recipes.forEach(dataRecipe => {
            dataRecipe.machines.forEach(machineId => {
                //---
                let dataMachine = this.currentScenario.items.find(item => item.id == machineId)
                //---
                let machine = new GameMachine(this, dataMachine, dataRecipe)
                this.currentMachines.push(machine)
            })
        })
        //---
        this.currentItems = []
        this.currentScenario.items.forEach(dataItem => {
            //---
            let item = new GameItem(this, dataItem)
            this.currentItems.push(item)
        })
    }
    //---
    start(scenarioId) {
        //---
        this.loadScenario(scenarioId)
        //---
        this.refreshUnlocked()
    }
    //---
    load(data) {
        //---
        if (data.scenarioId != null) this.loadScenario(data.scenarioId)
        if (data.victory != null) this.victory = data.victory
        //---
        if (data.scenarios != null) this.scenarios.forEach(scenario => { if (data.scenarios[scenario.id]) scenario.load(data.scenarios[scenario.id]) })
        //---
        if (data.items != null) this.currentItems.forEach(item => { if (data.items[item.id]) item.load(data.items[item.id]) })
        if (data.machines != null) this.currentMachines.forEach(machine => { if (data.machines[machine.id]) machine.load(data.machines[machine.id]) })
        //---
        this.refreshUnlocked()
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        savedData.victory = this.victory
        savedData.scenarioId = this.currentScenario.id
        //---
        savedData.scenarios = {}
        this.scenarios.forEach(scenario => savedData.scenarios[scenario.id] = scenario.getSaveData())
        //---
        savedData.items = {}
        this.currentItems.forEach(item => savedData.items[item.id] = item.getSaveData())
        //---
        savedData.machines = {}
        this.currentMachines.forEach(machine => savedData.machines[machine.id] = machine.getSaveData())
        //---
        return savedData
    }
    //---
    getItem(itemId) { return this.currentItems.find(item => item.id == itemId) }
    getMachine(machineId) { return this.currentMachines.find(machine => machine.id == machineId) }
    //---
    checkReqs(reqs) {
        //---
        let check = true        
        //---
        reqs.forEach(reqId => {
            //---
            let item = this.getItem(reqId)
            if (item.completed == false) check = false
        })
        //---
        return check
    }
    //---
    refreshUnlocked() {
        //---
        this.currentItems.filter(item => item.reqs).forEach(item => { item.unlocked = this.checkReqs(item.reqs) })
        this.currentMachines.filter(machine => machine.reqs).forEach(machine => { machine.unlocked = this.checkReqs(machine.reqs) })
    }
    //---
    isVictoryReached() {
        //---
        if (this.victory) return false
        else if (this.victoryReqs) return this.checkReqs(this.victoryReqs)
        else return false
    }
    //---
    doVictory() {
        //---
        this.victory = true
        this.currentScenario.victoryDate = Date.now()
    }
    //---
    canMachineStart(machine) {
        //---
        if (machine.inputs) {
            for (let id in machine.inputs) {
                if (this.getAvailableCount(id) < machine.inputs[id] * machine.count) return false
            }
        }
        //---
        return true
    }
    //---
    doTick(stepMs) {
        //---
        let seconds = stepMs / 1000
        //---
        let machines = this.currentMachines.filter(machine => machine.count > 0 && machine.status != 'paused')
        machines.forEach(machine => {
            //---
            if (machine.status == 'wait' && this.canMachineStart(machine)) {
                //---
                if (machine.inputs) {
                    for (let id in machine.inputs) {
                        let inputElem = this.getItem(id)
                        inputElem.count -= machine.inputs[id] * machine.count
                    }
                }
                //---
                machine.status = 'inprogress'
                machine.remainingSeconds = machine.seconds
            }
            if (machine.status == 'inprogress') {
                //---
                let outputItem = this.getItem(machine.outputId)
                if (outputItem.count >= outputItem.storage) return
                //---
                if (seconds >= machine.remainingSeconds) {
                    //---
                    let potential = Math.floor((seconds - machine.remainingSeconds) / machine.seconds)
                    if (potential > 0) {
                        //---
                        if (machine.inputs) {
                            for (let id in machine.inputs) {
                                let inputElem = this.getItem(id)
                                potential = Math.min(potential, Math.floor(inputElem.count / (machine.inputs[id] * machine.count)))
                            }
                        }
                    }
                    if (potential > 0) {
                        //---
                        if (machine.inputs) {
                            for (let id in machine.inputs) {
                                let inputElem = this.getItem(id)
                                inputElem.count -= machine.inputs[id] * machine.count * potential
                            }
                        }
                    }
                    if (potential > 0 && machine.limits && machine.limitCount + potential >= machine.limit) potential = machine.limit - machine.limitCount - 1
                    //---
                    let outputElem = this.getItem(machine.outputId)
                    outputElem.count += machine.outputCount * machine.count * (1 + potential)
                    //---
                    if (outputElem.goal && outputElem.count >= outputElem.goal) {
                        //---
                        outputElem.completed = true
                        outputElem.totalMachineCount -= machine.count
                        //---
                        machine.count = 0
                        machine.status = 'paused'
                        machine.limitCount = 0
                        machine.remainingSeconds = machine.seconds
                        //---
                        this.refreshUnlocked()
                        window.app.selectedScreen.display()
                    }
                    //---
                    if (machine.limits) machine.limitCount += 1 + potential
                    //---
                    if (machine.limits && machine.limitCount >= machine.limit) {
                        //---
                        machine.status = 'paused'
                        machine.limitCount = 0
                        machine.remainingSeconds = machine.seconds
                    }
                    else if (this.canMachineStart(machine)) {
                        //---
                        if (machine.inputs) {
                            for (let id in machine.inputs) {
                                let inputElem = this.getItem(id)
                                inputElem.count -= machine.inputs[id] * machine.count
                            }
                        }
                        //---
                        machine.status = 'inprogress'
                        machine.remainingSeconds = machine.seconds
                    }
                    else {
                        //---
                        machine.status = 'wait'
                        machine.remainingSeconds = machine.seconds
                    }
                }
                else machine.remainingSeconds -= seconds
            }
        })
        //---
        let temp = {}
        //---
        let items = this.currentItems.filter(item => item.unlocked)
        items.forEach(item => {
            //---
            if (item.count >= item.storage) item.count = item.storage
            //---
            temp[item.id] = { prod:0, consu:0 }
        })
        //---
        machines = this.currentMachines.filter(machine => machine.count > 0 && machine.status == 'inprogress')
        machines.forEach(machine => {
            //---
            if (machine.inputs) {
                for (let id in machine.inputs) {
                    temp[id].consu -= (machine.inputs[id] * machine.count) / machine.seconds
                }
            }
            //---
            temp[machine.outputId].prod += (machine.outputCount * machine.count) / machine.seconds
        })
        //---
        items.forEach(item => {
            //---
            item.prod = temp[item.id].prod
            item.consu = temp[item.id].consu
            //---
            item.balance = item.prod + item.consu
        })
    }
    //---
    getMachineUsedCount(itemId) {
        //---
        let usedCount = 0
        //---
        let machines = this.currentMachines.filter(machine => machine.count > 0 && machine.machineId == itemId)
        machines.forEach(machine => { usedCount += machine.count })
        //---
        return usedCount
    }
    //---
    getAvailableCount(itemId) {
        //---
        let item = this.getItem(itemId)
        //---
        let usedCount = 0
        if (item.category == 'cat-machine' || item.id == 'manual') usedCount = this.getMachineUsedCount(itemId)
        //---
        return item.count - usedCount
    }
    //---
    canUpgradeItem(item) {
        //---
        if (!item.unlocked) return false
        //---
        if (item.storage != Infinity && item.count < item.storage) return false
        //---
        return true
    }
    //---
    upgradeItem(itemId) {
        //---
        let item = this.getItem(itemId)
        if (this.canUpgradeItem(item)) {
            //---
            item.count -= item.storage
            item.upgradeCount += 1
            //---
            item.refreshStorage()
        }
    }
    //---
    canIncreaseMachineCount(machine) {
        //---
        if (!machine.unlocked) return false
        //---
        if (machine.status != 'paused') return false
        //---
        let increaseCount = machine.getIncreaseCount()
        if (increaseCount <= 0) return false
        //---
        if (this.getAvailableCount(machine.machineId) < increaseCount) return false
        //---
        return true
    }
    //---
    increaseMachineCount(machineId) {
        //---
        let machine = this.getMachine(machineId)
        if (this.canIncreaseMachineCount(machine)) {
            //---
            let increaseCount = machine.getIncreaseCount()
            machine.count += increaseCount
            //---
            if (machine.machineId != 'manual') {
                let outputElem = this.getItem(machine.outputId)
                outputElem.totalMachineCount += increaseCount
            }
        }
    }
    //---
    canDecreaseMachineCount(machine) {
        //---
        if (machine.status != 'paused') return false
        //---
        let decreaseCount = machine.getDecreaseCount()
        if (machine.count < 1 || machine.count < decreaseCount) return false
        //---
        return true
    }
    //---
    decreaseMachineCount(machineId) {
        //---
        let machine = this.getMachine(machineId)
        if (this.canDecreaseMachineCount(machine)) {
            //---
            let decreaseCount = machine.getDecreaseCount()
            machine.count -= decreaseCount
            //---
            if (machine.machineId != 'manual') {
                let outputElem = this.getItem(machine.outputId)
                outputElem.totalMachineCount -= decreaseCount
            }
        }
    }
    //---
    canStartMachine(machine) {
        //---
        if (!machine.unlocked) return false
        //---
        if (machine.status != 'paused') return false
        if (machine.count <= 0) return false
        //---
        return true
    }
    //---
    startMachine(machineId) {
        //---
        let machine = this.getMachine(machineId)
        if (this.canStartMachine(machine)) {
            //---
            machine.status = 'wait'
            machine.limitCount = 0
            machine.remainingSeconds = machine.seconds
        }
    }
    //---
    canStopMachine(machine) {
        //---
        if (machine.status == 'paused') return false
        //---
        return true
    }
    //---
    stopMachine(machineId) {
        //---
        let machine = this.getMachine(machineId)
        if (this.canStopMachine(machine)) {
            //---
            if (machine.status == 'inprogress' && machine.inputs) {
                for (let id in machine.inputs) {
                    let inputItem = this.getItem(id)
                    inputItem.count += machine.inputs[id] * machine.count
                    if (inputItem.count > inputItem.storage) inputItem.count = inputItem.storage
                }
            }
            //---
            machine.status = 'paused'
            machine.limitCount = 0
            machine.remainingSeconds = machine.seconds
        }
    }
}
