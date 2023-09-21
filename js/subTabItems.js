//---
var TplSubTabItems = function(data) {
    //---
    let html = ''
    //---
    let scenario = window.app.game.currentScenario
    data.subTab.categories.forEach(category => {
        let items = window.app.game.currentItems.filter(item => item.unlocked && item.category == category)
        if (items.length > 0) {
            html += '<div class="p-2">'
                html += '<div class="row g-1 nav nav-pills">'
                    html += '<div class="col-12">'
                        html += '<span>' + i18next.t(scenario.label + category) + '</span>'
                    html += '</div>'
                    items.forEach(item => {
                        html += '<div class="col-12 nav-item">'
                            html += '<button id="' + item.id + '-item-link" type="button" class="position-relative w-100 text-start nav-link' + (item.id == data.parentTab.selectedItemId ? ' active' : '') + (item.completed ? ' disabled' : '') + '" onclick="window.app.doClick(\'selectItem\', { itemId:\'' + item.id + '\' })">'
                                html += '<div class="row gx-2 align-items-center">'
                                    html += '<div class="col-auto lh-1">'
                                        html += '<img src="' + scenario.img + item.img + '" width="18px" height="18px" />'
                                    html += '</div>'
                                    html += '<div class="col">'
                                        html += '<span>' + i18next.t(scenario.label + item.label) + '</span>'
                                    html += '</div>'
                                    if (item.category == 'machine') {
                                        let availableCount = window.app.game.getAvailableCount(item.id)
                                        html += '<div class="col-auto">'
                                            html += '<span id="item-' + item.id + '-availableCount" class="' + (availableCount > 0 ? 'badge text-bg-success' : 'd-none') + '">' + formatNumber(availableCount) + '</span>'
                                        html += '</div>'
                                    }
                                    html += '<div class="col-auto">'
                                        html += '<span id="item-' + item.id + '-count" class="badge bg-light">' + formatNumber(item.count) + '</span>'
                                    html += '</div>'
                                    html += '<div id="item-' + item.id + '-working" class="col-auto">'
                                    html += '</div>'
                                html += '</div>'
                            html += '</button>'
                        html += '</div>'
                    })
                html += '</div>'
            html += '</div>'
        }
    })
    //---
    return html
}
//---
class SubTabItems {
    //---
    constructor(parentTab) {        
        //---
        this.parentTab = parentTab
        //---
        this.reset()
    }
    //---
    reset() {
        //---
        this.subTab = null
    }
    //---
    load(data) {
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        return savedData
    }
    //---
    display(subTabId) {
        //---
        this.subTab = window.app.game.currentScenario.subTabs.find(subTab => subTab.id == subTabId)
        //---
        let node = document.getElementById('subtab-content')
        node.innerHTML = TplSubTabItems(this)
    }
    //---
    refresh(deltaMs) {
        //---
        let node, value, html, style
        
        //---
        this.subTab.categories.forEach(category => {
            let items = window.app.game.currentItems.filter(item => item.unlocked && item.category == category)
            if (items) {
                items.forEach(item => {
                    
                    if (item.completed == true) {
                        
                        // Item count
                        //---
                        node = document.getElementById('item-' + item.id + '-count')
                        //---
                        value = item.count
                        //---                
                        html = '<i class="fas fa-check-circle text-success" aria-hidden="true"></i>'
                        if (node.innerHTML != html) node.innerHTML = html
                        //---
                        style = 'badge'
                        if (node.className != style) node.className = style
                    }
                    else {
                        
                        // Item working
                        //---
                        node = document.getElementById('item-' + item.id + '-working')
                        //---
                        if (item.totalMachineCount > 0 && item.balance > 0) {
                            //---
                            html = '<i class="fas fa-arrow-up text-success" aria-hidden="true"></i>'
                            style = 'col-auto'
                        }
                        else if (item.totalMachineCount > 0 && item.balance < 0) {
                            //---
                            html = '<i class="fas fa-arrow-down text-danger" aria-hidden="true"></i>'
                            style = 'col-auto'
                        }
                        else if (item.totalMachineCount > 0 && item.balance == 0) {
                            //---
                            html = '<i class="fas fa-arrow-up text-normal" aria-hidden="true"></i>'
                            style = 'col-auto'
                        }
                        else {
                            //---
                            html = ''
                            style = 'd-none'
                        }
                        //---
                        if (node.innerHTML != html) node.innerHTML = html
                        if (node.className != style) node.className = style
                        
                        // Item count
                        //---
                        node = document.getElementById('item-' + item.id + '-count')
                        //---
                        value = item.count
                        //---                
                        html = formatNumber(value)
                        if (node.innerHTML != html) node.innerHTML = html
                        //---
                        style = 'badge bg-light text-normal'
                        if (value > 0) style = 'badge bg-light text-white'
                        if (value >= item.storage) style = 'badge bg-light text-danger'
                        if (node.className != style) node.className = style

                        //---
                        if (item.category == 'machine') {
                            
                            // Item available count
                            //---
                            node = document.getElementById('item-' + item.id + '-availableCount')
                            //---
                            value = window.app.game.getAvailableCount(item.id)
                            //---                
                            html = formatNumber(value)
                            if (node.innerHTML != html) node.innerHTML = html
                            //---
                            style = 'd-none'
                            if (value > 0) style = 'badge text-bg-success'
                            if (node.className != style) node.className = style
                        }
                    }
                })
            }
        })
    }
    //---
    doClick(action, data) {
    }
}
