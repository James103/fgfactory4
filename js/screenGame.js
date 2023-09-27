//---
var TplScreenGame = function(screen) {
    //---
    let html = ''
    //---
    html += '<div class="position-relative w-100 h-100">'
        
        // Top bar
        //---
        html += '<div class="position-absolute" style="top:0; width:100%; height:45px;">'
            html += '<div class="h-100 container p-2 bg-light border-bottom border-dark d-flex align-items-center">'
                html += '<div class="flex-fill row gx-2 align-items-center">'
                    html += '<div class="col">'
                        html += '<div class="row gx-2 align-items-center">'
                            html += '<div class="col-auto">'
                                html += '<img src="logo.png" width="24px" height="24px" class="rounded">'
                            html += '</div>'
                            html += '<div class="col-auto">'
                                html += '<span class="fs-6 text-white">' + i18next.t('game_title') + '</span>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                    html += '<div class="col-auto">'
                        html += '<div class="dropdown">'
                            html += '<button type="button" class="btn btn-outline-danger" data-bs-toggle="dropdown" aria-expanded="false">'
                                html += '<i class="fas fa-exclamation-triangle"></i> v 0.04'
                            html += '</button>'
                            html += '<div class="dropdown-menu">'
                                html += '<div class="px-2 py-1 text-center small">'
                                    html += '<span class="text-danger">' + i18next.t('screenGame_disclaimer') + '</span>'
                                html += '</div>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                    html += '<div class="col-auto">'
                        html += '<div class="dropdown">'
                            html += '<button type="button" class="btn btn-outline-primary" data-bs-toggle="dropdown" aria-expanded="false">'
                                html += '<i class="fas fa-info-circle"></i>'
                            html += '</button>'
                            html += '<div class="dropdown-menu">'
                                html += '<div class="px-2 py-1 text-center small">'
                                    html += '<span>' + i18next.t('screenGame_iconsBy') + '</span>'
                                    html += '<div><a href="https://fontawesome.com/" target="_blank">Fontawesome</a></div>'
                                html += '</div>'
                                html += '<div class="px-2 py-1 text-center small">'
                                    html += '<span>' + i18next.t('screenGame_love') + '</span>'
                                html += '</div>'
                                html += '<div class="px-2 py-1">'
                                    html += '<div class="row gx-4 align-items-center justify-content-around flex-nowrap">'
                                        html += '<div class="col-auto">'
                                            html += '<a href="https://www.patreon.com/bePatron?u=61283131" target="_blank" data-bs-toggle="tooltip" data-bs-title="' + i18next.t('screenGame_patreon') + '">'
                                                html += '<img src="img/patreon.png" width="24px" height="24px" />'
                                            html += '</a>'
                                        html += '</div>'
                                        html += '<div class="col-auto">'
                                            html += '<a href="https://ko-fi.com/freddecgames" target="_blank" data-bs-toggle="tooltip" data-bs-title="' + i18next.t('screenGame_kofi') + '">'
                                                html += '<img src="img/kofi.png" width="24px" height="24px" />'
                                            html += '</a>'
                                        html += '</div>'
                                        html += '<form class="col-auto" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" data-bs-toggle="tooltip" data-bs-title="' + i18next.t('screenGame_paypal') + '">'
                                            html += '<input type="hidden" name="cmd" value="_s-xclick">'
                                            html += '<input type="hidden" name="hosted_button_id" value="7XYD7SJFKQ8M4">'
                                            html += '<button type="submit" class="btn-link bg-transparent p-0 border-0">'
                                                html += '<img src="img/paypal.png" width="24px" height="24px" />'
                                            html += '</button>'
                                        html += '</form>'
                                        html += '<div class="col-auto">'
                                            html += '<a href="https://discord.gg/ZXrggavUpv" target="_blank" data-bs-toggle="tooltip" data-bs-title="' + i18next.t('screenGame_discord') + '">'
                                                html += '<img src="img/discord.png" width="24px" height="24px" />'
                                            html += '</a>'
                                        html += '</div>'
                                    html += '</div>'
                                html += '</div>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                html += '</div>'
            html += '</div>'
        html += '</div>'
        
        // Tab panes
        //---
        html += '<div id="tab-content" class="position-absolute tab-content" style="top:45px; bottom:56px; width:100%;">'          
        html += '</div>'
        
        // Tabs bar
        //---
        html += '<div class="position-absolute" style="bottom:0; width:100%; height:56px;">'
            html += '<div class="h-100 container px-0 bg-light border-top border-dark">'
                html += '<div class="h-100 nav nav-tabs">'
                    for (let id in screen.tabs) {
                        let tab = screen.tabs[id]
                        html += '<div class="col col-md-2 col-lg-1 nav-item">'
                            html += '<button id="' + tab.id + '-tab-link" type="button" class="position-relative nav-link" onclick="window.app.doClick(\'selectTab\', { tabId:\'' + tab.id + '\' })">'
                                html += '<div class="text-center"><i class="fs-6 ' + tab.img + '"></i></div>'
                                html += '<div class="text-center small"><span>' + i18next.t(tab.label) + '</span></div>'
                            html += '</button>'
                        html += '</div>'
                    }
                html += '</div>'
            html += '</div>'
        html += '</div>'
        
    //---
    html += '</div>'
    
    //---
    return html
}
//---
class ScreenGame {
    //---
    constructor() {        
        //---
        this.tabs = {
            //---
            game: new TabGame(),
            scenarios: new TabScenarios(),
            options: new TabOptions(),
        }
        //---
        this.reset()
    }
    //---
    reset() {
        //---
        this.selectedTab = null
        //---
        for (let id in this.tabs) this.tabs[id].reset()
    }
    //---
    load(data) {
        //---
        if (data.selectedTabId != null) this.selectedTab = this.tabs[data.selectedTabId]
        //---
        if (data.tabs) {
            for (let id in this.tabs) {
                if (data.tabs[id]) this.tabs[id].load(data.tabs[id])
            }
        }
    }
    //---
    getSaveData() {
        //---
        let savedData = {}
        //---
        if (this.selectedTab) savedData.selectedTabId = this.selectedTab.id
        //---
        savedData.tabs = {}
        for (let id in this.tabs) {
            savedData.tabs[id] = this.tabs[id].getSaveData()
        }
        //---
        return savedData
    }
    //---
    display() {
        //---
        let node = document.getElementById('screen')
        node.innerHTML = TplScreenGame(this)
        //---
        if (this.selectedTab == null) this.selectedTab = this.tabs['game']
        this.doClick('selectTab', { tabId:this.selectedTab.id })
        //---
        let tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        let tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
    //---
    refresh(deltaMs) {
        //---
        this.selectedTab.refresh(deltaMs)
    }
    //---
    doClick(action, data) {
        //---
        if (action == 'selectTab') {
            //---
            let node
            //---
            node = document.getElementById(this.selectedTab.id + '-tab-link')
            if (node) node.classList.remove('active')
            //---
            this.selectedTab = this.tabs[data.tabId]
            //---
            node = document.getElementById(this.selectedTab.id + '-tab-link')
            if (node) node.classList.add('active')
            //---
            this.selectedTab.display()
        }
        //---
        this.selectedTab.doClick(action, data)
    }
}
