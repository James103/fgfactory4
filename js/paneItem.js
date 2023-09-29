//---
var TplPaneItem = function(item) {
    //---
    let game = window.app.game
    let scenario = window.app.game.currentScenario
    //---
    let html = ''
    //---
    html += '<div class="mt-1 p-2">'
        html += '<div class="row gx-2 align-items-center">'
            html += '<div class="col-auto d-sm-none">'
                html += '<button type="button" class="btn btn-link" onclick="window.app.doClick(\'toggleLeft\')">'
                    html += '<i class="fas fa-arrow-alt-circle-left"></i>'
                html += '</button>'
            html += '</div>'
            html += '<div class="col-auto lh-1">'
                html += '<img src="' + scenario.img + item.icon.img + '" width="24px" height="24px" />'
            html += '</div>'
            html += '<div class="col-auto">'
                html += '<span class="fs-6 text-white">' + i18next.t(scenario.label + item.label) + '</span>'
            html += '</div>'
            if (item.category == 'cat-machine') {
                let availableCount = window.app.game.getAvailableCount(item.id)
                html += '<div class="col-auto">'
                    html += '<span id="selectedItem-availableCount" class="' + (availableCount > 0 ? 'badge text-bg-success' : 'd-none') + '">' + formatNumber(availableCount) + '</span>'
                html += '</div>'
            }
            if (item.completed) {
                html += '<div class="col-auto">'
                    html += '<i class="fas fa-check-circle text-success"></i>'
                html += '</div>'
            }
            html += '<div class="ms-auto col-auto">'
                html += '<span id="selectedItem-count">' + formatNumber(item.count) + '</span>'
                if (item.storage != Infinity) html += ' / <span id="selectedItem-storage">' + formatNumber(item.storage) + '</span>'
                else if (item.goal) html += ' / <span>' + formatNumber(item.goal) + '</span>'
            html += '</div>'
        html += '</div>'
    html += '</div>'
    html += '<div class="scrollbar" style="height:calc(100% - 45px);">'
        html += '<div class="p-2">'
            html += '<div class="row g-2">'
                html += '<div class="col-12">'
                    html += '<div class="h-100 p-2 border">'
                        html += '<div class="row g-0">'
                            if (item.category == 'cat-machine') {
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col small">'
                                            html += '<span>' + i18next.t('word_speed') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<span class="text-white">' + formatNumber(item.speed) + '</span>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                                if (item.energy) {
                                    html += '<div class="col-12">'
                                        html += '<div class="row gx-2 align-items-center">'
                                            html += '<div class="col small">'
                                                html += '<span>' + i18next.t('word_energy') + '</span>'
                                            html += '</div>'
                                            for (let id in item.energy) {
                                                let energyItem = game.getItem(id)
                                                html += '<div class="col-auto lh-1">'
                                                    html += displayIcon(energyItem.icon, 18)
                                                html += '</div>'
                                                html += '<div class="col-auto">'
                                                    html += '<span class="text-white">' + formatNumber(item.energy[id]) + ' <small class="opacity-50">/s</small></span>'
                                                html += '</div>'
                                            }
                                        html += '</div>'
                                    html += '</div>'
                                }
                            }
                            else if (item.category == 'cat-tech') {
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col small">'
                                            html += '<span>' + i18next.t('word_currentProd') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<span id="selectedItem-prod">' + formatNumber(item.prod) + '</span> <small class="opacity-50">/s</small>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                            }
                            else {
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col small">'
                                            html += '<span>' + i18next.t('word_currentProd') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<span id="selectedItem-prod">' + formatNumber(item.prod) + '</span> <small class="opacity-50">/s</small>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col small">'
                                            html += '<span>' + i18next.t('word_currentConsu') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<span id="selectedItem-consu">' + formatNumber(item.consu) + '</span> <small class="opacity-50">/s</small>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col small">'
                                            html += '<span>' + i18next.t('word_currentBalance') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<span id="selectedItem-balance">' + formatNumber(item.balance) + '</span> <small class="opacity-50">/s</small>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                            }
                        html += '</div>'
                    html += '</div>'
                html += '</div>'
                if (item.storage != Infinity) {
                    html += '<div class="col-12">'
                        html += '<div class="card card-body">'
                            html += '<div class="row g-3">'
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col">'
                                            html += '<span class="text-white">' + i18next.t('word_storage') + '</span>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<small class="opacity-50">x</small> <span id="selectedItem-upgradeCount">' + formatNumber(item.upgradeCount) + '</span>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                                html += '<div class="col-12">'
                                    html += '<div class="row gx-2 align-items-center">'
                                        html += '<div class="col-auto">'
                                            html += '<div class="border py-1 px-2">'
                                                html += '<div class="row gx-2 align-items-center">'
                                                    html += '<div class="col-auto lh-1">'
                                                        html += displayIcon(item.icon, 16)
                                                    html += '</div>'
                                                    html += '<div class="col text-end small">'
                                                        html += '<span id="selectedItem-upgradeCost"' + (item.count < item.storage ? 'class="text-danger"' : '') + '>' + formatNumber(item.storage) + '</span>'
                                                    html += '</div>'
                                                html += '</div>'
                                            html += '</div>'
                                        html += '</div>'
                                        html += '<div class="ms-auto col-auto">'
                                            let value = game.canUpgradeItem(item)
                                            html += '<button type="button" id="selectedItem-upgradeBtn" class="btn btn-outline-primary' + (value == false ? ' disabled' : '') + '" onclick="window.app.doClick(\'upgradeItem\', { itemId:\'' + item.id + '\' })">'
                                                html += '<i class="fas fa-fw fa-level-up-alt"></i>'
                                            html += '</button>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                }
            html += '</div>'
        html += '</div>'
        let machines = item.machines.filter(machine => machine.unlocked)
        if (machines) {
            html += '<div class="p-2">'
                html += '<div class="row g-2">'
                machines.forEach(machine => {
                    let machineData = scenario.items.find(item => item.id == machine.machineId)
                        html += '<div class="col-12">'
                            html += '<div class="card card-body">'
                                html += '<div class="row g-3">'
                                    html += '<div class="col-12">'
                                        html += '<div class="row gx-2 align-items-center">'
                                            html += '<div class="col-auto">'
                                                if (machineData.id != 'manual') html += '<button type="button" class="btn btn-link p-0 fs-normal" onclick="window.app.doClick(\'selectItem\', { itemId:\'' + machineData.id + '\' })">'
                                                    html += '<div class="row gx-2 align-items-center">'
                                                        html += '<div class="col-auto lh-1">'
                                                            html += displayIcon(machineData.icon, 18)
                                                        html += '</div>'
                                                        html += '<div class="col-auto">'
                                                            html += '<span class="text-white">' + i18next.t(scenario.label + machineData.label) + '</span>'
                                                        html += '</div>'
                                                    html += '</div>'
                                                if (machineData.id != 'manual') html += '</button>'
                                            html += '</div>'
                                            let availableCount = window.app.game.getAvailableCount(machine.machineId)
                                            html += '<div id="machine-availableCount-' + machine.id + '" class="' + (availableCount > 0 ? 'col-auto' : 'd-none') + '">'
                                                if (availableCount > 0) html += '<span class="badge text-bg-success">' + formatNumber(availableCount) + '</span>'
                                            html += '</div>'
                                            if (machineData.id != 'manual') {
                                                html += '<div class="col text-end">'
                                                    html += '<small class="opacity-50">x</small> <span id="machine-count-' + machine.id + '">' + formatNumber(machine.count) + '</span>'
                                                html += '</div>'
                                            }
                                        html += '</div>'
                                    html += '</div>'
                                    html += '<div class="col-12">'
                                        html += '<div class="row g-1 align-items-center justify-content-center">'
                                            if (machine.inputs) {
                                                for (let id in machine.inputs) {
                                                    let inputItem = game.getItem(id)
                                                    html += '<div class="col-auto">'
                                                        html += '<button type="button" class="btn btn-light" onclick="window.app.doClick(\'selectItem\', { itemId:\'' + id + '\' })">'
                                                            html += '<div class="row gx-2 align-items-center">'
                                                                html += '<div class="col-auto lh-1">'
                                                                    html += displayIcon(inputItem.icon, 16)
                                                                html += '</div>'
                                                                html += '<div class="col text-end small">'
                                                                    html += '<span id="machine-' + machine.id + '-inputCount-' + id + '">' + formatNumber((machine.count > 0 ? machine.count : 1) * machine.inputs[id]) + '</span>'
                                                                html += '</div>'
                                                            html += '</div>'
                                                        html += '</button>'
                                                    html += '</div>'
                                                }
                                            }
                                            else {
                                                html += '<div class="col-auto">'
                                                    html += '<div class="border py-1 px-2 small">'
                                                        html += '<i class="fas fa-times-circle"></i>'
                                                    html += '</div>'
                                                html += '</div>'
                                            }
                                            html += '<div class="col-auto small">'
                                                html += '<i class="fas fa-long-arrow-alt-right"></i>'
                                            html += '</div>'
                                            let outputItem = game.getItem(machine.outputId)
                                            html += '<div class="col-auto">'
                                                html += '<div class="border py-1 px-2">'
                                                    html += '<div class="row gx-2 align-items-center">'
                                                        html += '<div class="col-auto lh-1">'
                                                            html += displayIcon(outputItem.icon, 16)
                                                        html += '</div>'
                                                        html += '<div class="col text-end small">'
                                                            html += '<span id="machine-' + machine.id + '-outputCount">' + formatNumber((machine.count > 0 ? machine.count : 1) * machine.outputCount) + '</span>'
                                                        html += '</div>'
                                                    html += '</div>'
                                                html += '</div>'
                                            html += '</div>'
                                        html += '</div>'
                                    html += '</div>'
                                    html += '<div class="col-12">'
                                        html += '<div class="row gx-2 align-items-center justify-content-end">'
                                            if (machineData.id != 'manual') {
                                                html += '<div class="col-auto">'
                                                    html += '<select class="form-control" onchange="window.app.doClick(\'setMachineSelectCount\', { machineId:\'' + machine.id + '\', count:this.value })">'
                                                        html += '<option' + (machine.selectCount == '1' ? ' selected' : '') + '  value="1">1</option>'
                                                        html += '<option' + (machine.selectCount == '5' ? ' selected' : '') + '  value="5">5</option>'
                                                        html += '<option' + (machine.selectCount == '10' ? ' selected' : '') + '  value="10">10</option>'
                                                        html += '<option' + (machine.selectCount == '100' ? ' selected' : '') + '  value="100">100</option>'
                                                        html += '<option' + (machine.selectCount == 'max' ? ' selected' : '') + '  value="max">' + i18next.t('word_max') + '</option>'
                                                    html += '</select>'
                                                html += '</div>'
                                                html += '<div class="col-auto">'
                                                    let value = game.canDecreaseMachineCount(machine)
                                                    html += '<button type="button" id="machine-' + machine.id + '-decreaseBtn" class="btn btn-outline-danger' + (value == false ? ' disabled' : '') + '" onclick="window.app.doClick(\'decreaseMachineCount\', { machineId:\'' + machine.id + '\' })">'
                                                        html += '<i class="fas fa-fw fa-minus-circle"></i>'
                                                    html += '</button>'
                                                html += '</div>'
                                                html += '<div class="col-auto">'
                                                    value = game.canIncreaseMachineCount(machine)
                                                    html += '<button type="button" id="machine-' + machine.id + '-increaseBtn" class="btn btn-outline-primary' + (value == false ? ' disabled' : '') + '" onclick="window.app.doClick(\'increaseMachineCount\', { machineId:\'' + machine.id + '\' })">'
                                                        html += '<i class="fas fa-fw fa-plus-circle"></i>'
                                                    html += '</button>'
                                                html += '</div>'
                                            }
                                            else if (machine.limits && machine.limits.length > 1) {
                                                html += '<div class="col-auto">'
                                                    html += '<div class="btn-group" role="group">'
                                                        for (let limit of machine.limits) {
                                                            html += '<button type="button" id="machine-' + machine.id + '-limit-' + limit + '" class="btn btn-outline-primary' + (machine.limit == limit ? ' active' : '') + '" style="width:35px;" onclick="window.app.doClick(\'setMachineLimit\', { machineId:\'' + machine.id + '\', count:' + limit + ' })">' + limit + '</button>'
                                                        }
                                                    html += '</div>'
                                                html += '</div>'
                                            }
                                            html += '<div class="col-auto text-end" style="width:' + (machine.machineId == 'manual' ? '85' : '60') + 'px;">'
                                                html += '<small id="machine-' + machine.id + '-remainingSeconds">' + formatTime(machine.remainingSeconds) + '</small>'
                                                html += '<div class="progress" style="height:3px;">'
                                                    html += '<div id="machine-' + machine.id + '-progress" class="progress-bar bg-success" style="width:' + machine.getProgress() + '%;"></div>'
                                                html += '</div>'
                                            html += '</div>'
                                            html += '<div class="col-auto">'
                                                if (machine.status == 'paused') {
                                                    value = game.canStartMachine(machine)
                                                    html += '<button type="button" id="machine-' + machine.id + '-toggleBtn" class="btn btn-outline-primary' + (value == false ? ' disabled' : '') + '" onclick="window.app.doClick(\'toggleMachine\', { machineId:\'' + machine.id + '\' })">'
                                                        html += '<i class="fas fa-fw fa-play"></i>'
                                                    html += '</button>'
                                                }
                                                else {
                                                    value = game.canStopMachine(machine)
                                                    html += '<button type="button" id="machine-' + machine.id + '-toggleBtn" class="btn btn-outline-danger' + (value == false ? ' disabled' : '') + '" onclick="window.app.doClick(\'toggleMachine\', { machineId:\'' + machine.id + '\' })">'
                                                        html += '<i class="fas fa-fw fa-stop"></i>'
                                                    html += '</button>'
                                                }
                                            html += '</div>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                            html += '</div>'
                        html += '</div>'
                    })
                html += '</div>'
            html += '</div>'
        }
        if (item.category == 'cat-machine') {
            machines = window.app.game.currentMachines.filter(machine => machine.machineId == item.id && machine.count > 0)
            if (machines.length > 0) {
                html += '<div class="p-2">'
                    html += '<div class="card card-body">'
                        html += '<div class="row g-3">'
                            html += '<div class="col-12">'
                                html += '<span class="text-white">' + i18next.t('word_assignment') + '</span>'
                            html += '</div>'
                            html += '<div class="col-12">'
                                html += '<div class="list-group list-group-flush">'
                                    machines.forEach(machine => {
                                        html += '<button type="button" class="list-group-item list-group-item-action" onclick="window.app.doClick(\'selectItem\', { itemId:\'' + machine.outputId + '\' })">'
                                            html += '<div class="row gx-2 align-items-center">'
                                                html += '<div class="col-auto">'
                                                    let outputElem = game.getItem(machine.outputId)
                                                    html += displayIcon(outputElem.icon, 16)
                                                html += '</div>'
                                                html += '<div class="col">'
                                                    html += '<span class="text-white">' + i18next.t(scenario.label + outputElem.label) + '</span>'
                                                html += '</div>'
                                                html += '<div class="col-auto">'
                                                    html += '<small class="opacity-50">x</small> <span class="text-white">' + formatNumber(machine.count) + '</span>'
                                                html += '</div>'
                                            html += '</div>'
                                        html += '</button>'
                                    })
                                html += '</div>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                html += '</div>'
            }
        }
    html += '</div>'
    //---
    return html
}
//---
class PaneItem {
    //---
    constructor() {        
        //---
        this.reset()
    }
    //---
    reset() {
        //---
        this.item = null
    }
    //---
    load(data) {}
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        return savedData
    }
    //---
    display(itemId) {
        //---
        this.item = window.app.game.currentItems.find(item => item.id == itemId)
        //---
        let node = document.getElementById('right-pane')
        node.innerHTML = TplPaneItem(this.item)
    }
    //---
    refresh(deltaMs) {
        //---
        let node, value, html, style
        
        // Item count
        //---
        node = document.getElementById('selectedItem-count')
        //---
        value = this.item.count
        //---                
        html = formatNumber(value)
        if (node.innerHTML != html) node.innerHTML = html
        //---
        style = 'text-normal'
        if (value > 0) style = 'text-white'
        if (node.className != style) node.className = style
        
        //---
        if (this.item.category == 'cat-machine') {
            
            // Item available count
            //---
            node = document.getElementById('selectedItem-availableCount')
            //---
            value = window.app.game.getAvailableCount(this.item.id)
            //---                
            html = formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'd-none'
            if (value > 0) style = 'badge text-bg-success'
            if (node.className != style) node.className = style
        }
        
        //---
        if (this.item.category == 'cat-tech') {
            
            // Item production
            //---
            node = document.getElementById('selectedItem-prod')
            //---
            value = this.item.prod
            //---
            html = (value > 0 ? '+' : '') + formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'text-normal'
            if (value > 0) style = 'text-white'
            if (node.className != style) node.className = style            
        }
        //---
        else if (this.item.category != 'cat-machine') {
            
            // Item production
            //---
            node = document.getElementById('selectedItem-prod')
            //---
            value = this.item.prod
            //---
            html = (value > 0 ? '+' : '') + formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'text-normal'
            if (value > 0) style = 'text-white'
            if (node.className != style) node.className = style
            
            //---
            if (this.item.category != 'cat-tech') {
                
                // Item consumption
                //---
                node = document.getElementById('selectedItem-consu')
                //---
                value = this.item.consu
                //---
                html = formatNumber(value)
                if (node.innerHTML != html) node.innerHTML = html
                //---
                style = 'text-normal'
                if (value != 0) style = 'text-white'
                if (node.className != style) node.className = style
                
                // Item balance
                //---
                node = document.getElementById('selectedItem-balance')
                //---
                value = this.item.balance
                //---
                html = (value > 0 ? '+' : '') + formatNumber(value)
                if (node.innerHTML != html) node.innerHTML = html
                //---
                style = 'text-normal'
                if (value > 0) style = 'text-success'
                else if (value < 0) style = 'text-danger'
                if (node.className != style) node.className = style
            }
        }
        
        //---
        if (this.item.storage != Infinity) {
            
            // Item storage
            //---
            node = document.getElementById('selectedItem-storage')
            //---
            value = this.item.storage
            //---
            html = formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'text-normal'
            if (this.item.count >= value) style = 'text-danger'
            if (node.className != style) node.className = style
            
            // Item upgrade count
            //---
            node = document.getElementById('selectedItem-upgradeCount')
            //---
            value = this.item.upgradeCount
            //---                
            html = formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'text-normal'
            if (value > 0) style = 'text-white'
            if (node.className != style) node.className = style
            
            // Item upgrade cost
            //---
            node = document.getElementById('selectedItem-upgradeCost')
            //---
            value = this.item.storage
            //---                
            html = formatNumber(value)
            if (node.innerHTML != html) node.innerHTML = html
            //---
            style = 'text-white'
            if (value > this.item.count) style = 'text-danger'
            if (node.className != style) node.className = style
                
            // Item upgrade button
            //---
            node = document.getElementById('selectedItem-upgradeBtn')
            //---
            value = window.app.game.canUpgradeItem(this.item)
            //---
            style = 'btn btn-outline-primary'
            if (value == false) style += ' disabled'
            if (node.className != style) node.className = style
        }
        
        //---
        let machines = this.item.machines.filter(machine => machine.unlocked)
        if (machines) {
            machines.forEach(machine => {
                
                //---
                if (machine.machineId != 'manual') {
                    
                    // Machine count
                    //---
                    node = document.getElementById('machine-count-' + machine.id)
                    //---
                    value = machine.count
                    //---
                    html = formatNumber(value)
                    if (node.innerHTML != html) node.innerHTML = html
                    //---
                    style = 'text-normal'
                    if (value > 0) style = 'text-white'
                    if (node.className != style) node.className = style
                    
                    // Machine available count
                    //---
                    node = document.getElementById('machine-availableCount-' + machine.id)
                    //---
                    value = window.app.game.getAvailableCount(machine.machineId)
                    //---                
                    html = ''
                    if (value > 0) html = '<span class="badge text-bg-success">' + formatNumber(value) + '</span>'
                    if (node.innerHTML != html) node.innerHTML = html
                    //---
                    style = 'd-none'
                    if (value > 0) style = 'col-auto'
                    if (node.className != style) node.className = style
                }
                
                //---
                if (machine.inputs) {
                    for (let id in machine.inputs) {
                        let availableCount = window.app.game.getAvailableCount(id)
                        
                        // Machine input count
                        //---
                        node = document.getElementById('machine-' + machine.id + '-inputCount-' + id)
                        //---
                        value = (machine.count > 0 ? machine.count : 1) * machine.inputs[id]
                        //---
                        html = formatNumber(value)
                        if (node.innerHTML != html) node.innerHTML = html
                        //---
                        style = 'text-white'                        
                        if (value > availableCount) style = 'text-danger'
                        if (node.className != style) node.className = style
                    }
                }
                
                // Machine output count
                //---
                node = document.getElementById('machine-' + machine.id + '-outputCount')
                //---
                let outputItem = window.app.game.getItem(machine.outputId)
                value = (machine.count > 0 ? machine.count : 1) * machine.outputCount
                //---
                html = formatNumber(value)
                if (node.innerHTML != html) node.innerHTML = html
                //---
                style = 'text-white'
                if (outputItem.count >= outputItem.storage) style = 'text-danger'
                if (node.className != style) node.className = style
                
                //---
                if (machine.machineId != 'manual') {
                    
                    // Machine decrease button
                    //---
                    node = document.getElementById('machine-' + machine.id + '-decreaseBtn')
                    //---
                    value = window.app.game.canDecreaseMachineCount(machine)
                    //---
                    style = 'btn btn-outline-danger'
                    if (value == false) style += ' disabled'
                    if (node.className != style) node.className = style
                    
                    // Machine increase button
                    //---
                    node = document.getElementById('machine-' + machine.id + '-increaseBtn')
                    //---
                    value = window.app.game.canIncreaseMachineCount(machine)
                    //---
                    style = 'btn btn-outline-primary'
                    if (value == false) style += ' disabled'
                    if (node.className != style) node.className = style
                }
                else if (machine.limits && machine.limits.length > 1) {
                    machine.limits.forEach(limit => {
                        
                        // Machine limits
                        //---
                        node = document.getElementById('machine-' + machine.id + '-limit-' + limit)
                        //---
                        style = 'btn btn-outline-primary'
                        if (machine.limit == limit) style += ' active'
                        if (machine.status != 'paused') style += ' disabled'
                        if (node.className != style) node.className = style
                    })
                }
                
                // Machine remaining seconds
                //---
                node = document.getElementById('machine-' + machine.id + '-remainingSeconds')
                //---
                value = machine.remainingSeconds
                //---
                html = formatTime(machine.remainingSeconds)
                if (machine.machineId == 'manual') html += ' - ' + (machine.limit - machine.limitCount)
                if (node.innerHTML != html) node.innerHTML = html
                //---
                let full = false
                let outputElem = window.app.game.getItem(machine.outputId)
                if (outputElem.count >= outputElem.storage) full = true
                //---
                style = 'text-normal'
                if (machine.status == 'wait' || full) style = 'text-danger'
                else if (machine.status == 'inprogress') style = 'text-white'
                if (node.className != style) node.className = style
                
                // Machine progress
                //---
                node = document.getElementById('machine-' + machine.id + '-progress')
                //---
                value = machine.getProgress() + '%'
                //---
                if (node.style.width != value) node.style.width = value
                
                // Machine toggle button
                //---
                node = document.getElementById('machine-' + machine.id + '-toggleBtn')
                //---
                html = '<i class="fas fa-fw fa-play" aria-hidden="true"></i>'
                if (machine.status != 'paused') html = '<i class="fas fa-fw fa-stop" aria-hidden="true"></i>'
                if (node.innerHTML != html) node.innerHTML = html
                //---
                if (machine.status == 'paused') {
                    //---
                    value = window.app.game.canStartMachine(machine)
                    //---
                    style = 'btn btn-outline-primary'
                    if (value == false) style += ' disabled'
                    if (node.className != style) node.className = style
                }
                else {
                    //---
                    value = window.app.game.canStopMachine(machine)
                    //---
                    style = 'btn btn-outline-danger'
                    if (value == false) style += ' disabled'
                    if (node.className != style) node.className = style
                }
            })
        }
    }
    //---
    doClick(action, data) {
        //---
        if (action == 'upgradeItem') window.app.game.upgradeItem(data.itemId)
        //---
        else if (action == 'setMachineSelectCount') {
            //---
            let machine = window.app.game.getMachine(data.machineId)
            machine.selectCount = data.count
        }
        //---
        else if (action == 'setMachineLimit') {
            //---
            let machine = window.app.game.getMachine(data.machineId)
            if (machine.status != 'paused') return
            //---
            let node
            //---
            node = document.getElementById('machine-' + machine.id + '-limit-' + machine.limit)
            if (node) node.classList.remove('active')
            //---
            machine.limit = data.count
            //---
            node = document.getElementById('machine-' + machine.id + '-limit-' + machine.limit)
            if (node) node.classList.add('active')
        }
        //---
        else if (action == 'decreaseMachineCount') window.app.game.decreaseMachineCount(data.machineId)
        else if (action == 'increaseMachineCount') window.app.game.increaseMachineCount(data.machineId)
        //---
        else if (action == 'toggleMachine') {
            //---
            let machine = window.app.game.getMachine(data.machineId)
            if (machine.status == 'paused') window.app.game.startMachine(data.machineId)
            else window.app.game.stopMachine(data.machineId)
        }
    }
}
