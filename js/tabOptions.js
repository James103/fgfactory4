//---
var TplTabOptions = function() {
    //---
    let html = ''
    //---
    html += '<div class="position-relative container px-0 bg-dark scrollbar" role="tabpanel" tabindex="0">'
        html += '<div class="p-2">'
            html += '<div class="row g-2">'
                html += '<div class="col-12">'
                    html += '<span class="fs-6 text-white">' + i18next.t('tabOptions_language') + '</span>'
                html += '</div>'
                html += '<div class="col-auto">'
                    html += '<button type="button" class="btn btn-light' + (i18next.language == 'en-US' ? ' border-primary' : '') + '" onclick="window.app.changeLocale(\'en-US\')">'
                        html += '<img src="img/en.png" height="24px">'
                    html += '</button>'
                html += '</div>'
            html += '</div>'
        html += '</div>'
        html += '<div class="p-2">'
            html += '<div class="row g-2">'
                html += '<div class="col-12">'
                    html += '<span class="fs-6 text-white">' + i18next.t('tabOptions_localData') + '</span>'
                html += '</div>'
                html += '<div class="col-12 col-md-6">'
                    html += '<div class="card card-body">'
                        html += '<div class="mb-2 d-flex justify-content-center">'
                            html += '<textarea id="localData" spellcheck="false" rows="3" class="w-100 form-control" disabled readonly>' + window.app.getLocalData() + '</textarea>'
                        html += '</div>'
                        html += '<div class="row g-2 align-items-center justify-content-center">'
                            html += '<div class="col-4">'
                                html += '<button type="button" class="w-100 btn btn-outline-danger" onclick="window.app.showModal(\'modalWipe\')">'
                                    html += '<span><i class="fas fa-fw fa-skull"></i></span>'
                                    html += '<span class="ms-1">' + i18next.t('tabOptions_wipeSave') + '</span>'
                                html += '</button>'
                            html += '</div>'
                            html += '<div class="col-4">'
                                html += '<button type="button" class="w-100 btn btn-outline-primary" onclick="window.app.exportSave()">'
                                    html += '<span><i class="fas fa-fw fa-copy"></i></span>'
                                    html += '<span class="ms-1">' + i18next.t('tabOptions_exportSave') + '</span>'
                                html += '</button>'
                            html += '</div>'
                            html += '<div class="col-4">'
                                html += '<button type="button" class="w-100 btn btn-outline-primary px-0" onclick="window.app.downloadSave()">'
                                    html += '<span><i class="fas fa-fw fa-download"></i></span>'
                                    html += '<span class="ms-1">' + i18next.t('tabOptions_downloadSave') + '</span>'
                                html += '</button>'
                            html += '</div>'
                        html += '</div>'
                    html += '</div>'
                html += '</div>'
                html += '<div class="col-12 col-md-6">'
                    html += '<div class="card card-body">'
                        html += '<div class="mb-2 d-flex">'
                            html += '<textarea spellcheck="false" rows="3" id="importData" class="w-100 form-control"></textarea>'
                        html += '</div>'
                        html += '<div class="col-4 ms-auto">'
                            html += '<button type="button" class="w-100 btn btn-outline-primary" onclick="window.app.importSave()">'
                                html += '<span><i class="fas fa-fw fa-upload"></i></span>'
                                html += '<span class="ms-1">' + i18next.t('tabOptions_importSave') + '</span>'
                            html += '</button>'
                        html += '</div>'
                    html += '</div>'
                html += '</div>'
            html += '</div>'
        html += '</div>'
    html += '</div>'
    
    // Toasts
    //---
    html += '<div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3">'
        html += TplToastExport()
        html += TplToastImportEmpty()
        html += TplToastImportCorrupted()
    html += '</div>'
    
    // Modals
    //---
    html += TplModalWipe()

    //---
    return html
}
//---
class TabOptions {
    //---
    constructor() {        
        //---
        this.id = 'options'
        this.img = 'fas fa-cog'
        this.label = 'tab_options'
        //---
        this.reset()
    }
    //---
    reset() {
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
    display() {
        //---
        let node = document.getElementById('tab-content')
        node.innerHTML = TplTabOptions()
    }
    //---
    refresh(deltaMs) {
        //---
        let node, html
        
        // Local data
        //---
        node = document.getElementById('localData')
        //---
        html = window.app.getLocalData()
        if (html != node.innerHTML) node.innerHTML = html
    }
    //---
    doClick(action, data) {
    }
}
