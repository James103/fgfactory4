//---
var TplTabGame = function(data) {
    //---
    let scenario = window.app.game.currentScenario
    //---
    let html = ''
    //---
    html += '<div class="position-relative container px-0 bg-dark h-100" role="tabpanel" tabindex="0">'
        html += '<div id="left-pane" class="bg-dark border-end' + (data.leftOpen ? ' open' : '') + '">'
            html += '<div class="nav nav-tabs align-items-center pt-2">'
                for (let id in scenario.subTabs) {
                    let subTab = scenario.subTabs[id]
                    html += '<div class="col nav-item">'
                        html += '<button id="' + subTab.id + '-subtab-link" type="button" class="position-relative nav-link" onclick="window.app.doClick(\'selectSubTab\', { subTabId:\'' + subTab.id + '\' })">'
                            html += '<span>' + i18next.t(scenario.label + subTab.label) + '</span>'
                        html += '</button>'
                    html += '</div>'
                }
                html += '<div class="ms-auto col-auto d-sm-none pe-2">'
                    html += '<button type="button" class="btn btn-link" onclick="window.app.doClick(\'toggleLeft\')">'
                        html += '<i class="fas fa-arrow-alt-circle-right"></i>'
                    html += '</button>'
                html += '</div>'
            html += '</div>'
            html += '<div id="subtab-content" class="scrollbar py-2" style="height:calc(100% - 47px);">'
            html += '</div>'
        html += '</div>'
        html += '<div id="right-pane">'
        html += '</div>'
    html += '</div>'
    
    // Modals
    //---
    html += TplModalOffline()
    html += TplModalVictory()

    //---
    return html
}
//---
class TabGame {
    //---
    constructor() {        
        //---
        this.id = 'game'
        this.img = 'fas fa-industry'
        this.label = 'tab_game'
        //---
        this.paneItem = new PaneItem()
        this.subTabItems = new SubTabItems(this)
        //---
        this.reset()
    }
    //---
    reset() {
        //---
        this.leftOpen = false
        //---
        this.selectedItemId = null
        this.selectedSubTabId = null
        //---
        this.paneItem.reset()
        this.subTabItems.reset()
    }
    //---
    load(data) {
        //---
        if (data.selectedItemId != null) this.selectedItemId = data.selectedItemId
        if (data.selectedSubTabId != null) this.selectedSubTabId = data.selectedSubTabId
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        if (this.selectedItemId) savedData.selectedItemId = this.selectedItemId
        if (this.selectedSubTabId) savedData.selectedSubTabId = this.selectedSubTabId
        //---
        savedData.paneItem = this.paneItem.getSaveData()
        savedData.subTabItems = this.subTabItems.getSaveData()
        //---
        return savedData
    }
    //---
    display() {
        //---
        let node = document.getElementById('tab-content')
        node.innerHTML = TplTabGame(this)
        //---
        if (this.selectedSubTabId == null) this.selectedSubTabId = window.app.game.currentScenario.initSubTab
        //---
        node = document.getElementById(this.selectedSubTabId + '-subtab-link')
        if (node) node.classList.add('active')
        //---
        this.subTabItems.display(this.selectedSubTabId)
        //---
        if (this.selectedItemId == null) this.selectedItemId = window.app.game.currentScenario.initItem
        //---
        node = document.getElementById(this.selectedItemId + '-item-link')
        if (node) node.classList.add('active')
        //---
        this.paneItem.display(this.selectedItemId)
    }
    //---
    refresh(deltaMs) {
        //---
        let node, html
        
        // Offline modal
        //---
        if (deltaMs > 15 * 60 * 1000) {
            //---
            node = document.getElementById('offlineTime')
            node.innerHTML = formatTime(deltaMs / 1000)
            //---
            window.app.showModal('modalOffline')
        }
        
        //---
        this.paneItem.refresh(deltaMs)
        this.subTabItems.refresh(deltaMs)
    }
    //---
    doClick(action, data) {
        //---
        if (action == 'toggleLeft') {
            //---
            let node = document.getElementById('left-pane')
            if (node.classList.contains('open')) {
                //---
                node.classList.remove('open')
                this.leftOpen = false
            }
            else {
                //---
                node.classList.add('open')
                this.leftOpen = true
            }
        }
        //---
        else if (action == 'selectSubTab') {
            //---
            let node
            //---
            node = document.getElementById(this.selectedSubTabId + '-subtab-link')
            if (node) node.classList.remove('active')
            //---
            this.selectedSubTabId = data.subTabId
            //---
            node = document.getElementById(this.selectedSubTabId + '-subtab-link')
            if (node) node.classList.add('active')
            //---
            this.subTabItems.display(this.selectedSubTabId)
        }
        //---
        else if (action == 'selectItem') {
            //---
            let node
            //---
            node = document.getElementById(this.selectedItemId + '-item-link')
            if (node) node.classList.remove('active')
            //---
            this.selectedItemId = data.itemId
            //---
            node = document.getElementById(this.selectedItemId + '-item-link')
            if (node) node.classList.add('active')
            //---
            this.paneItem.display(this.selectedItemId)
            //---
            this.doClick('toggleLeft')
        }
        //---
        this.paneItem.doClick(action, data)
        this.subTabItems.doClick(action, data)
    }
}
